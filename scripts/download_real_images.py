"""
Download real images from 3 Nhan Dan special pages.
Uses regex to find ALL ./assets/ image references in the full HTML,
selects the best content images, and downloads with sequential naming.
"""

import os
import re
import urllib.request


def fetch_page(url):
    """Fetch HTML content from a URL."""
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.read().decode('utf-8', errors='replace')


def find_all_asset_images(html):
    """Find ALL asset image references in HTML using regex."""
    pattern = r'["\u0027](\.?/?assets/[^"\u0027\s]+?\.(?:jpg|jpeg|png|webp))'
    matches = re.findall(pattern, html, re.IGNORECASE)
    return list(dict.fromkeys(matches))  # deduplicate preserving order


def select_best_images(all_urls, max_count=4):
    """
    Select best content images:
    - Group by base image name (strip resolution and extension)
    - Pick highest resolution per group, prefer .jpg/.png over .webp
    - Prioritize content images (minh-hoa, sapo, etc.) over banner/footer
    - Skip mobile versions (prefer PC/landscape)
    - Skip logo.svg, tiny icons etc.
    """
    # Group by base name
    groups = {}
    for url in all_urls:
        filename = url.split('/')[-1]
        # Skip SVG
        if filename.endswith('.svg'):
            continue
        # Extract base name
        base = re.sub(r'-\d+x\d+', '', filename)
        base = re.sub(r'\.(png|jpg|jpeg|webp)$', '', base, flags=re.IGNORECASE)
        if base not in groups:
            groups[base] = []
        groups[base].append(url)
    
    # For each group, pick best version
    best_per_group = {}
    for base, urls in groups.items():
        def sort_key(u):
            is_webp = u.lower().endswith('.webp')
            match = re.search(r'-(\d+)x(\d+)', u)
            width = int(match.group(1)) if match else 500
            return (not is_webp, width)
        urls.sort(key=sort_key, reverse=True)
        best_per_group[base] = urls[0]
    
    # Categorize and prioritize
    content_images = []  # minh-hoa, illustrations
    sapo_images = []     # sapo/subtitle images
    banner_images = []   # banner/hero
    footer_images = []   # footer
    other_images = []    # everything else
    
    for base, url in best_per_group.items():
        lower_base = base.lower()
        # Skip mobile versions
        if 'mobile' in lower_base:
            continue
        # Skip tiny title images
        if 'tit-phu' in lower_base:
            continue
        
        if 'minh-hoa' in lower_base or 'image-' in lower_base:
            content_images.append((base, url))
        elif 'sapo' in lower_base:
            sapo_images.append((base, url))
        elif 'banner' in lower_base:
            banner_images.append((base, url))
        elif 'footer' in lower_base:
            footer_images.append((base, url))
        else:
            other_images.append((base, url))
    
    # Build priority list: content first, then other, banner, sapo, footer
    priority = content_images + other_images + banner_images + sapo_images + footer_images
    
    # Return top N URLs
    selected = [url for _, url in priority[:max_count]]
    return selected


def download_image(url, save_path):
    """Download a single image."""
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://nhandan.vn/',
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            with open(save_path, 'wb') as f:
                f.write(data)
            return len(data)
    except Exception as e:
        print(f"  ERROR downloading {url}: {e}")
        return 0


def process_page(page_url, save_dir, label, max_images=4):
    """Process a single page: fetch, parse, select, download."""
    print(f"\n{'='*60}")
    print(f"Processing: {label}")
    print(f"URL: {page_url}")
    print(f"Save to: {save_dir}")
    print(f"{'='*60}")
    
    # 1. Fetch HTML
    print("Fetching page HTML...")
    html = fetch_page(page_url)
    print(f"  Got {len(html):,} bytes of HTML")
    
    # 2. Find all asset image URLs using regex
    all_urls = find_all_asset_images(html)
    print(f"  Found {len(all_urls)} unique asset image paths")
    for i, u in enumerate(all_urls):
        print(f"    [{i+1}] {u}")
    
    # 3. Select best images
    selected = select_best_images(all_urls, max_count=max_images)
    print(f"\n  Selected {len(selected)} images for download:")
    for i, u in enumerate(selected):
        print(f"    [{i+1}] {u}")
    
    # 4. Build full URLs and download
    base_url = page_url.rsplit('/', 1)[0] + '/'
    os.makedirs(save_dir, exist_ok=True)
    downloaded = []
    
    for i, rel_url in enumerate(selected):
        clean_url = rel_url.lstrip('./')
        full_url = base_url + clean_url
        
        out_name = f"real_{i+1}.jpg"
        out_path = os.path.join(save_dir, out_name)
        
        print(f"\n  Downloading [{i+1}]: {full_url}")
        size = download_image(full_url, out_path)
        if size > 0:
            print(f"    Saved: {out_path} ({size:,} bytes)")
            downloaded.append((out_name, size, full_url))
        else:
            print(f"    FAILED: {out_path}")
    
    return downloaded


def main():
    pages = [
        {
            'label': 'NQ59 - Hoi nhap quoc te',
            'url': 'https://nhandan.vn/special/nghi-quyet-59-ve-hoi-nhap-quoc-te-trong-tinh-hinh-moi/index.html',
            'save_dir': 'C:/Users/thanh/OneDrive/Desktop/e-magazine/images/resolutions/59/',
        },
        {
            'label': 'NQ66 - Xay dung va thi hanh phap luat',
            'url': 'https://nhandan.vn/special/nghi-quyet-66-doi-moi-cong-tac-xay-dung-va-thi-hanh-phap-luat-dap-ung-yeu-cau-phat-trien-dat-nuoc-trong-ky-nguyen-moi/index.html',
            'save_dir': 'C:/Users/thanh/OneDrive/Desktop/e-magazine/images/resolutions/66/',
        },
        {
            'label': 'NQ68 - Kinh te tu nhan',
            'url': 'https://nhandan.vn/special/nghi-quyet-68-phat-trien-kinh-te-tu-nhan/index.html',
            'save_dir': 'C:/Users/thanh/OneDrive/Desktop/e-magazine/images/resolutions/68/',
        },
    ]
    
    all_results = {}
    
    for page in pages:
        results = process_page(page['url'], page['save_dir'], page['label'])
        all_results[page['label']] = results
    
    # Summary
    print(f"\n\n{'='*60}")
    print("DOWNLOAD SUMMARY")
    print(f"{'='*60}")
    for label, results in all_results.items():
        print(f"\n{label}:")
        if results:
            for name, size, url in results:
                src_file = url.split('/')[-1]
                print(f"  OK {name} ({size:,} bytes) <- {src_file}")
        else:
            print("  No images downloaded")
    
    total = sum(len(r) for r in all_results.values())
    print(f"\nTotal images downloaded: {total}")


if __name__ == '__main__':
    main()
