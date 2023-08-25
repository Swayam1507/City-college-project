const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const fetchuser = require('./middleware/fetchUser');
const app = express();
const cors = require('cors')
dotenv.config();

app.use(cors())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//connection establish with mongoatlas
mongoose.connect(process.env.MONGO_URI,{
//     useNewUrlParser: true,
//    // useCreateIndex: true,
//    // useFindAndModify: false,
//     useUnifiedTopology: true,
}).then(()=>{
    console.log("mongoose connected...");
});
mongoose.connection.on('error', err=>{
    console.log('db connection error: ${err.getmessage}');
});

app.use(express.json());
app.use('/user',require('./routes/users'))

const port=process.env.PORT;

app.listen(port,() => {
    console.log('Server started on port '+port);
});