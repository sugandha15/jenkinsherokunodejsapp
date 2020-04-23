const express = require('express');


const session =require('express-session');

//const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();


app.use(session({
    secret:'2C44-4D44-WppQ38S',
    resave:true,
    saveUninitialized:true
}))
// http://localhost:port/

const auth= (req,res,next)=>{

    if(req.session && req.session.user==='user' && req.session.admin)
    return next();
    else
    res.sendStatus(401);
}

app.get('/login',(req,res)=>{
    if(!req.query.username || !req.query.password)
    res.send('login failed')
    else if(req.query.username === 'user' && req.query.password === 'pass'){
        req.session.user= 'user';
        req.session.admin=true;
        res.send('login successfull')
    }
    else
    res.send('login failed');
})

app.get('/',(req,res)=>{
res.send('Welcome To Express App')
})

app.get('/index',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    })

    // http://localhost:port/order?id=1 // query parameter
    app.get('/order',auth,(req,res)=>{
        res.send("Order Details requested for "+req.query.id);
        })

         // http://localhost:port/order/1/ordername // query parameter
    app.get('/order/:id/:name',auth,(req,res)=>{
        res.send("Order Details requested for "+req.params.id+" "+req.params.name);
        })
    
    app.get('/logout',(req,res)=>{
        req.session.destroy();
        res.send('logged out succesfully')
        })



        app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

//app.listen(3000,()=>console.log('server running on port 3000'))