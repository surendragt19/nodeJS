const fs=require('fs')

//create file in Synchronous
fs.writeFileSync("./test1.txt","This is create file this is override 2nd time")


// //create file in ASynchronous
// fs.writeFile("./test2.txt","This is create file using Async this is override 2nd time",(e)=>{ console.log(e) })


//readFile SYnchronuc
// console.log(fs.readFileSync("./test2.txt","utf-8"))

// const result=fs.readFileSync("./test2.txt","utf-8")
// console.log(result)


// ..readFile Asynchro


// fs.readFile("./test1.txt","utf-8",(er,res)=>{
//     if(er){
//         console.log(er)
//     }
//     else{
//         console.log(res)
//     }
// })


// fs.readFile("./test1.txt","utf-8",(er,res)=>{
//     if(er){
//         console.log(er)
//     }
//     else{
//         console.log(res)
//     }
// })



// //append file means add new  using sync
// const newData="This is some new data!\n";
// console.log(fs.appendFileSync("./test2.txt",newData))




// append file means add new  using async
// const newDatas="This is some new data!\n";
// fs.appendFile("./test1.txt",newDatas,(e)=>{
//     if(e){
//         console.log(e)
//     }
//     else{
//         console.log("Addpend")
//     }
// })


//copy file
// fs.cpSync("./test1.txt","./copy.txt")
// fs.copyFileSync("./test2.txt","./copy2.txt")


// //delete file sync
// fs.unlinkSync("./copy2.txt")


// delete file Async
// fs.unlink("./copy.txt",(e)=>{})