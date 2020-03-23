const express = require('express');
const cors = require('cors');
const app = express();
const mongoos = require('mongoose');
const dotvenv = require('dotenv');
const port = process.env.PORT || 3000;

//Import Auth route
const authRoute = require('./routes/auth');
const storesRoute = require('./routes/stores');


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


app.listen(port, () => {
    console.log("Server is up and running on port: "+ port);
});