import React, { useEffect, useState } from 'react';
import './SmCard.css';
import { useNavigate } from 'react-router-dom';
import { useEditContext } from '../../../../EditContext';

const SmCard = ({ id, subject, link, groupOrSubgroup }) => {
  const navigate = useNavigate();
  const { userData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('Delete');

  useEffect(() => {
    setIsAdmin(userData.role === 'admin');
  }, [userData]);

  const fullLink = link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;

  const handleDelete = async (event) => {
    event.stopPropagation(); // This line prevents the onClick property from working when clicked on the delete button
    setDeleteMsg('Deleting ...');
    try {
      const backendRoute =
        groupOrSubgroup === 'group'
          ? `http://localhost:5000/resource/delGrpResource/${id}`
          : `http://localhost:5000/resource/delSubGrpResource/${id}`;

      const response = await fetch(backendRoute, {
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
      navigate('/login');
      console.error(error);
    }
  };

  const deleteButton = isAdmin && (
    <span className="del-dead" onClick={handleDelete}>
      {deleteMsg}
    </span>
  );

  const handleCardClick = () => {
    window.open(fullLink, '_blank');
  };

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
