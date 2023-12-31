import React, { useEffect, useState } from 'react';
import './ACard.css';
import { useEditContext } from '../../../../EditContext';
import { useNavigate } from 'react-router-dom';

const ACard = ({ id, date, description, groupOrSubgroup }) => {
  const { userData, setUserData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteBtnText, setDeleteBtnText] = useState('Delete');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(userData.role === 'admin');
  }, [userData]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this card?');
    if (confirmed) {
      setDeleteBtnText('Deleting...');
      try {
        const backendRoute =
          groupOrSubgroup === 'group'
            ? `https://mta-backend.vercel.app/announcement/delGrpAnnouncement/${id}`
            : `https://mta-backend.vercel.app/announcement/delSubGrpAnnouncement/${id}`;

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
          // Handle deletion failure
        }
      } catch (error) {
        navigate('/landing');
      }
    }
  };

  const handleReadMoreClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (isDeleted) {
    return null; // Return null if the card is deleted
  }

  return (
    <div className='card-a'>
      <div className='top-an'>
        <div className='grpclass-a'>{date}</div>
        {isAdmin && (
          <div className='del-an' onClick={handleDelete}>
            {deleteBtnText}
          </div>
        )}
      </div>
      <div className='info-a'>
        {showFullDescription ? (
          <div>
            {description}
            <span className='read-more' onClick={handleReadMoreClick}>Read less...</span>
          </div>
        ) : (
          <div>
            {description.length > 100 ? (
              <div>
                {description.substring(0, 100)}...
                <span className='read-more' onClick={handleReadMoreClick}>Read more...</span>
              </div>
            ) : (
              description
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ACard;
