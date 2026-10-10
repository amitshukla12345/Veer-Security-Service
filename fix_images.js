const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Replace absolute path "/gallery/" with relative path "gallery/"
  content = original.replace(/['"]\/gallery\//g, match => {
    const quote = match[0];
    return quote + 'gallery/'; 
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed image paths in: ' + filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

console.log('Fixing image paths for GitHub Pages...');
walkDir(path.join(process.cwd(), 'src'));
console.log('Done!');
