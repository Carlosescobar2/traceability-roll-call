const express = require('express')
const path =require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken:'fff90ac7b4a94ae799d2411124c7cdc0',
    captureUncaught: true, 
    captureUnhandledRejections: true
})
const students = []
const timeEntered = []
const app = express()
app.use(express.json())
app.use('/style', express.static('./public/styles.css'))

app.get('/', (req,res)=> { 
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('Information sent successfully')
})
app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('Studen added Successfully', {author:'Carlos'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    }

})

app.post('/api/times', (req,res)=> { 
    let {timeStamp} = req.body

    const index = timeEntered.findIndex(timeMarked => timeMarked === time)
    if(index === -1 && timeStamp != ''){
        timeEntered.push(timeStamp)
        rollbar.log('Time entered Sucessfully', {author:'Carlos'})
        res.status(200).send(timeEntered)
    }else if  (timeStamp === ''){
        rollbar.error('No time given')
        res.status(400).send('must enter a time for student')
    }else { 
        rollbar.error('time is already taken')
        res.status(400)
    }

    
})

const port = process.env.PORT || 4903

app.use(rollbar.errorHandler())

app.listen(port, ()=> console.log('Take us to port 4903'))