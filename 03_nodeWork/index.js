const fs=require('fs')


//blocking //sync
console.log("Hello")
console.log("2")
const res=fs.readFileSync("./txt.txt","utf-8")
console.log(res)
console.log("4")



//non block //async
console.log("Hello")
console.log("2")
fs.readFile("./txt.txt","utf-8",(e,r)=>{
    console.log("async",r)
})
console.log("4")


