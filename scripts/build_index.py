# -*- coding: utf-8 -*-
import os
import sys
import json
import urllib.request
import urllib.error
import re
import time

sys.stdout.reconfigure(encoding='utf-8')

# Config paths
knowledge_dir = r"c:\Users\thanh\OneDrive\Desktop\e-magazine\knowledge"
output_path = r"c:\Users\thanh\OneDrive\Desktop\e-magazine\src\data\vector_index.json"

# Get API key from environment
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("----------------------------------------------------------------------")
    print("WARNING: GEMINI_API_KEY environment variable is not set!")
    print("To compile the RAG vector index, please set the environment variable:")
    print("  $env:GEMINI_API_KEY=\"your_key_here\" (in PowerShell)")
    print("  set GEMINI_API_KEY=your_key_here (in CMD)")
    print("Or enter it below to proceed (it will not be saved to disk):")
    print("----------------------------------------------------------------------")
    api_key = input("Gemini API Key: ").strip()
    if not api_key:
        print("Error: API Key is required to generate embeddings.")
        sys.exit(1)

# Helper function to get embedding for a text chunk
def get_embedding(text, model="models/text-embedding-004"):
    if api_key.upper() == "MOCK":
        # Generate mock 768-dimensional embedding
        return [0.0] * 768

    url = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={api_key}"
    payload = {
        "model": model,
        "content": {
            "parts": [
                {
                    "text": text
                }
            ]
        }
    }
    
    req_data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        url,
        data=req_data,
        headers={'Content-Type': 'application/json'}
    )
    
    # Retry logic up to 3 times in case of rate limiting / transient errors
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                return res_data['embedding']['values']
        except urllib.error.HTTPError as e:
            # Handle rate limiting (429) or other API errors
            error_body = e.read().decode('utf-8')
            print(f"  Attempt {attempt+1} failed with error: {e.code}. Details: {error_body}")
            if e.code == 429:
                print("  Rate limit hit. Waiting 5 seconds before retry...")
                time.sleep(5)
            else:
                time.sleep(2)
        except Exception as e:
            print(f"  Attempt {attempt+1} failed. Error: {e}")
            time.sleep(2)
            
    raise Exception(f"Failed to fetch embedding for chunk starting with: '{text[:30]}...'")

# Semantic chunker (splits by headings or paragraphs, aggregates to ~200 words with ~50 words overlap)
def chunk_document(content, source_name, res_id):
    # Regex to split by section headers (## or ###) or double newlines (paragraphs)
    lines = content.split('\n')
    
    chunks = []
    current_section = "Mở đầu"
    current_chunk = []
    current_word_count = 0
    
    # Keep track of last few paragraphs for overlap
    history_paragraphs = []
    
    paragraphs = []
    temp_para = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('#'):
            # It's a heading
            if temp_para:
                paragraphs.append(('\n'.join(temp_para), current_section))
                temp_para = []
            current_section = stripped.lstrip('#').strip()
        elif not stripped:
            if temp_para:
                paragraphs.append(('\n'.join(temp_para), current_section))
                temp_para = []
        else:
            temp_para.append(line)
            
    if temp_para:
        paragraphs.append(('\n'.join(temp_para), current_section))

    # Aggregate paragraphs into chunks
    # Target size: 150-250 words (~300-500 tokens). Overlap: last paragraph if possible
    i = 0
    chunk_index = 1
    while i < len(paragraphs):
        para_text, para_sec = paragraphs[i]
        para_words = len(para_text.split())
        
        # Start a new chunk
        chunk_para_texts = []
        # Add overlap from previous chunk if available
        overlap_word_count = 0
        if len(chunks) > 0 and len(history_paragraphs) > 0:
            # Add the last paragraph from the previous chunk
            last_p_text, last_p_sec = history_paragraphs[-1]
            chunk_para_texts.append(last_p_text)
            overlap_word_count = len(last_p_text.split())
            
        chunk_para_texts.append(para_text)
        current_words = overlap_word_count + para_words
        
        # Add more paragraphs until target size is reached
        j = i + 1
        history_paras_added = [(para_text, para_sec)]
        while j < len(paragraphs) and current_words < 180:
            next_text, next_sec = paragraphs[j]
            next_words = len(next_text.split())
            
            # If adding next paragraph exceeds our upper limit (e.g. 350 words), stop
            if current_words + next_words > 350:
                break
                
            chunk_para_texts.append(next_text)
            history_paras_added.append((next_text, next_sec))
            current_words += next_words
            j += 1
            
        # Create chunk
        chunk_text = '\n\n'.join(chunk_para_texts)
        chunks.append({
            "id": f"{res_id or 'general'}_chunk_{chunk_index}",
            "text": chunk_text,
            "metadata": {
                "source": source_name,
                "resolutionId": res_id or "",
                "sectionTitle": para_sec
            }
        })
        
        # Update state
        chunk_index += 1
        history_paragraphs = history_paras_added
        # Move index forward by how many we added (excluding overlap)
        added_count = len(history_paras_added)
        i += added_count
        
    return chunks

# Main indexing process
def run_indexing():
    print(f"Scanning directory: {knowledge_dir} for documents...")
    if not os.path.exists(knowledge_dir):
        print(f"Error: {knowledge_dir} does not exist.")
        sys.exit(1)
        
    all_chunks = []
    
    for filename in sorted(os.listdir(knowledge_dir)):
        if filename.endswith('.md'):
            file_path = os.path.join(knowledge_dir, filename)
            print(f"\nProcessing file: {filename}")
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Extract resolution ID
            # e.g., NQ57.md -> 57. toan-van-nghi-quyet-DH14.md -> toan-van
            res_id = ""
            source_name = filename
            
            match_nq = re.match(r'NQ(\d+)\.md', filename)
            if match_nq:
                res_id = match_nq.group(1)
                source_name = f"Nghị quyết số {res_id}-NQ/TW"
            elif filename == "toan-van-nghi-quyet-DH14.md":
                source_name = "Văn kiện Đại hội XIV - Toàn văn"
            elif filename == "thong-tin-chung-DH14.md":
                source_name = "Thông tin chung Đại hội XIV"
                
            file_chunks = chunk_document(content, source_name, res_id)
            print(f"  Split into {len(file_chunks)} chunks.")
            all_chunks.extend(file_chunks)
            
    print(f"\nGenerating embeddings for total {len(all_chunks)} chunks...")
    
    vector_index = []
    
    for idx, chunk in enumerate(all_chunks, 1):
        print(f"  Embedding chunk {idx}/{len(all_chunks)} [{chunk['id']}]... ", end="", flush=True)
        try:
            vector = get_embedding(chunk['text'])
            chunk['embedding'] = vector
            vector_index.append(chunk)
            print("OK")
            # Wait 0.5s to respect rate limits of Gemini API
            time.sleep(0.5)
        except Exception as e:
            print("FAILED")
            print(f"Error: {e}")
            sys.exit(1)
            
    # Write to vector_index.json
    print(f"\nWriting vector index to: {output_path}...")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f_out:
        json.dump(vector_index, f_out, ensure_ascii=False, indent=2)
        
    print("RAG Vector Index generated successfully!")
    print(f"Total chunks indexed: {len(vector_index)}")

if __name__ == "__main__":
    run_indexing()
