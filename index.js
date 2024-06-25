const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getAllPaths(dirPath, basePath = '') {
    const result = [];
    const items = await fs.readdir(dirPath, { withFileTypes: true });

    for (const item of items) {
        const relativePath = path.join(basePath, item.name);
        if (item.isDirectory()) {
            result.push(relativePath);
            result.push(...await getAllPaths(path.join(dirPath, item.name), relativePath));
        } else if (item.isFile()) {
            result.push(relativePath);
        }
    }

    return result;
}

async function processFiles(entryFolder ,allPaths, outputFile) {
    // Write overview
    await fs.appendFile(outputFile, ' -=-=-= overview of all files [start] -=-=-=\n');
    for (const itemPath of allPaths) {
        await fs.appendFile(outputFile, `./${itemPath}\n`);
    }
    await fs.appendFile(outputFile, ' -=-=-= overview of all files [end] -=-=-=\n\n');

    // Process each file
    for (const itemPath of allPaths) {
        const fullPath = path.join(entryFolder, itemPath);
        try{
            if ((await fs.stat(fullPath)).isFile()) {
                await fs.appendFile(outputFile, ` -=-=-= content of ./${itemPath} [start] -=-=-=\n`);
                const content = await fs.readFile(fullPath, 'utf8');
                await fs.appendFile(outputFile, content + '\n');
                await fs.appendFile(outputFile, ` -=-=-= content of ./${itemPath} [end] -=-=-=\n\n`);
            }
        }
        catch(e){
            console.error('[ERROR] fullPath: ', fullPath)
            console.error(e)
        }
    }
}

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    try {
        const entryFolder = await askQuestion("Enter the path of the entry folder: ");
        const outputFile = 'output.txt';

        // Clear the output file if it exists
        await fs.writeFile(outputFile, '');

        // Get all paths
        const allPaths = await getAllPaths(entryFolder);

        // Process files
        await processFiles(entryFolder, allPaths, outputFile);

        console.log(`Processing complete. Output written to ${outputFile}`);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        rl.close();
    }
}

main().catch(console.error);