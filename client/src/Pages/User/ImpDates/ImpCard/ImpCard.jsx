import React, { useEffect, useState } from 'react';
import './ImpCard.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useEditContext } from '../../../../EditContext';

const ImpCard = ({ id, subject, date, time, venue, type, groupOrSubgroup }) => {
  const { userData, setUserData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsAdmin(userData.role === 'admin');
  }, []);

  const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Months are zero-indexed
    const year = dateObj.getFullYear().toString().slice(-2); // Get last two digits of the year

    return `${day}/${month}/${year}`;
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const backendRoute =
        groupOrSubgroup === 'group'
          ? `http://localhost:5000/exam/delGrpExams/${id}`
          : `http://localhost:5000/exam/delSubGrpExams/${id}`;

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
        // console.log('exam deleted successfully!');
        window.location.reload();
      } else {
        // console.log('Failed to delete the exam!');
        // console.log(data);
      }
    } catch (error) {
      // console.error('Error deleting exam:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div>
        
          <div className='card-imp-d'>
            <div className='card-imp'>
              <div className='sub-box'>
                <div className='subj'>
                  {subject} <br/><div className='harshFuckedUp'>{groupOrSubgroup}</div>
                </div>
              </div>
              <div className='dtogether'>
                <div className='date'>{formatDate(date)}</div>
                <div className='time'>{time}</div>
              </div>
              <div className='tven'>
                <div className='type'>&nbsp;&nbsp;&nbsp;&nbsp;{type}</div>
                <div className='venmob'>&nbsp;{venue}</div>
              </div>
              <div className='venue'>{venue}</div>
              {isAdmin && (
                <div className='del-impdate' onClick={handleDelete}>
                  {isDeleting ? '...' : <MdOutlineDeleteForever />}
                </div>
              )}
            </div>
          </div>
      </div>
    </>
  );
};

export default ImpCard;
