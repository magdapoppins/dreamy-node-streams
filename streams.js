// Require Node file system
const fs = require('fs')
// The Split2 lib splits text on new lines
const split = require('split2')
// Thuogh2 creates a transform stream, which is readable and writeable. 
const through2 = require('through2')

let read = fs.createReadStream('./my.txt')
let write = fs.createWriteStream('./copy.txt')


// By using the node file system you can read, create, update, delete and rename files.
// This is a readable stream 

// read.on('data', (piece) => {
//     console.log(`Recieved ${piece.length} bytes of data.`)
// })

// ...and this is a writeable stream

// read.pipe(write)

// One can also transform streams (this one creates an encrypted file)
read
    .pipe(split())
    .pipe(through2(function (piece, encryption, callback) {
        for (var i = 0; i < piece.length; i++)
            // For each byte code (each character) from the piece
            // Add 5
            // Out comes gibberish
            piece[i] = piece[i] + 5
        this.push(piece)
        
        callback()
    }))
    .pipe(write)
    .on('finish', function () {
        console.log('A new encrypted file was created.')
    })

