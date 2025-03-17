const express = require('express');
const Todomodel = require('../models/Todomodel');
const router = express.Router();

// create task 

router.post('/' , async(req , res)=>{
    const {task , completed} = req.body;
    try{
        const newTask = new Todomodel({task , completed});
        await newTask.save();

        res.json({message : "Task created"  , task: newTask});
    }catch(err){
        res.status(400).json({message : "Create error" , err});
    }
})



// fetch all task

router.get('/' , async (req,res)=>{
    const newTask = await Todomodel.find();
    res.json(newTask);
})



// delete task

router.delete('/:id' , async (req , res)=>{
    const removeTask = await Todomodel.findByIdAndDelete( req.params.id );
    res.send(removeTask);
})



// update task;

router.put('/:id' , async (req,res)=>{
    const {task , completed} = req.body;
    try{

        const updateTask = await Todomodel.findByIdAndUpdate( req.params.id , req.body , {new : true} )

        res.json({message : 'Task updated'});
    }catch(err){
        res.json({message : "Update Error" , err});
    }
})

router.patch('/:id' , async (req,res)=>{
    const task = await Todomodel.findById(req.params.id);
  

        task.completed = !task.completed;
    

    await task.save();
    res.json({message :" Task status updates" , task})
})

module.exports = router