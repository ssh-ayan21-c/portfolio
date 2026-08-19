const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src/components');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\[#1E293B\]/g, 'content');
    content = content.replace(/"#1E293B"/g, '"var(--theme-content)"');
    content = content.replace(/'#1E293B'/g, '"var(--theme-content)"');
    fs.writeFileSync(file, content);
});
console.log('Replaced successfully.');
