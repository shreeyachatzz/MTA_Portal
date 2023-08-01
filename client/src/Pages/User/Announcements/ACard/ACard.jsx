import React, { useEffect, useState } from 'react';
import './ACard.css';
import { useEditContext } from '../../../../EditContext';

const ACard = ({ id, date, description, groupOrSubgroup }) => {
  const { userData, setUserData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteBtnText, setDeleteBtnText] = useState('Delete');

  useEffect(() => {
    setIsAdmin(userData.role === 'admin');
  }, [userData]);

  const handleDelete = async () => {
    setDeleteBtnText('Deleting...');
    try {
      const backendRoute =
        groupOrSubgroup === 'group'
          ? `http://localhost:5000/announcement/delGrpAnnouncement/${id}`
          : `http://localhost:5000/announcement/delSubGrpAnnouncement/${id}`;

      const token = localStorage.getItem('jwtoken');
      const response = await fetch(backendRoute, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setDeleteBtnText('Delete');
        console.log('Announcement deleted successfully!');
        window.location.reload();
      } else {
        console.log('Failed to delete the announcement!');
        console.log(data);
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className='card-a'>
      <div className='top-an'>
        <div className='grpclass-a'>{date}</div>
        {isAdmin && <div className='del-an' onClick={handleDelete}>{deleteBtnText} </div>}
      </div>
      <div className='info-a'>{description}</div>
    </div>
  );
};

export default ACard;
