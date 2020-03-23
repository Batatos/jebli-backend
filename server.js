const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const mongoos = require('mongoose');
const dotvenv = require('dotenv');
const port = process.env.PORT || 3000;

//Import Auth route
const authRoute = require('./routes/auth');
const storesRoute = require('./routes/stores');
const testRoute = require('./routes/posts');


dotvenv.config();

//mongoDB
const dbURL = process.env.MONGODB_CONNECT;
mongoos.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => console.log('mongoDB Connected!'))
    .catch(err => {
    console.log('DB Connection Error: '+err.message);
    });

//Middleware
app.use(cors());
app.use(express.json());

app.use('/api',authRoute);
app.use('/api',storesRoute);
app.use('/api', testRoute);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w3e4r!',
    database: 'jebli'
});
 

app.get('/', (req, res) => {
    res.send({ message: 'Hello friend' });
})

app.get('/stores', (req, res) => {
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

app.listen(port, () => {
    console.log("Server is up and running on port: "+ port);
});