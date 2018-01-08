// Require Node file system
var fs = require('fs'); 

// By using the node file system you can read, create, update, delete and rename files. 
let read = fs.createReadStream('./my.txt')

read.on('data', (chunk) => {
    console.log(`Recieved ${chunk.length} bytes of data.`)
})

let write = fs.createWriteStream('./copy.txt')
read.pipe(write)

