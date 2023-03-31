import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import mongoose from "mongoose";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState([]);
  const url = "http://localhost:3001/api/data";

  useEffect(() => {
    
    const getData = async () => {

      //get notes from mongodb
      const { data } = await axios.get(url);
      setNotes(data);

      // console.log(data);
    }

    getData();
  }, [])
  



  const addNote = async (note) => {

    const newId = new mongoose.Types.ObjectId();
    const noteWithId = { ...note, _id: newId };

    setNotes([...notes, noteWithId]);
    console.log(noteWithId);
    //add note to mongodb
    const { title, content } = noteWithId;
    await axios.post(url, {_id: newId,  title, content });
  }


  const deleteNote = async (id) => {
    console.log('note:', notes); // add this line
    setNotes((prevNotes) => prevNotes.filter((item) => item._id !== id));

    //delete note from mongodb
    await axios.delete(`${url}/${id}`);
  }
  


  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={note._id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
