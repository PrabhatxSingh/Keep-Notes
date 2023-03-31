const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(bodyParser.json());


//connect to mongodb
mongoose.connect(process.env.MONGOURL + "/keepsDB");

//mongodb schema
const noteSchema = new mongoose.Schema({
    _id: String,
    title: String,
    content: String 
})


//mongodb model or collection
const Note = new mongoose.model("Note", noteSchema);

//route for getting and updating data to mongodb
app.get("/api/data", async (req, res) => {
    const data = await Note.find();
    res.json(data);
})


//for updating data into mongodb
app.post("/api/data", async (req, res) => {
    const newNote = new Note({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content
    })
    await newNote.save();
})


//delete from mongodb
app.delete("/api/data/:id", async (req, res) => {
    const { id } = req.params;
    try {await Note.findByIdAndDelete(id);} catch(err){
        console.log(err);
    }
})


app.get("/", (req, res) => {
    res.send("<h1>Server Active!!</h1>")
})


//starts server on port 3001
app.listen(process.env.PORT || 3001 , () => {
    console.log("Server started!!");
})