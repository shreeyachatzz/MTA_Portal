import React, { useEffect, useState } from 'react';
import './SmCard.css';
import { useNavigate } from 'react-router-dom';
import { useEditContext } from '../../../../EditContext';

const SmCard = ({ id, subject, link, groupOrSubgroup }) => {
  const navigate = useNavigate();
  const { userData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // New state to track deletion process

  useEffect(() => {
    setIsAdmin(userData.role === 'admin');
  }, [userData]);

  const fullLink = link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;

  const handleDelete = async (event) => {
    event.stopPropagation();

    const confirmed = window.confirm('Are you sure you want to delete this resource?');

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true); // Start deletion process

      const backendRoute =
        groupOrSubgroup === 'group'
          ? `https://mta-backend.vercel.app/resource/delGrpResource/${id}`
          : `https://mta-backend.vercel.app/resource/delSubGrpResource/${id}`;

      const token = localStorage.getItem('jwtoken');

      const response = await fetch(backendRoute, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setIsDeleted(true); // Update state to hide the card
      } else {
        throw new Error('Failed to delete resource');
      }
    } catch (error) {
      // Handle error
    } finally {
      setIsDeleting(false); // End deletion process
    }
  };

  const deleteButton = isAdmin && (
    <span className="del-dead" onClick={handleDelete}>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </span>
  );

  const handleCardClick = () => {
    window.open(fullLink, '_blank');
  };

  if (isDeleted) {
    return null; // Return null if the card is deleted
  }

  return (
    <div className='card-m' onClick={handleCardClick}>
      <div className='card-content'>
        <a href={fullLink} target="_blank" rel="noopener noreferrer" className='whole'>
          {subject}
        </a>
      </div>
      {deleteButton}
    </div>
  );
};

export default SmCard;
