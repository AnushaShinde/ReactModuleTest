import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Sidebar({ onSelectGroup }) {
  const [showAddGroupPopup, setShowAddGroupPopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [noteGroups, setNoteGroups] = useState([]);

  const popupRef = useRef(null);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('noteGroups'));
    if (storedGroups) {
      setNoteGroups(storedGroups);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('noteGroups', JSON.stringify(noteGroups));
  }, [noteGroups]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowAddGroupPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenPopup = () => {
    setShowAddGroupPopup(true);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleAddGroup = () => {
    if (newGroupName && selectedColor) {
      const newGroup = {
        id: noteGroups.length + 1, // Generate unique ID
        name: newGroupName,
        color: selectedColor,
        initials: newGroupName
          .split(' ')
          .map(word => word.slice(0, 1).toUpperCase())
          .join(''),
      };

      setNoteGroups([...noteGroups, newGroup]);
      setNewGroupName('');
      setSelectedColor('');
      setShowAddGroupPopup(false);
    }
  };

  return (
    <div className="app-sidebar" style={{ maxHeight: 'calc(100vh - 20px)', overflowY: 'auto' }}>
      <div className="app-sidebar-header">
        <h1>Pocket Notes</h1>
        <button className="add-group-button" onClick={handleOpenPopup}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ul className="group-list">
        {noteGroups.map((group, index) => (
          <li key={index}>
            <Link
              to={`/group/${group.id}`}
              className="group-link"
              onClick={() => onSelectGroup(group)}
              style={{ color: 'black', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
              <div className="group-icon" style={{ backgroundColor: group.color, color: 'black', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '8px' }}>
                {group.initials}
              </div>
              <span className="group-name">{group.name}</span>
            </Link>
          </li>
        ))}
        {showAddGroupPopup && (
          <div className="add-group-popup" ref={popupRef}>
            <h2>Create New Group</h2>
            <div className="form-group">
              <label htmlFor="groupName">Group Name:</label>
              <input
                type="text"
                id="groupName"
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Select Color:</label>
              <div className="color-options">
                <div className="color-option" style={{ backgroundColor: '#ff9999' }} onClick={() => handleColorSelection('#ff9999')}></div>
                <div className="color-option" style={{ backgroundColor: '#99ff99' }} onClick={() => handleColorSelection('#99ff99')}></div>
                <div className="color-option" style={{ backgroundColor: '#9999ff' }} onClick={() => handleColorSelection('#9999ff')}></div>
                <div className="color-option" style={{ backgroundColor: '#ffff99' }} onClick={() => handleColorSelection('#ffff99')}></div>
                <div className="color-option" style={{ backgroundColor: '#ffccff' }} onClick={() => handleColorSelection('#ffccff')}></div>
                <div className="color-option" style={{ backgroundColor: '#ccffcc' }} onClick={() => handleColorSelection('#ccffcc')}></div>
              </div>
            </div>
            <button className="create-button" onClick={handleAddGroup}>
              Create
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
