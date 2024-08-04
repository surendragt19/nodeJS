const http = require("http");
const fs=require('fs')

const index=fs.readFileSync('index.html','utf-8')  //send static file
const data=JSON.parse(fs.readFileSync('data.json','utf-8'))  //send data file

const products=data.products;



const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  
  if(req.url.startsWith('/product')){
    const id=req.url.split('/')[2]
    const product=products.find(p=>p.id===(+id))
    console.log(product)
    res.setHeader('Content-Type','text/html');
    let modifyIndex=index.replace('**title**',product.title)
    .replace('**price**',product.price)
    .replace('**rating**',product.rating)
    .replace('**url**',product.thumbnail)
    res.end(modifyIndex);
    return
  }

  switch(req.url){
    case '/':
        res.setHeader('Content-Type', 'text/html');
        res.end(index);
        break;
    case '/api':
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify(data));
        break;
    // case '/product':
    //     res.setHeader('Content-Type','text/html');
    //     let modifyIndex=index.replace('**title**',product.title).replace('**price**',product.price).replace('**rating**',product.rating).replace('**url**',product.thumbnail)
    //     res.end(modifyIndex);
    //     break;
    default:
        res.writeHead(404);
        res.end()
        
    
  }
 
 console.log("Server Started");

    


//  res.setHeader("DummyHeader", "DummyValue");
  // res.setHeader('Content-Type','application/json')
  // res.end(JSON.stringify(data))

  //   res.setHeader("Content-Type", "text/html");
  //   res.end("Hello");
});

server.listen(8080);
