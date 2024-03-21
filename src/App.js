import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './sidebar';
import Main from './main';
import GroupPage from './Grouppage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [noteGroups, setNoteGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState({});

  // Load note groups and notes from local storage on initial render
  useEffect(() => {
    const storedNoteGroups = JSON.parse(localStorage.getItem('noteGroups')) || [];
    setNoteGroups(storedNoteGroups);

    const storedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    setNotes(storedNotes);
  }, []);

  // Save note groups and notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('noteGroups', JSON.stringify(noteGroups));
  }, [noteGroups]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Function to handle adding a new note
  const handleSaveNote = (note) => {
    const groupId = note.groupId;
    const updatedNotes = { ...notes };
    if (!updatedNotes[groupId]) {
      updatedNotes[groupId] = [];
    }
    updatedNotes[groupId].push(note);
    setNotes(updatedNotes);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar
          noteGroups={noteGroups}
          addNoteGroup={(groupName, groupColor) => {
            const newGroup = {
              id: noteGroups.length + 1,
              name: groupName,
              color: groupColor,
            };
            setNoteGroups([...noteGroups, newGroup]);
          }}
          onSelectGroup={(group) => setSelectedGroup(group)}
        />
        <Routes>
          <Route
            path="/"
            element={<Main selectedGroup={selectedGroup} onSaveNote={handleSaveNote} />}
          />
          <Route
            path="/group/:groupId"
            element={<GroupPage group={selectedGroup} onSaveNote={handleSaveNote} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
