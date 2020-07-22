const express = require('express');
const mysql = require('mysql');
const dotenv = require("dotenv");
const bodyParser=require('body-parser');
const bcrypt = require('bcrypt');
const PORT =8000;
const app=express();

dotenv.config({ path:"./.env" });  

app.use(express.json());

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 
const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
     user:process.env.DATABASE_USER,
     password:process.env.DATABASE_PASSWORD,
     database:process.env.DATABASE
});


db.connect( (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected...")
    }
} );

app.get('/',(req,res)=>{
    res.send('Home Page')
});


app.get('/signup',(req,res)=>{
    res.send('Get signup')
});

app.post('/signup',async(req,res)=>{
    res.send('Post signup')
    const { user_name,phone,password,status_id} = req.body;
    console.log(req.body);
    console.log("SUCCESFULL") 
        db.query('INSERT INTO users SET ?',{
            user_name:req.body.user_name,
            phone:req.body.phone,
            password:req.body.password= await bcrypt.hash(req.body.password,8),
            status_id:req.body.status_id
        },(error,results)=>{
             if(error){
                console.log(error);
            }else{
                console.log(results);   
            }
        })
        console.log(bcrypt.hash(req.body.password,8));
});


app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`)
});
