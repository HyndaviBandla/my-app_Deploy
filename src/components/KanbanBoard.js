import React, { useState, useEffect } from 'react';
import Card from './Card'; // Assuming you have the Card component
import Header from './Header'; // Header component with Display dropdown
import './KanbanBoard.css'; // Import KanbanBoard CSS for general styling
import noPriorityIcon from '../assets/No-priority.svg';
import urgentIcon from '../assets/SVG - UrgentPrioritycolour.svg';
import highPriorityIcon from '../assets/Img-HighPriority.svg';
import mediumPriorityIcon from '../assets/Img-MediumPriority.svg';
import lowPriorityIcon from '../assets/Img-LowPriority.svg';
import backlogIcon from '../assets/Backlog.svg';
import todoIcon from '../assets/To-do.svg';
import inProgressIcon from '../assets/In-Progress.svg';
import doneIcon from '../assets/Done.svg';
import cancelledIcon from '../assets/Cancelled.svg';
import placeholderProfile from '../assets/profile.jpg'; // Placeholder profile image

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping
  const [sorting, setSorting] = useState('priority'); // Default sorting
  const [groupedTickets, setGroupedTickets] = useState({});

  const priorityLabels = {
    '0': { label: 'No priority', icon: noPriorityIcon },
    '1': { label: 'Low', icon: lowPriorityIcon },
    '2': { label: 'Medium', icon: mediumPriorityIcon },
    '3': { label: 'High', icon: highPriorityIcon },
    '4': { label: 'Urgent', icon: urgentIcon },
  };

  const statusLabels = {
    'Backlog': { icon: backlogIcon },
    'Todo': { icon: todoIcon },
    'In Progress': { icon: inProgressIcon },
    'Done': { icon: doneIcon },
    'Cancelled': { icon: cancelledIcon },
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Group tickets based on the selected grouping criteria
  useEffect(() => {
    const groupTickets = () => {
      if (tickets.length) {
        const grouped = groupBy(tickets, grouping);
        setGroupedTickets(grouped);
      } else {
        setGroupedTickets({});
      }
    };
    groupTickets();
  }, [grouping, tickets]);

  // Function to group tickets based on the selected key (status, user, priority)
  const groupBy = (items, key) => {
    return items.reduce((acc, item) => {
      const groupKey = key === 'priority'
        ? priorityLabels[item[key]]?.label || 'No priority'
        : key === 'user'
        ? users.find(user => user.id === item.userId)?.name || 'Unknown User'
        : item[key] || 'Other';
        
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    }, {});
  };

// Function to generate initials for the avatar
const generateInitials = (name) => {
  const nameParts = name.split(' ');
  const initials = nameParts.length > 1 ?
    `${nameParts[0][0]}${nameParts[1][0]}` :
    `${nameParts[0][0]}${nameParts[0][1]}`;
  return initials.toUpperCase();
};

return (
  <div className="kanban-board">
    {/* Header with "Display" dropdown at the top */}
    <Header setGrouping={setGrouping} setSorting={setSorting} />

    {/* Render grouped tickets */}
    <div className="kanban-columns">
      {Object.keys(groupedTickets).map((groupKey) => {
        const ticketCount = groupedTickets[groupKey].length;
        const priority = Object.values(priorityLabels).find(p => p.label === groupKey);
        const status = Object.keys(statusLabels).includes(groupKey) ? statusLabels[groupKey] : null;
        const user = users.find(u => u.name === groupKey);

        return (
          <div key={groupKey} className="kanban-column">
            <div className="header-container">
              {grouping === 'priority' && (
                <>
                  <img src={priority?.icon} alt={`${groupKey} icon`} className="priority-icon" />
                  <h3 className="priority-label">{groupKey}</h3>
                </>
              )}

              {grouping === 'user' && user && (
                <>
                  <div
                    className="initials-avatar"
                    style={{ backgroundColor: '#2196F3', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}
                  >
                    {generateInitials(user.name)}
                  </div>
                  <h3 className="user-name">{groupKey}</h3>
                </>
              )}

              {grouping === 'status' && (
                <>
                  <img src={status?.icon} alt={`${groupKey} icon`} className="status-icon" />
                  <h3 className="status-label">{groupKey}</h3>
                </>
              )}

              <span className="ticket-count">{ticketCount}</span>
            </div>

            <div className="card-group">
              {groupedTickets[groupKey]
                .sort((a, b) =>
                  sorting === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title)
                )
                .map((ticket) => (
                  <Card key={ticket.id} ticket={ticket} user={users.find(user => user.id === ticket.userId)} />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

};

export default KanbanBoard;
