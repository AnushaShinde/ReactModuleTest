import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const GroupPage = ({ group, onSaveNote }) => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (group) {
      const storedNotes = JSON.parse(localStorage.getItem(`notes_${group.id}`)) || [];
      setNotes(storedNotes);
    }
  }, [group]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-US', options);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSaveNote = () => {
    if (note.trim() !== '') {
      const newNote = {
        id: Date.now(), // Generate a unique ID for each note
        text: note.trim(),
        timestamp: new Date().toISOString(),
      };
      const updatedNotes = [...notes, newNote];
      localStorage.setItem(`notes_${group?.id}`, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      if (onSaveNote && typeof onSaveNote === 'function') {
        onSaveNote({
          groupId: group ? group.id : '',
          text: note.trim(),
          timestamp: new Date().toISOString(),
        });
      }
      setNote('');
    }
  };

  return (
    <div className="group-page">
      <nav className="navbar">
        {group && (
          <>
            <div className="group-icon" style={{ backgroundColor: group.color }}>
            {group.name
                .split(' ')
                .map(word => word.charAt(0).toUpperCase())
                .join('')}{/* Display the first two characters of the group name */}
            </div>
            <h2 className="group-name">{group.name}</h2>
          </>
        )}
      </nav>
      <div className="chat-container">
        {notes.map((note) => (
          <div className="note" key={note.id}> {/* Use the note's ID as the key */}
            <p>{note.text}</p>
            <span className="timestamp">{`${formatDate(note.timestamp)} ${formatTime(note.timestamp)}`}</span>
          </div>
        ))}
      </div>
      <div className="note-input">
        <textarea
          rows="6"
          value={note}
          onChange={handleNoteChange}
          placeholder="Enter your Text here..."
        />
        <button onClick={handleSaveNote} className="send-button">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default GroupPage;
