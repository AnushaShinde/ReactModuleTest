User
import React from 'react';

const GroupList = ({ noteGroups, onSelectGroup }) => {
  return (
    <ul className="group-list">
      {noteGroups.map((group, index) => (
        <li key={index} onClick={() => onSelectGroup(group)}>
          <div className="group-icon" style={{ backgroundColor: group.color }}>
            {group.name.substring(0, 2).toUpperCase()}
          </div>
          <span className="group-name">{group.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default GroupList;


