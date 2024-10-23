import React from 'react';
import './Header.css'; // For styling the header
import displayIcon from '../assets/Display.svg'; // Import Display.svg for left icon
import downIcon from '../assets/Down.svg'; // Import Down.svg for right dropdown icon

const Header = ({ setGrouping, setSorting }) => {
  // Function to handle the change in Grouping (e.g., by status, user, etc.)
  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  // Function to handle the change in Sorting (e.g., by priority or title)
  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  return (
    <div className="header-container">
      {/* Display Dropdown */}
      <div className="display-dropdown">
        <button className="dropdown-btn">
          {/* Icon to the left */}
          <img src={displayIcon} alt="Display" className="display-icon" />
          {/* Display Text */}
          Display
          {/* Dropdown arrow to the right */}
          <img src={downIcon} alt="Dropdown Arrow" className="dropdown-icon" />
        </button>
        <div className="dropdown-content">
          {/* Grouping options */}
          <div className="dropdown-item">
            <label>Group by:</label>
            <select onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          {/* Sorting options */}
          <div className="dropdown-item">
            <label>Ordering:</label>
            <select onChange={handleSortingChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
