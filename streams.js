// Require Node file system
const fs = require('fs')
const split = require('split2')
const through2 = require('through2')

let read = fs.createReadStream('./my.txt')
let write = fs.createWriteStream('./copy.txt')


// By using the node file system you can read, create, update, delete and rename files.
// This is a readable stream 
read.on('data', (piece) => {
    console.log(`Recieved ${piece.length} bytes of data.`)
})

// ...and this is a writeable stream
read.pipe(write)

// One can also transform streams (this one creates an encrypted file)
read
    .pipe(split())
    .pipe(through2(function (piece, encryption, callback) {
        for (var i = 0; i < piece.length; i++)
            piece[i] = piece[i] + 3

        this.push(piece)
        
        callback()
    }))
    .pipe(write)
    .on('finish', function () {
        console.log('A new encrypted file was created.')
    })

