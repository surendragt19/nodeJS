const express = require('express')
const path=require('path')
const app = express()
const port = 3000

//template engine
app.set('view engine', 'ejs')
app.set('views',path.resolve('./views'))

app.get('/', (req, res) => res.render('home'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))