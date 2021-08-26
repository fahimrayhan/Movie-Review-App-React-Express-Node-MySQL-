const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')


const App = express();

App.get('/',(req,res) => {
    res.send("Hello World!");
})

App.listen(5050,()=>{
    console.log("Running at http://localhost:5050 ")
})