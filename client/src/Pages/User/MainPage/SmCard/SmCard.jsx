import React, { useState } from 'react';
import './SmCard.css';
import { useNavigate } from 'react-router-dom';

const SmCard = ({ id, subject, link }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('Delete');

  const fullLink = link.startsWith('http://') || link.startsWith('https://')
    ? link
    : `http://${link}`;

  const handleDelete = async () => {
    setDeleteMsg('Deleting ...');
    try {
      const response = await fetch(`http://localhost:5000/resource/delResource/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        },
      });

      const data = await response.json();
      if(response.status ===200){
        setDeleteMsg('Delete');
        console.log(data);
        window.location.reload();
      }
      else {
        setDeleteMsg('Delete');
        throw new Error('Failed to delete resource');
        console.log(data);
      }
    } catch (error) {
      // navigate('/login');
      console.error(error);
    }
  };

  return (
    <div className='card-m'>
        <a href={fullLink} target="_blank" rel="noopener noreferrer">
        {subject}
        </a>
        {!isAdmin && (
          <span className="del-dead" onClick={handleDelete}>
            {deleteMsg}
          </span>
        )}
      </div>
  );
};

export default SmCard;
