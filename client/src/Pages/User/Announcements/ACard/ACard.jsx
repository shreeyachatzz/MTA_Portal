import React from 'react';
import './ACard.css';

const ACard = ({ title, content }) => {
  // Check admin status
  const isAdmin = true;

  return (
    <div className='card-a'>
      <div className='top-an'>
        <div className='grpclass-a'>{title}</div>
        {isAdmin && <div className='del-an'>Delete</div>}
      </div>
      <div className='info-a'>{content}</div>
    </div>
  );
};

export default ACard;
