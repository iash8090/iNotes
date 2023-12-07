import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../left-arrow.svg";
import { ReactComponent as TrashCan } from "../trash.svg";

const NotePage = ({ match }) => {
    const { id } = useParams();
    let [note, setNote] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getNote();
        // eslint-disable-next-line
    }, [id]);

    let getNote = async () => {
        if (id === 'new') return

        let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}`); //created proxy in package.json
        let data = await response.json();
        setNote(data);
    };

    let createNote = async () => {
        await fetch('http://127.0.0.1:8000/api/notes/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note) 
        } )
        navigate("/");
    }

    let updateNote = async () => {
        await fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
        navigate("/");
    };

    let deleteNote = async () => {
        await fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigate("/");
    };

    let handleSubmit = () => {
        if (id !== 'new' && note.body === '' ){
            deleteNote()
        }
        else if ( id !== 'new' ){
            updateNote()
        }
        else if (id === 'new' && note.body !== null ){
            createNote()
        }
        // navigate("/");
    };

    return (
        <div className="note">
            <div className="note-header">
                <div className="col-6">
                    <h3>
                        <LeftArrow onClick={handleSubmit} />
                    </h3>
                </div>
                <div className="col-6">
                    {id === "new" ? (
                        <button onClick={createNote}> Done </button>
                    ) : (
                        <h3>
                            <TrashCan onClick={deleteNote} />
                        </h3>
                    )}
                </div>
            </div>
            <textarea
                onChange={(e) => {
                    setNote({ ...note, 'body': e.target.value });
                }}
                value={note?.body}
            ></textarea>
            {/* <div className="">
                <button className="submit-boutton" style={{ float: "right", margin: "1px" }}>
                    Done
                </button>
            </div> */}
        </div>
    );
};

export default NotePage;
