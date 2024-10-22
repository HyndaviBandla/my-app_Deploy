import React from 'react';
import './Card.css';
import backlogIcon from '../assets/Backlog.svg'; 
import todoIcon from '../assets/To-do.svg';
import inProgressIcon from '../assets/In-Progress.svg';
import doneIcon from '../assets/Done.svg';
import cancelledIcon from '../assets/Cancelled.svg';
import noPriorityIcon from '../assets/No-priority.svg';
import urgentIcon from '../assets/SVG - UrgentPrioritycolour.svg';
import highPriorityIcon from '../assets/Img-HighPriority.svg';
import mediumPriorityIcon from '../assets/Img-MediumPriority.svg';
import lowPriorityIcon from '../assets/Img-LowPriority.svg';

// Map status to icons
const statusIcons = {
  'done': doneIcon,
  'In progress': inProgressIcon,
  'Todo': todoIcon,
  'Backlog': backlogIcon,
  'cancelled': cancelledIcon
};

// Map priority to icons
const priorityIcons = {
  4: urgentIcon,
  3: highPriorityIcon,
  2: mediumPriorityIcon,
  1: lowPriorityIcon,
  0: noPriorityIcon
};

// Function to generate initials for the avatar
const generateInitials = (name) => {
  const nameParts = name.split(' ');
  const initials = nameParts.length > 1 ? 
    `${nameParts[0][0]}${nameParts[1][0]} `: 
    `${nameParts[0][0]}${nameParts[0][1]}`;
  return initials.toUpperCase();
};

const Ticket = ({ ticket, user }) => {
  const initials = generateInitials(user.name); // Assuming user.name holds the name
  const avatarColor = "#2196F3"; // You can customize this or make it dynamic

  return (
    <div className="ticket-card">
     <div className="ticket-header">
  <span className="ticket-id">{ticket.id}</span>
  {user?.avatar ? (
    <img src={user.avatar} alt="User avatar" className="user-avatar" />
  ) : (
    <div className="initials-avatar" style={{ backgroundColor: avatarColor }}>
      {initials}
    </div>
  )}
</div>


      <div className="ticket-body">
        <div className="title-container">
          {/* Status icon to the left of the title */}
          <img
            src={statusIcons[ticket.status]}
            alt={ticket.status}
            className="status-icon-left"
          />
          <h2 className="ticket-title">{ticket.title}</h2>
        </div>

        {/* User avatar or initials */}
        
      </div>

      <div className="ticket-footer">
        <img
          src={priorityIcons[ticket.priority]}
          alt={ticket.priority}
          className="priority-icon"
        />
        <div className="circle-text-box">
          <div className="circle"></div>
          <span className="feature-request">Feature Request</span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;