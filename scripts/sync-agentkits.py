import os
import requests
import json
import hashlib
import sys

LOCAL_TEMPLATES_DIR = "files/templates"
API_BASE_URL = "https://lamatic.ai/templates/agentkits"
REQUEST_TIMEOUT = 30
API_KEY = os.environ.get("LAMATIC_API_KEY")

if not API_KEY:
    print("Error: LAMATIC_API_KEY secret not found.")
    sys.exit(1)

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def get_file_hash(filepath):
    """Calculates the SHA-256 hash of a file's content."""
    with open(filepath, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

def get_local_files():
    """Returns a dictionary of local templates: {rel_path: (filepath, hash)}"""
    local_files = {}
    if not os.path.isdir(LOCAL_TEMPLATES_DIR):
        print(f"Error: Local directory not found: {LOCAL_TEMPLATES_DIR}")
        sys.exit(1)
        
    for root, _, files in os.walk(LOCAL_TEMPLATES_DIR):
        for filename in files:
            if filename.endswith(".json"):
                filepath = os.path.join(root, filename)
                file_hash = get_file_hash(filepath)
                
                rel_path = os.path.relpath(filepath, LOCAL_TEMPLATES_DIR).replace(os.sep, '/')
                local_files[rel_path] = {"path": filepath, "hash": file_hash}
                
    print(f"Found {len(local_files)} local files.")
    return local_files

def get_remote_templates():
    """Returns a dictionary of remote templates: {name: hash}"""
    print("Fetching remote templates...")
    try:
        response = requests.get(API_BASE_URL, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
        
        templates = response.json()
        
        remote_templates = {t['name']: t['hash'] for t in templates}
        print(f"Found {len(remote_templates)} remote templates.")
        return remote_templates
        
    except requests.exceptions.RequestException as e:
        status = getattr(getattr(e, 'response', None), 'status_code', 'N/A')
        print(f"Error fetching remote templates: {e} (HTTP {status})")
        sys.exit(1)
    except Exception as e:
        print(f"Error processing remote templates: {e}")
        sys.exit(1)

def sync_templates(local_files, remote_templates):
    """Compares local and remote and performs sync operations."""
    
    sync_failed = False
    
    for rel_path, local_data in local_files.items():
        try:
            with open(local_data['path'], 'r') as f:
                content = json.load(f)
        except Exception as e:
            print(f"Error reading local file {local_data['path']}: {e}")
            sync_failed = True
            continue

        if rel_path not in remote_templates:
            print(f"CREATING: {rel_path}")
            try:
                payload = {"name": rel_path, "content": content, "hash": local_data['hash']}
                response = requests.post(API_BASE_URL, headers=HEADERS, json=payload, timeout=REQUEST_TIMEOUT)
                response.raise_for_status()
            except requests.exceptions.RequestException as e:
                status = getattr(getattr(e, 'response', None), 'status_code', 'N/A')
                print(f"Error creating {rel_path}: {e} (HTTP {status})")
                sync_failed = True
            except Exception as e:
                print(f"Error creating {rel_path}: {e}")
                sync_failed = True
                
        elif local_data['hash'] != remote_templates[rel_path]:
            print(f"UPDATING: {rel_path}")
            try:
                payload = {"content": content, "hash": local_data['hash']}
                response = requests.put(f"{API_BASE_URL}/{rel_path}", headers=HEADERS, json=payload, timeout=REQUEST_TIMEOUT)
                response.raise_for_status()
            except requests.exceptions.RequestException as e:
                status = getattr(getattr(e, 'response', None), 'status_code', 'N/A')
                print(f"Error updating {rel_path}: {e} (HTTP {status})")
                sync_failed = True
            except Exception as e:
                print(f"Error updating {rel_path}: {e}")
                sync_failed = True
        else:
            print(f"UNCHANGED: {rel_path}")

    deletion_count = len([path for path in remote_templates if path not in local_files])
    if deletion_count > 0 and deletion_count >= (len(remote_templates) * 0.5):
        print(f"ABORT: Safeguard triggered. Attempting to delete {deletion_count}/{len(remote_templates)} templates (>50%).")
        print("This may indicate a misconfiguration. Aborting all deletions.")
        sync_failed = True
    else:
        for rel_path in remote_templates:
            if rel_path not in local_files:
                print(f"DELETING: {rel_path}")
                try:
                    response = requests.delete(f"{API_BASE_URL}/{rel_path}", headers=HEADERS, timeout=REQUEST_TIMEOUT)
                    response.raise_for_status()
                except requests.exceptions.RequestException as e:
                    status = getattr(getattr(e, 'response', None), 'status_code', 'N/A')
                    print(f"Error deleting {rel_path}: {e} (HTTP {status})")
                    sync_failed = True
                except Exception as e:
                    print(f"Error deleting {rel_path}: {e}")
                    sync_failed = True

    return not sync_failed

if __name__ == "__main__":
    local = get_local_files()
    remote = get_remote_templates()
    
    if sync_templates(local, remote):
        print("Sync complete.")
    else:
        print("Sync finished with errors.")
        sys.exit(1)