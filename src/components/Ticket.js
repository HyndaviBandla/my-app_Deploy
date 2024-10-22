import React from 'react';

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket">
      <h4>{ticket.title}</h4>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
    </div>
  );
};

export default Ticket;
