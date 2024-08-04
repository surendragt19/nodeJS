const lib=require('./lib.js')

//file system module
const fs = require('fs');
// const txt=fs.readFileSync('demo.txt','utf-8')
// console.log(txt)


fs.readFile('demo.txt','utf-8',(err,txt)=>{
    console.log(txt)
})



console.log(lib.sum(4,5),lib.diff(6,7))
const a=5;