const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task :  {
        type : String
    },
    completed : {
        type : Boolean , default : false
    }
})

module.exports = mongoose.model('Todomodel' , TodoSchema);