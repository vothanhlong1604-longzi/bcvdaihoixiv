"""Find all asset image references in HTML pages (not just img/source tags)."""
import urllib.request
import re

pages = [
    ("NQ59", "https://nhandan.vn/special/nghi-quyet-59-ve-hoi-nhap-quoc-te-trong-tinh-hinh-moi/index.html"),
    ("NQ66", "https://nhandan.vn/special/nghi-quyet-66-doi-moi-cong-tac-xay-dung-va-thi-hanh-phap-luat-dap-ung-yeu-cau-phat-trien-dat-nuoc-trong-ky-nguyen-moi/index.html"),
    ("NQ68", "https://nhandan.vn/special/nghi-quyet-68-phat-trien-kinh-te-tu-nhan/index.html"),
]

for label, url in pages:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="replace")
    
    # Find ALL ./assets/ references anywhere in HTML
    pattern = r'["\u0027](\.?/?assets/[^"\u0027\s]+?\.(?:jpg|jpeg|png|webp|svg))'
    matches = re.findall(pattern, html, re.IGNORECASE)
    unique = list(dict.fromkeys(matches))
    
    print(f"\n{label}: {len(unique)} unique asset image paths")
    for i, m in enumerate(unique):
        print(f"  [{i+1}] {m}")
    
    # Also look for data-src, data-image, background-image patterns
    data_pattern = r'(?:data-src|data-image|background-image)[=:]\s*["\u0027]?([^"\u0027\s)]+\.(?:jpg|jpeg|png|webp))'
    data_matches = re.findall(data_pattern, html, re.IGNORECASE)
    if data_matches:
        print(f"\n  Additional data-src/bg patterns:")
        for m in data_matches:
            print(f"    {m}")
    
    # Look for JSON-embedded image URLs
    json_pattern = r'"(?:src|url|image|thumbnail)":\s*"([^"]+\.(?:jpg|jpeg|png|webp))"'
    json_matches = re.findall(json_pattern, html, re.IGNORECASE)
    if json_matches:
        print(f"\n  JSON-embedded image URLs:")
        for m in list(dict.fromkeys(json_matches)):
            print(f"    {m}")
