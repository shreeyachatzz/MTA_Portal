import React, { useState, useEffect } from 'react';
import './DCard.css';
import { useEditContext } from '../../../../EditContext';
import { useNavigate } from 'react-router-dom';

const DCard = ({ id, title, description, date, groupOrSubgroup }) => {
  const { userData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteBtnText, setDeleteBtnText] = useState('Delete');
  const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdmin(userData.role === "admin");
  }, [userData]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this deadline?');
    if (confirmed) {
      setDeleteBtnText('Deleting...');
      try {
        const backendRoute =
          groupOrSubgroup === 'group'
            ? `https://mta-backend.vercel.app/deadline/delGrpDeadlines/${id}`
            : `https://mta-backend.vercel.app/deadline/delSubGrpDeadlines/${id}`;

        const token = localStorage.getItem("jwtoken");
        const response = await fetch(backendRoute, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
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
        // Handle error
      }
    }
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleReadMoreClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (isDeleted) {
    return null; // Return null if the card is deleted
  }

  const currentDate = new Date();
  const isPastDue = new Date(date) < currentDate;

  return (
    <div className={`card-d ${isPastDue ? 'past-due' : ''}`}>
      <div className='deadBarr-d'>
        <div className='p1-d'>
          <div className='sub-d'>
            Subject: {title}
          </div>
          <div className='grpclass-d'>#{groupOrSubgroup}</div>
        </div>
        <div className='date-d'>
          {date}
        </div>
        {isAdmin && (
          <div className='del-dead' onClick={handleDelete}>
            {deleteBtnText}
          </div>
        )}
      </div>
      <div className='info-d'>
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

export default DCard;
