const express = require('express')
const app = express()
const port = 8080
const tracer = require('./tracing')(process.env.OTLP_SERVICENAME);
const SERVICE_B=process.env.SERVICE_B
const fetch=require('node-fetch');

app.get("/hello",(req,res)=>{
    console.log('http://'+process.env.OTLP_HOST+":"+process.env.OTLP_PORT)
    res.send({
        message:"hello",
        timestamp:Date.now()
    })
})
app.get("/random",async( req,res)=>{
    const response = await fetch('https://uselessfacts.jsph.pl/random.json');
    const body = await response.text();
    
    console.log(body);
    res.send(body)
})

app.get("/call",async(req,res)=>{
    const response = await fetch(`http://${SERVICE_B}`);
    const body = await response.text();
    
    console.log(body);
    res.send(body)
})

app.listen(port, () => { console.log(`Listening at http://localhost:${port}`)});