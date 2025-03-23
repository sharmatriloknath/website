import json
from jinja2 import Environment, FileSystemLoader

# Load JSON data
with open('website_json.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Configure Jinja2
env = Environment(loader=FileSystemLoader(['.', "templates"]))  # '.' means current directory
template = env.get_template('index_template.html') # main html file 

# Render the template
output_from_parsed_template = template.render(data=data)

# Save the output to an HTML file
with open("index.html", "w", encoding="utf-8") as fh:
    fh.write(output_from_parsed_template)

print("Template rendered successfully to index.html")