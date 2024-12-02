import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const Trash = ({ activeTheme }) => {
  const [trashNotes, setTrashNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrashNotes = async () => {
    try {
      setLoading(true);
      const url = 'https://google-keep-clone-5vpu.onrender.com/trash';
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwtToken')}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTrashNotes(data);
    } catch (error) {
      setError('Failed to load trash notes.');
    } finally {
      setLoading(false);
    }
  };

  const onClickDeleteNoteTrash = async (noteId) => {
    try {
      const url = 'https://google-keep-clone-5vpu.onrender.com/trash';
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwtToken')}`,
        },
        body: JSON.stringify({ noteId }),
      };
      await fetch(url, options);
      fetchTrashNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const onClickRecoverNote = async (noteId) => {
    try {
      const url = 'https://google-keep-clone-5vpu.onrender.com/notes';
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwtToken')}`,
        },
        body: JSON.stringify({ noteId, is_deleted: 0 }),
      };
      await fetch(url, options);
      fetchTrashNotes();
    } catch (error) {
      console.error('Error recovering note:', error);
    }
  };

  useEffect(() => {
    fetchTrashNotes();
  }, []);

  if (loading) return <p className={`loading-message ${activeTheme ? 'light' : 'dark'}`}>Loading Trash Notes...</p>;
  if (error) return <p className={`error-message ${activeTheme ? 'light' : 'dark'}`}>{error}</p>;

  return (
    <div className={`trash-container ${activeTheme ? 'light-theme' : 'dark-theme'}`}>
      {trashNotes.length === 0 ? (
        <p className={`empty-message ${activeTheme ? 'light' : 'dark'}`}>No Trash Notes Available</p>
      ) : (
        <div className="notes-flex">
          {trashNotes.map((note) => (
            <div key={note.note_id} className={`note-card ${activeTheme ? 'light-note' : 'dark-note'}`} style={{ background: note.color }}>
              <h2 className={`note-title ${activeTheme ? 'light' : 'dark'}`}>{note.title}</h2>
              <p className={`note-content ${activeTheme ? 'light' : 'dark'}`}>{note.content}</p>
              <div className="note-actions">
                <button className={`recover-btn ${activeTheme ? 'light' : 'dark'}`} onClick={() => onClickRecoverNote(note.note_id)}>
                  Recover
                </button>
                <button className={`delete-btn ${activeTheme ? 'light' : 'dark'}`} onClick={() => onClickDeleteNoteTrash(note.note_id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;
