const JSZip = require('jszip');
// import saveAs from 'file-saver';
const saveAs = require('file-saver');

const zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");
const img = zip.folder("images");
saveAs(zip, "hello world.txt");

console.log("Hello")