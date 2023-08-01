import React, { useState, useEffect } from 'react';
import './DCard.css';
import { useEditContext } from '../../../../EditContext';

const DCard = ({ id, title, description, date, groupOrSubgroup }) => {
  // Check Admin Status
  const { userData, setUserData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteBtnText,setDeleteBtnText] = useState('Delete');

  useEffect(() => {
    setIsAdmin(userData.role === "admin");
  }, []);

  const handleDelete = async () => {
    setDeleteBtnText('Deleting...')
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

      const data = await response.json();

      if (response.status === 200) {
        setDeleteBtnText('Delete');
        // window.alert("Deadline deleted, Plz refresh the page!");
        console.log("Deadline deleted successfully!");
        window.location.reload();
      } else {
        console.log("Failed to delete the deadline!");
        console.log(data);
      }
    } catch (error) {
      console.error("Error deleting deadline:", error);
    }
  };

  return (
    <div className='card-d'>
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

      <div className='info-d'>{description}</div>
    </div>
  );
};

export default DCard;
