import { Link } from "react-router-dom";

const ListItem = ({ note }) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>{note.body.slice(0,45)}...</h3>
                <p><span>{ new Date(note.updated).toLocaleString() }</span></p>
            </div>
        </Link>
    );
};

export default ListItem;
