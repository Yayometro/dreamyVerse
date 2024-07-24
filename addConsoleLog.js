const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const addConsoleLog = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    const logStatement = `console.log("Rendering ${filePath}");\n`;
    const result = logStatement + data;

    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(`Added console.log to ${filePath}`);
      }
    });
  });
};

const traverseDirectory = (dirPath) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dirPath}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);

      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error(`Error stating file ${filePath}:`, err);
          return;
        }

        if (stat.isDirectory()) {
          traverseDirectory(filePath);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.page.tsx')) {
          addConsoleLog(filePath);
        }
      });
    });
  });
};

traverseDirectory(directoryPath);
