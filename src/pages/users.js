import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';

const baseURL = "https://dev.codeleap.co.uk/careers/";

export default function Users() {
    const [data, setData] = useState([]);

    const [notes, setNotes] = useState([]);
    const [noteEditing, setNoteEditing] = useState("");
    
    const addNote = (event) => {
        e.preventDefault();
        const newNote = {
            id: Math.random().toString(36).substr(2, 9),
            text: event.target.note.value,
            //name: event.target.username.value,
        };
        setNotes([...notes, newNote]);  //update notes variable
        event.target.note.value = "";       //reset input after sent
        //event.target.username.value = "";
    };

    const deleteNote = (idToDelete) => {
        const filteredNotes = notes.filter((note) => note.id !== idToDelete);
        setNotes(filteredNotes);
    };

    // SUBMIT VALUES FROM INPUTS
    const submitEdits = (event, idToEdit) => {
        event.preventDefault();

        const updatedNotes = notes.map((note) => {
            if (note.id === idToEdit) {
                return {
                    id: note.id,
                    text: event.target.note.value,
                    //name: event.target.username.value,
                };
            } else {
                return note;
            }
        });
        setNotes(updatedNotes);
        setNoteEditing("");
    };

    // GET NOTES FROM LOCALSTORAGE & RETRIEVE API DATA:
    useEffect(() => {
        const json = localStorage.getItem("notes");
        const savedNotes = JSON.parse(json);
        if (savedNotes) {
            setNotes(savedNotes);
        }

        try {
            axios.get(baseURL).then(response => {
                const data = response.data.results;
                setData(data);
    
                console.log(data);
            })
        } catch(err) {
            console.log(err)
        }
    }, []);

    // SAVE POSTS TO LOCALSTORAGE:
    useEffect(() => {
        const json = JSON.stringify(notes);
        localStorage.setItem("notes", json);

        // let username = document.getElementById('username').value;
    }, [notes]);  


    return (
        <>
            <div>
                {/* SUBMIT BUTTON: */}
                <form onSubmit={addNote}>
                    <h3>What's on your mind?</h3>
                    <p>Content</p>
                    <input type="text" name="username" id="username"/>
                    ​<textarea name="note" id="note" rows="4" cols="70"></textarea>
                    <input type="Submit" value="CREATE"/>
                </form>

                {/* EACH NOTE: */}
                {notes.map((note) => (
                    <div key={note.id}>
                        {note.id !== noteEditing ? (
                        <div>{note.text}</div>
                        ) : (
                        <form onSubmit={(e) => submitEdits(e, note.id)}>
                            <textarea name="note" defaultValue={note.text}></textarea>
                            <button type="Submit"> Submit Edits</button>
                        </form>
                        )}
                        <button onClick={() => deleteNote(note.id)}>delete</button>
                        <button onClick={() => setNoteEditing(note.id)}>edit</button>
                    </div>
                ))}
            </div>


            <ul>
                {data.map(d => (
                    <li key={d.id}>
                        {d.username} - <Moment fromNow format="MM/DD/YYYY">{d.created_datetime}</Moment> - {d.content}
                    </li>
                ))} 
            </ul>

            {/* <button onClick={getUsername}>click</button> */}
        </>
    )
    
}