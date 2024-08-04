const htt=require('http')

const res=htt.createServer((r,res)=>{
    console.log(r.headers.host)
    console.log(r.body)
    res.end("Serve By  Hello")
})
res.listen(8000,()=>{
    console.log("Server is started")
})