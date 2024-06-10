const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const port=80;
const bodyparser=require("body-parser")
const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/contactdance',{useNewUrlParser:true});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,

  });
  const contact = mongoose.model('contact', contactSchema);

app.use('static',express.static('static'));
app.use(express.urlencoded());

// app.get("/",(req,res)=>{
//     res.send("this is my first express");
// });
app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views')); 


app.get('/',(req,res)=>{

    const param={}
    res.status(200).render('index.pug',param);
});
app.get('/contact',(req,res)=>{

    const param={}
    res.status(200).render('contact.pug',param);
});
app.get('/about',(req,res)=>{

    const param={}
    res.status(200).render('about.pug',param);
});
app.post('/contact',(req,res)=>{
    var Mydata=new contact(req.body);
    Mydata.save().then(() =>{
        res.send("this is save in database")
    }).catch(() =>{
        res.status(404).send("item not save due to server issue")

    });

    
   
});


app.listen(port,()=>{
    console.log(`application started successfully on port ${port}`);
});