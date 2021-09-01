const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')
require('dotenv').config()


const App = express();
App.use(cors());
App.use(bodyParser.json());

App.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})



App.get('/',(req,res) => {
    res.send("Hello World!");
})

App.post('/api/insert',(req,res) => {

    const movieName = req.body.movieName;
    const review = req.body.review;

    const sql = "INSERT INTO reviews (movie_name,movie_review) VALUES (?,?)"
    db.query(sql,[movieName,review], (err,result) => {
        if (err) {
            console.log(err)
        }
    })
})

App.get('/api/reviews',(req,res) => {
    const sql = "SELECT * FROM reviews"
    db.query(sql,(err,result)=>{
        if (err) {
            console.log(err)
        }
        else{
            res.send(result);
        }
        
    })
})

App.delete('/api/delete/:id',(req,res) => {
    const id = req.params.id;
    const sql = "DELETE FROM reviews WHERE id = ?"
    db.query(sql,id,(err,result)=>{
        if (err) {
            console.log(err)
        }
    })
})

App.put('/api/update' ,(req,res) => {
    const name = req.body.movieName;
    const review = req.body.review
    const sql = "UPDATE reviews SET movie_review = ? WHERE movie_name = ?"

    db.query(sql,[review,name],(err,result)=>{
        if (err) {
            console.log(err)
        }
    })
})

const PORT = process.env.PORT || 5051;

App.listen(PORT,()=>{
    console.log(`Running at http://localhost:${PORT}`)
})