
const express= require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ruybonSite') 
.catch(console.log('Could not connect to mongoDB database')); //connect to mongoDB server

const app=express(); //create server

app.use(express.static('public'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());  // to support URL-encoded bodies

const personSchema= new mongoose.Schema ({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    areaCode: {
        type: Number,
    },
    telNum: {
        type: Number,
    },
    query: {
        type: String,
        required: true
    }
});

const Person=mongoose.model('Person', personSchema);


app.all('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.all('/index.html', (req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.all('/aboutus.html', (req,res)=>{
    res.sendFile(__dirname+'/aboutus.html');
})

app.all('/services.html', (req,res)=>{
    res.sendFile(__dirname+'/services.html');
})

app.all('/projects.html', (req,res)=>{
    res.sendFile(__dirname+'/projects.html');
})

app.route('/contact.html')
.get((req,res)=>{
    res.sendFile(__dirname+'/contact.html');
})
.put((req,res)=>{
    res.status(404).send('<h1>PUT method not supported</h1>');
})
.delete((req,res)=>{
    res.status(404).send('<h1>DELETE method not supported</h1>');
})
.post((req,res)=>{
    const contactInfo=req.body;
    
    const person= new Person({
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        email: contactInfo.email,
        areaCode: contactInfo.areaCode,
        telNum: contactInfo.telNum,
        query: contactInfo.query
    })
    console.log(person)
    person.save();
    console.log(contactInfo);
})


const appPort= 3000;
app.listen(appPort, ()=>{
    console.log('server running at port '+ appPort);
}); //starting server