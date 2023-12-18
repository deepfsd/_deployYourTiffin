const express = require('express');
const app = express();
const port = 5000;

const mongo = require("./database");

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get('/', (req,res)=>{ 
    res.send('Hello World');
})

app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));  

mongo()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Running on ${port}...`);
    });
})
.catch((error)=>{
    console.error('Error starting the server: ', error);
});

// 