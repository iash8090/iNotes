import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import AddNote from './AddNote'

const NotesListPage = () => {
    let [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    },[]);

    let getNotes = async () => {
        let response = await fetch("http://127.0.0.1:8000/api/notes/"); //created proxy in package.json
        let data = await response.json();
        setNotes(data);
    };

    return (
        <>
            <div className="notes">
                <div className="notes-header">
                    <h2 className="notes-title">Your Notes</h2>
                    <h2 className="notes-count"> {notes.length} </h2>
                </div>
                <div className="notes_list">
                    {notes.map((note, index) => (
                        <ListItem key={index} note={note} />
                    ))}
                </div>
                <AddNote />
            </div>
        </>
    );
};

export default NotesListPage;
