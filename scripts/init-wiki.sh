#!/bin/bash
set -e

echo "📚 Initializing GitHub Wiki..."
echo ""
echo "⚠️  GitHub wikis must be initialized through the web interface first."
echo ""
echo "Please follow these steps:"
echo ""
echo "1. Open: https://github.com/ethanke/lum-ui/wiki"
echo "2. Click 'Create the first page'"
echo "3. Title: Home"
echo "4. Paste the content from: wiki/Home.md"
echo "5. Click 'Save Page'"
echo ""
echo "Then run this script again to push remaining pages."
echo ""

# Check if wiki repo exists
if git ls-remote https://github.com/ethanke/lum-ui.wiki.git &> /dev/null; then
    echo "✅ Wiki repository exists! Cloning and updating..."
    
    # Clone wiki
    rm -rf wiki-repo
    git clone https://github.com/ethanke/lum-ui.wiki.git wiki-repo
    
    # Copy generated pages
    cp wiki/*.md wiki-repo/
    
    # Commit and push
    cd wiki-repo
    git config user.name "Ethan"
    git config user.email "ethan@lum.tools"
    git add .
    git commit -m "📚 Update wiki documentation from source" || echo "No changes to commit"
    git push origin master
    
    cd ..
    rm -rf wiki-repo
    
    echo "✅ Wiki updated successfully!"
    echo "🔗 View at: https://github.com/ethanke/lum-ui/wiki"
else
    echo "❌ Wiki repository not found."
    echo ""
    echo "To initialize:"
    echo "1. Visit: https://github.com/ethanke/lum-ui/wiki"
    echo "2. Create the first page to initialize the wiki"
    echo "3. Run: deno task init:wiki"
fi
