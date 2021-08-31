const express = require('express')
const path =require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken:'fff90ac7b4a94ae799d2411124c7cdc0',
    captureUncaught: true, 
    captureUnhandledRejections: true
})

const app = express()
app.use(express.json())
app.use('/style', express.static('./public/styles.css'))

app.get('/', (req,res)=> { 
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('Information sent successfully')
})

const port = process.env.PORT || 4903

app.listen(port, ()=> console.log('Take us to port 4903'))