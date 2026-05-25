#!/bin/bash
# Simple server starter script - tries multiple options

echo "🚀 Starting Beginner Web Studio..."
echo ""

# Try Python 3
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3"
    python3 -m http.server 8000
    exit 0
fi

# Try Python 2
if command -v python &> /dev/null; then
    echo "✅ Using Python 2"
    python -m SimpleHTTPServer 8000
    exit 0
fi

# Try Node.js with npx serve
if command -v npx &> /dev/null; then
    echo "✅ Using npx serve"
    npx -y serve -l 8000
    exit 0
fi

# Try PHP
if command -v php &> /dev/null; then
    echo "✅ Using PHP"
    php -S localhost:8000
    exit 0
fi

# If nothing works, provide instructions
echo "❌ No web server found!"
echo ""
echo "Please install one of the following:"
echo "  - Python: apt-get install python3 or brew install python3"
echo "  - Node.js: https://nodejs.org/"
echo "  - PHP: apt-get install php or brew install php"
echo ""
echo "Or simply open index.html directly in your browser!"
exit 1
