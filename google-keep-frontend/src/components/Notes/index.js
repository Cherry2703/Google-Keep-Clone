import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";

import "./index.css";

const Notes = ({searchInput,activeTheme}) => {
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [editNotes,setEditNotes] = useState({
    title:'',content:'',color:'',noteId:''
  })


    const filteredNotes = notesList.filter((each)=>each.title.toLowerCase().includes(searchInput.toLowerCase()))

  const fetchNotes = async () => {
    const jwtToken = Cookies.get("jwtToken");
    try {
      const response = await fetch(
        "https://google-keep-clone-5vpu.onrender.com/notes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotesList(data);
      } else {
        setError("Failed to fetch notes");
        console.error("Fetch error:", response.statusText);
      }
    } catch (error) {
      setError("Error fetching notes");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onClickAddBtn = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and Content are required.");
      return;
    }

    const jwtToken = Cookies.get("jwtToken");
    try {
      const response = await fetch(
        "https://google-keep-clone-5vpu.onrender.com/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ title, content, color }),
        }
      );

      if (response.ok) {
        fetchNotes();
        setTitle("");
        setContent("");
        setColor("");
      } else {
        alert("Failed to add note.");
        console.error("Add note error:", response.statusText);
      }
    } catch (error) {
      alert("Error adding note.");
      console.error("Error:", error);
    }
  };

  const onClickDeleteBtn = async (noteId) => {
    try {
      const response = await fetch(
        `https://google-keep-clone-5vpu.onrender.com/notes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwtToken")}`,
          },
          body: JSON.stringify({ noteId, is_deleted: 1 }),
        }
      );

      if (response.ok) {
        fetchNotes();
      } else {
        alert("Failed to delete note.");
        console.error("Delete note error:", response.statusText);
      }
    } catch (error) {
      alert("Error deleting note.");
      console.error("Error:", error);
    }
  };

  const onClickArchiveBtn = async (noteId) => {
    try {
      const response = await fetch(
        `https://google-keep-clone-5vpu.onrender.com/notes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwtToken")}`,
          },
          body: JSON.stringify({ noteId, is_archived: 1 }),
        }
      );

      if (response.ok) {
        fetchNotes();
      } else {
        alert("Failed to archive note.");
        console.error("Archive note error:", response.statusText);
      }
    } catch (error) {
      alert("Error archiving note.");
      console.error("Error:", error);
    }
  };



  const onClickEditBtn = (note) => {
    console.log(note);
    
    setShowEditPopup(true);
    setEditNotes({noteId:note})
  };

  const onClickUpdateBtn = async () => {
    const jwtToken = Cookies.get("jwtToken");
    try {
      const response = await fetch(
        `https://google-keep-clone-5vpu.onrender.com/notes`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            noteId: editNotes.noteId,
            title:editNotes.title,
            content:editNotes.content,
            color:editNotes.color,
          }),
        }
      );

      if (response.ok) {
        fetchNotes();
        setShowEditPopup(false);
      } else {
        alert("Failed to update note.");
        console.error("Update note error:", response.statusText);
      }
    } catch (error) {
      alert("Error updating note.");
      console.error("Error:", error);
    }
  };


  return (
    <div
      className={`content-to-show-container ${
        notesList.length === 0 && !loading ? "no-notes" : ""
      } ` }
    >


{showEditPopup && (
        <div className="edit-popup-overlay">
          <div className="edit-popup">
            <h3>Edit Note</h3>
            <input
              type="text"
              placeholder="Enter Title..."
              className="edit-title-input"
              value={editNotes.title}
              onChange={(e) =>
                setEditNotes((prev) => ({ ...prev, title: e.target.value }))
              }
              

            />
            <textarea
              rows={3}
              placeholder="Enter Description..."
              className="edit-description-input"
              value={editNotes.content}
              onChange={(e) =>
                setEditNotes((prev) => ({ ...prev, content: e.target.value }))
              }
            />
            <div className="color-picker-container">
              <label htmlFor="color-picker">Pick Color:</label>
              <input
                id="color-picker"
                type="color"
                value={editNotes.color}
                onChange={(e) =>
                  setEditNotes((prev) => ({ ...prev, color: e.target.value }))
                }
              />
            </div>
            <button className="update-btn" onClick={onClickUpdateBtn}>
              Update Note
            </button>
            <button
              className="cancel-btn"
              onClick={() => setShowEditPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Title..."
            className="input-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows={1}
            cols={5}
            placeholder="Enter Description..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="description-input"
          />
          <div className="color-picker-container">
              <label htmlFor="color-picker">Pick Color:</label>
              <input
                id="color-picker"
                type="color"
                className="color-picker"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          <div className="color-and-btn">
            <button type="button" className="add-btn" onClick={onClickAddBtn}>
              Add Note
            </button>
          </div>
        </div>


      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : notesList.length > 0 ? (
        <div className={`notes-container ${activeTheme ? 'light' : 'dark'}`} >
          {filteredNotes.map((note) => (
            <div
              key={note.note_id}
              className={`note-card ${activeTheme ? 'light' : 'dark'}`}
              style={{ background: note.color || "inherit", padding: "1rem" }}
            >
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <div className="each-note-btns-cont">
                <button title="Set Reminder">
                  <FaRegBell />
                </button>
                <button
                  title="Archive Note"
                  onClick={() => onClickArchiveBtn(note.note_id)}
                >
                  <IoArchiveOutline />
                </button>
                <button title="Edit Note" onClick={()=>onClickEditBtn(note.note_id)}>
                  <CiEdit />
                </button>
                <button
                  title="Delete Note"
                  onClick={() => onClickDeleteBtn(note.note_id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-notes-to-show-container">No Notes to show</div>
      )}
    </div>
  );
};

export default Notes;