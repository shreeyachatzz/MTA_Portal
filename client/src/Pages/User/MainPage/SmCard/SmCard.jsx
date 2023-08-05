import React, { useEffect, useState } from 'react';
import './SmCard.css';
import { useNavigate } from 'react-router-dom';
import { useEditContext } from '../../../../EditContext';

const SmCard = ({ id, subject, link }) => {
  const navigate = useNavigate();
  const { userData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('Delete');

  useEffect(() => {
    setIsAdmin(userData.role === 'admin');
  }, [userData]);

  const fullLink = link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;

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

      if (response.status === 200) {
        setDeleteMsg('Delete');
        window.location.reload();
      } else {
        setDeleteMsg('Delete');
        throw new Error('Failed to delete resource');
      }
    } catch (error) {
      // navigate('/login');
      console.error(error);
    }
  };

  // Define the delete button conditionally
  const deleteButton = isAdmin && (
    <span className="del-dead" onClick={handleDelete}>
      {deleteMsg}
    </span>
  );

  return (
    <div className='card-m'>
      <a href={fullLink} target="_blank" rel="noopener noreferrer" className='whole'>
        {subject}
      </a>
      {deleteButton}
    </div>
  );
};

export default SmCard;
