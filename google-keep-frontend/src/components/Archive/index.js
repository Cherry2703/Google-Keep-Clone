// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import './index.css';

// const Archive = () => {
//   const [archiveNotes, setArchiveNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchArchiveNotes = async () => {
//     try {
//       setLoading(true);
//       const url = 'https://google-keep-backend-server.onrender.com/archieve';
//       const options = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${Cookies.get('jwtToken')}`,
//         },
//       };
//       const response = await fetch(url, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setArchiveNotes(data);
//     } catch (error) {
//       setError('Failed to load trash notes.');
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   const onClickUnArchiveBtn = async (noteId) => {
//     try {
//       const url = 'https://google-keep-backend-server.onrender.com/notes';
//       const options = {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${Cookies.get('jwtToken')}`,
//         },
//         body: JSON.stringify({ noteId, is_archived: 0 }),
//       };
//       await fetch(url, options);
//       fetchArchiveNotes();
//     } catch (error) {
//       console.error('Error recovering note:', error);
//     }
//   };

//   useEffect(() => {
//     fetchArchiveNotes();
//   }, []);

//   if (loading) return <p className="loading-message">Loading Trash Notes...</p>;
//   if (error) return <p className="error-message">{error}</p>;

//   return (
//     <div className="trash-container">
//       {archiveNotes.length === 0 ? (
//         <p className="empty-message">No Trash Notes Available</p>
//       ) : (
//         <div className="notes-flex">
//           {archiveNotes.map((note) => (
//             <div key={note.note_id} className="note-card" style={{ background: note.color }}>
//               <h2 className="note-title">{note.title}</h2>
//               <p className="note-content">{note.content}</p>
//               <div className="note-actions">
//                 <button className="recover-btn" onClick={() => onClickUnArchiveBtn(note.note_id)}>
//                   Un Archive
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Archive;














import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const Archive = () => {
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArchiveNotes = async () => {
    try {
      setLoading(true);
      const url = 'https://google-keep-backend-server.onrender.com/archieve';
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
      setArchiveNotes(data);
    } catch (error) {
      setError('Failed to load archived notes.');
    } finally {
      setLoading(false);
    }
  };

  const onClickUnArchiveBtn = async (noteId) => {
    try {
      const url = 'https://google-keep-backend-server.onrender.com/notes';
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwtToken')}`,
        },
        body: JSON.stringify({ noteId, is_archived: 0 }),
      };
      await fetch(url, options);
      fetchArchiveNotes();
    } catch (error) {
      console.error('Error recovering note:', error);
    }
  };

  useEffect(() => {
    fetchArchiveNotes();
  }, []);

  if (loading) return <p className="loading-message">Loading Archived Notes...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="archive-container">
      {archiveNotes.length === 0 ? (
        <p className="empty-message">No Archived Notes Available</p>
      ) : (
        <div className="archive-notes-container">
          {archiveNotes.map((note) => (
            <div
              key={note.note_id}
              className="archive-note-card"
              style={{ background: note.color }}
            >
              <h2 className="note-title">{note.title}</h2>
              <p className="note-content">{note.content}</p>
              <div className="note-actions">
                <button
                  className="unarchive-btn"
                  onClick={() => onClickUnArchiveBtn(note.note_id)}
                >
                  Unarchive
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;

