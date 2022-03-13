var express=require('express');
var mysql=require('mysql2'); 
var path=require('path');
var aadhar=require('aadhaar-validator');
var twilio=require('twilio')('AC6686ca9d1c71e289a2d7a1141c61886e','3d7b152b40f9a9eeb38ac12e459e7e59');
var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Sanju@123',
    database:'covay'
});


con.connect((err)=>{
    if(err){
        console.log("error");
    }
    else{
        console.log("connected");
    }
}); 

class Sql{

    constructor(){
        console.log("constructor called");
    }
    insert(name,age,uid,phone){ 
        if(name==null){
            return;
        }
        con.query("INSERT INTO user_details (Name,age,uid,phone) VALUES(?,?,?,?)",[name,age,uid,phone],(err,result,fields)=>{
            
            if(err)
            return 0;
            else
            return 1;
        });
    }

    
}

function random()
{
    return Math.floor(Math.random()*(9999-1000))+1000;  
}

function sendOtp(phone)
{ 
 var r=random();
 twilio.messages
  .create({
     body: "Your otp for covaxy login "+r,
     from: '+14703478110',
     to: '+91'+phone
   })
  .then(message => console.log(message.sid)); 
  return r;

} 

function mobileValidator(a){
    if(a.length<10)return false;
    if(a.charAt(0)!='9' || a.charAt(0)!='8' || a.charAt(0)!='7' || a.charAt(0)!='6')return false;
    return true;
}

  var app=express();
  

  app.listen(3000,(err)=>{
      if(err)
      console.log(err);
      else 
      console.log("port listened");
  });
  app.use(express.static('COVAXY')); 

  app.get('/css',(req,res)=>{
      res.sendFile(__dirname+'/style.css');
  })
  app.get('/js',(req,res)=>{
      
  })
  app.get('/home',(req,res)=>{ 
      res.sendFile(__dirname+'/home.html');
  });

  app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/login.html');
});

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+'/sign.html');

});

app.get("/userdetails",(req,res)=>{
    var sql=new Sql()
    console.log(req.query.name); 
    if(req.query.age<18)res.send("Age must be greater than 18");
    if(!aadhar.isValidNumber(req.query.aAdhar))res.send("Aadhar number doesn't exist");
    //if(!mobileValidator(req.query.phone))res.send("Mobile Number not valid");
    let b = sql.insert(req.query.name,req.query.age,req.query.aAdhar,req.query.phone); 
    if(b==0)res.send("Data already Exist");
    res.send("1");
});

app.get('/otp',(req,res)=>{ 
    
    
    let mob=0;
    con.query("SELECT phone FROM user_details WHERE uid=?",[req.query.uid],(err,result,fields)=>{
    res.send(result);
      
        }); }
)

    
    
    
   





  