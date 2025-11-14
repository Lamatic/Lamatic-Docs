#!/usr/bin/env python3
"""
Script to find and remove unused images from the codebase.
"""
import os
import re
import subprocess
from pathlib import Path
from typing import Set, List

# Image extensions to check
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'}

# Directories to exclude from search
EXCLUDE_DIRS = {'node_modules', '.next', '.git', '__pycache__', '.venv', 'venv'}

def get_all_image_files(root_dir: str) -> List[Path]:
    """Get all image files in the project."""
    image_files = []
    root = Path(root_dir)
    
    for ext in IMAGE_EXTENSIONS:
        for img_file in root.rglob(f'*{ext}'):
            # Skip excluded directories
            if any(excluded in img_file.parts for excluded in EXCLUDE_DIRS):
                continue
            image_files.append(img_file)
    
    return sorted(image_files)

def normalize_path_for_search(path: Path, root_dir: str) -> Set[str]:
    """Generate possible reference patterns for an image file."""
    root = Path(root_dir)
    rel_path = path.relative_to(root)
    
    patterns = set()
    
    # Full relative path from root
    patterns.add(str(rel_path))
    patterns.add(str(rel_path).replace('\\', '/'))
    
    # Path starting with ./
    patterns.add(f'./{rel_path}')
    patterns.add(f'./{rel_path}'.replace('\\', '/'))
    
    # Path starting with /
    patterns.add(f'/{rel_path}')
    patterns.add(f'/{rel_path}'.replace('\\', '/'))
    
    # Just filename
    patterns.add(path.name)
    
    # Path relative to pages/ or public/
    if 'pages' in rel_path.parts:
        pages_idx = rel_path.parts.index('pages')
        pages_rel = Path(*rel_path.parts[pages_idx:])
        patterns.add(str(pages_rel))
        patterns.add(f'./{pages_rel}')
        patterns.add(f'/{pages_rel}')
    
    if 'public' in rel_path.parts:
        public_idx = rel_path.parts.index('public')
        public_rel = Path(*rel_path.parts[public_idx:])
        patterns.add(str(public_rel))
        patterns.add(f'./{public_rel}')
        patterns.add(f'/{public_rel}')
        # Also check without public/ prefix (for Next.js public folder)
        if len(public_rel.parts) > 1:
            without_public = Path(*public_rel.parts[1:])
            patterns.add(f'/{without_public}')
            patterns.add(f'./{without_public}')
    
    # For images in pages/docs/img/, also check relative paths from parent dirs
    if 'img' in rel_path.parts:
        img_idx = rel_path.parts.index('img')
        img_rel = Path(*rel_path.parts[img_idx:])
        patterns.add(f'./img/{img_rel.name}')
        patterns.add(f'img/{img_rel.name}')
        patterns.add(f'./{img_rel}')
        patterns.add(f'/{img_rel}')
    
    return patterns

def search_in_file(file_path: Path, patterns: Set[str]) -> bool:
    """Check if any pattern is found in the file."""
    try:
        content = file_path.read_text(encoding='utf-8', errors='ignore')
        for pattern in patterns:
            # Escape special regex characters but keep wildcards
            escaped_pattern = re.escape(pattern)
            # Allow for optional quotes around the pattern
            regex = rf'["\']?{escaped_pattern}["\']?'
            if re.search(regex, content, re.IGNORECASE):
                return True
        return False
    except Exception:
        return False

def find_references(image_path: Path, root_dir: str) -> bool:
    """Check if image is referenced anywhere in the codebase."""
    patterns = normalize_path_for_search(image_path, root_dir)
    
    root = Path(root_dir)
    
    # Search in all code files
    code_extensions = {'.mdx', '.tsx', '.ts', '.js', '.jsx', '.json', '.md', '.css', '.py'}
    
    for ext in code_extensions:
        for code_file in root.rglob(f'*{ext}'):
            # Skip excluded directories
            if any(excluded in code_file.parts for excluded in EXCLUDE_DIRS):
                continue
            # Skip the image file itself
            if code_file == image_path:
                continue
            
            if search_in_file(code_file, patterns):
                return True
    
    return False

def main():
    root_dir = Path(__file__).parent.parent
    print(f"Scanning for unused images in: {root_dir}")
    
    all_images = get_all_image_files(str(root_dir))
    print(f"Found {len(all_images)} image files")
    
    unused_images = []
    used_images = []
    
    for i, img_path in enumerate(all_images, 1):
        rel_path = img_path.relative_to(root_dir)
        print(f"[{i}/{len(all_images)}] Checking: {rel_path}")
        
        if find_references(img_path, str(root_dir)):
            used_images.append(img_path)
            print(f"  ✓ Used")
        else:
            unused_images.append(img_path)
            print(f"  ✗ UNUSED")
    
    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Total images: {len(all_images)}")
    print(f"  Used: {len(used_images)}")
    print(f"  Unused: {len(unused_images)}")
    print(f"{'='*60}\n")
    
    if unused_images:
        print("Unused images:")
        for img in unused_images:
            print(f"  - {img.relative_to(root_dir)}")
        
        # Auto-delete unused images
        print("\nDeleting unused images...")
        deleted_count = 0
        for img in unused_images:
            try:
                img.unlink()
                print(f"Deleted: {img.relative_to(root_dir)}")
                deleted_count += 1
            except Exception as e:
                print(f"Error deleting {img.relative_to(root_dir)}: {e}")
        print(f"\nDeleted {deleted_count} unused images")
    else:
        print("No unused images found!")

if __name__ == '__main__':
    main()

