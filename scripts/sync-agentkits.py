import os
import requests
import json
import hashlib

LOCAL_TEMPLATES_DIR = "files/templates"

API_BASE_URL = "https://lamatic.ai/templates/agentkits" 

API_KEY = os.environ.get("LAMATIC_API_KEY")
if not API_KEY:
    print("Error: LAMATIC_API_KEY secret not found.")
    exit(1)

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def get_file_hash(filepath):
    """Calculates the SHA-256 hash of a file's content."""
    with open(filepath, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

def get_local_files():
    """Returns a dictionary of local templates: {filename: (filepath, hash)}"""
    local_files = {}
    for root, _, files in os.walk(LOCAL_TEMPLATES_DIR):
        for filename in files:
            if filename.endswith(".json"): 
                filepath = os.path.join(root, filename)
                file_hash = get_file_hash(filepath)
                local_files[filename] = {"path": filepath, "hash": file_hash}
    print(f"Found {len(local_files)} local files.")
    return local_files

def get_remote_templates():
    """Returns a dictionary of remote templates: {filename: hash}"""
    print("Fetching remote templates...")
    try:
        response = requests.get(API_BASE_URL, headers=HEADERS)
        response.raise_for_status()
        
        templates = response.json() 
        
        remote_templates = {t['name']: t['hash'] for t in templates}
        print(f"Found {len(remote_templates)} remote templates.")
        return remote_templates
        
    except Exception as e:
        print(f"Error fetching remote templates: {e}")
        exit(1)

def sync_templates(local_files, remote_templates):
    """Compares local and remote and performs sync operations."""
    
    for filename, local_data in local_files.items():
        with open(local_data['path'], 'r') as f:
            content = json.load(f)

        if filename not in remote_templates:
            print(f"CREATING: {filename}")
            try:
                payload = {"name": filename, "content": content, "hash": local_data['hash']}
                response = requests.post(API_BASE_URL, headers=HEADERS, json=payload)
                response.raise_for_status()
            except Exception as e:
                print(f"Error creating {filename}: {e}")
                
        elif local_data['hash'] != remote_templates[filename]:
            print(f"UPDATING: {filename}")
            try:
                payload = {"content": content, "hash": local_data['hash']}
                response = requests.put(f"{API_BASE_URL}/{filename}", headers=HEADERS, json=payload)
                response.raise_for_status()
            except Exception as e:
                print(f"Error updating {filename}: {e}")
        else:
            print(f"UNCHANGED: {filename}")

    for filename in remote_templates:
        if filename not in local_files:
            print(f"DELETING: {filename}")
            try:
                response = requests.delete(f"{API_BASE_URL}/{filename}", headers=HEADERS)
                response.raise_for_status()
            except Exception as e:
                print(f"Error deleting {filename}: {e}")

if __name__ == "__main__":
    local = get_local_files()
    remote = get_remote_templates()
    sync_templates(local, remote)
    print("Sync complete.")