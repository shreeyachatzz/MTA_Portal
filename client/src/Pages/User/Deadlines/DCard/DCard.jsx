import React, { useState, useEffect } from 'react';
import './DCard.css';
import { useEditContext } from '../../../../EditContext';

const DCard = ({ id, title, description, date, groupOrSubgroup }) => {
  const { userData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteBtnText, setDeleteBtnText] = useState('Delete');

  useEffect(() => {
    setIsAdmin(userData.role === "admin");
  }, [userData]);

  const handleDelete = async () => {
    setDeleteBtnText('Deleting...');
    try {
      const backendRoute =
        groupOrSubgroup === 'group'
          ? `http://localhost:5000/deadline/delGrpDeadlines/${id}`
          : `http://localhost:5000/deadline/delSubGrpDeadlines/${id}`;

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
        setDeleteBtnText('Delete');
        window.location.reload();
      } else {
        console.log("Failed to delete the deadline!");
      }
    } catch (error) {
      console.error("Error deleting deadline:", error);
    }
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleReadMoreClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    const currentDate = new Date();
    const dueDate = new Date(date);
    const sevenDaysPastDueDate = new Date(dueDate.setDate(dueDate.getDate() + 7));

    if (currentDate > sevenDaysPastDueDate) {
      handleDelete();
    }
  }, [date]);

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
        {isAdmin && <div className='del-dead' onClick={handleDelete}>
          {deleteBtnText}
        </div>}
      </div>

      <div className='info-d'>{showFullDescription ? (
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
