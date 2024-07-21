const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/components');

function addUseClientToFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;

        if (!data.includes('"use client"')) {
            const updatedData = `"use client";\n\n${data}`;
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) throw err;
                console.log(`Added "use client" to ${filePath}`);
            });
        }
    });
}

function traverseDirectory(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) throw err;

        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) throw err;

                if (stats.isDirectory()) {
                    traverseDirectory(filePath);
                } else if (path.extname(file) === '.tsx') {
                    addUseClientToFile(filePath);
                }
            });
        });
    });
}

traverseDirectory(directoryPath);
