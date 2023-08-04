import React, { useState } from 'react';
import './SmCard.css';

const SmCard = ({ id, subject, link }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const fullLink = link.startsWith('http://') || link.startsWith('https://')
    ? link
    : `http://${link}`;

  return (
    <a href={fullLink} target="_blank" rel="noopener noreferrer" className='whole'>
      <div className='card-m'>
        {subject}
        {!isAdmin && (
          <span className="del-dead">
            Delete
          </span>
        )}
      </div>
    </a>
  );
};

export default SmCard;
