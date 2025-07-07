#!/usr/bin/env python3
"""
Simple script to update all node documentation files to use the new NodeTypeInfo component.
"""

import os
import re
from pathlib import Path

def update_node_file(file_path):
    """Update a single node file to use the NodeTypeInfo component."""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already updated
    if 'import { NodeTypeInfo }' in content:
        print(f"Already updated: {file_path}")
        return False
    
    # Add import if not present
    if 'import { NodeOverview }' in content and 'import { NodeTypeInfo }' not in content:
        content = content.replace(
            'import { NodeOverview } from "@/components/NodeOverview";',
            'import { NodeOverview } from "@/components/NodeOverview";\nimport { NodeTypeInfo } from "@/components/NodeTypeInfo";'
        )
        content = content.replace(
            'import { NodeOverview } from "@/components/NodeOverview"',
            'import { NodeOverview } from "@/components/NodeOverview";\nimport { NodeTypeInfo } from "@/components/NodeTypeInfo";'
        )
    
    # Find the Node Type Information section and extract the description
    # Look for the pattern: "This node is an **Action** node that [description]."
    pattern = r'This node is an \*\*Action\*\* node that (.*?)\.'
    
    match = re.search(pattern, content)
    if match:
        description = match.group(1)
        
        # Find the entire Node Type Information section to replace
        section_pattern = r'## Node Type Information\s*\n\s*\n\|.*?\|\s*\n\|.*?\|\s*\n\|.*?\|\s*\n\|.*?\|\s*\n\|.*?\|\s*\n\|.*?\|\s*\n\s*This node is an \*\*Action\*\* node that .*?\.\s*\n'
        
        # Create the replacement component
        replacement = f'''<NodeTypeInfo 
  batchTrigger={{false}}
  eventTrigger={{false}}
  action={{true}}
  description="This node is an Action node that {description}."
/>'''
        
        # Replace the entire section
        new_content = re.sub(section_pattern, replacement, content, flags=re.DOTALL)
        
        # Write back to file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated: {file_path}")
        return True
    
    print(f"No Node Type Information section found: {file_path}")
    return False

def main():
    """Main function to update all node files."""
    
    # Define the base directory
    base_dir = Path("pages/docs/nodes")
    
    # Node categories
    categories = ["ai", "data", "logic", "apps"]
    
    total_updated = 0
    
    for category in categories:
        category_dir = base_dir / category
        if category_dir.exists():
            print(f"\nProcessing {category} nodes...")
            
            for file_path in category_dir.glob("*.mdx"):
                if file_path.name != "_meta.json":
                    if update_node_file(file_path):
                        total_updated += 1
    
    print(f"\nTotal files updated: {total_updated}")

if __name__ == "__main__":
    main() 