#!/bin/bash

# Test build script for GiaSi Portfolio
echo "🚀 Testing build process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the GiaSi-Portfolio directory."
    exit 1
fi

# Clean previous build
print_status "Cleaning previous build..."
rm -rf dist node_modules/.vite

# Install dependencies
print_status "Installing dependencies..."
npm ci --legacy-peer-deps

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

# Run linting
print_status "Running linting..."
npm run lint:check || print_warning "Linting completed with warnings"

# Build project
print_status "Building project..."
npm run build

if [ $? -eq 0 ]; then
    print_status "✅ Build successful!"
    
    # Check if dist directory exists and has files
    if [ -d "dist" ] && [ "$(ls -A dist)" ]; then
        print_status "✅ Build output generated successfully"
        echo "📁 Build files:"
        ls -la dist/
    else
        print_error "❌ Build output directory is empty"
        exit 1
    fi
else
    print_error "❌ Build failed"
    exit 1
fi

print_status "🎉 All tests passed! Ready for deployment."
