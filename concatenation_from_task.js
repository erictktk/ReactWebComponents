const fs = require('fs');
const path = require('path');

const args = process.argv;

console.log(args);

//Specify the directory where your module files are located.
//first arg is node.exe
//second arg is script
//third [2] arg is director
const moduleDirectory = `${args[2]}`;

// Create an array to store file content.
const concatenatedContent = [];

// Extensions to exclude:
const excludeExtensions = ['.css', '.json', '.scss', '.html'];

function concatenateFilesInDirectory(directoryPath, relativePath = '') {
  fs.readdirSync(directoryPath).forEach((item) => {
    const itemPath = path.join(directoryPath, item);

    // Skip the .git directory
    if (item === '.git') {
      return;
    }

    // Recursively handle directories
    if (fs.statSync(itemPath).isDirectory()) {
      concatenateFilesInDirectory(itemPath);
    } else {
      // Skip files with extensions listed in excludeExtensions
      if (excludeExtensions.includes(path.extname(itemPath))) {
        return;
      }

      // Read and concatenate only non-excluded files.
      const fileContent = fs.readFileSync(itemPath, 'utf-8');
      const totalContent = `//### Start of ${itemPath} \n\n${fileContent}`;
      concatenatedContent.push(totalContent);
    }
  });
}

// Start the recursive concatenation process.
concatenateFilesInDirectory(moduleDirectory);

// Join the file content and save it to a single file.
const outputFilePath = './concatenated_module.js';
fs.writeFileSync(outputFilePath, concatenatedContent.join('\n'));

console.log('Module files concatenated and saved to concatenated_module.js');
