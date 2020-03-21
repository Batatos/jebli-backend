const express = require('express');
const mysql = require('mysql');
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'jebli'
});

const server = express();

server.get('/', (req, res) => {
    res.send({ message: 'Hello friend' });
})

server.get('/stores', (req, res) => {
    console.log("Processing request: GET all stores . . .")
    
    const queryString = 'select * from stores';
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            console.log("Failed fetching stores: " + err);
            return;
        }
        console.log("Fields are fetched.");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(rows);
    })
    
})

server.listen(port);