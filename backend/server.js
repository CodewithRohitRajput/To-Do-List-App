const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoApp_1')
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log('Server Error' , err);
})

app.use('/task' , require('./routes/todoRoute'))


app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
})

