import React, { useEffect, useState } from 'react';
import './ImpCard.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useEditContext } from '../../../../EditContext';

const ImpCard = ({ id, subject, date, time, venue, type, groupOrSubgroup }) => {
  const { userData, setUserData } = useEditContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // State to track delete operation

  useEffect(() => {
    setIsAdmin(userData.role === 'admin');
  }, []);

  const handleDelete = async () => {
    try {
      setIsDeleting(true); // Start the delete operation

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
        console.log('exam deleted successfully!');
        window.location.reload();
      } else {
        console.log('Failed to delete the exam!');
        console.log(data);
      }
    } catch (error) {
      console.error('Error deleting exam:', error);
    } finally {
      setIsDeleting(false); // Finish the delete operation
    }
  };

  return (
    <>
      <div>
        {isAdmin && (
          <div className='card-imp-d'>
            <div className='card-imp'>
              <div className='sub-box'>
                <div className='subj'>
                  {subject} <i>#{groupOrSubgroup}</i>
                </div>
              </div>
              <div className='dtogether'>
                <div className='date'>{date}</div>
                <div className='time'>{time}</div>
              </div>
              <div className='tven'>
                <div className='type'>{type}</div>
                <div className='venmob'>{venue}</div>
              </div>
              <div className='venue'>{venue}</div>
              {isAdmin && (
                <div className='del-impdate' onClick={handleDelete}>
                  {isDeleting ? '...' : <MdOutlineDeleteForever />}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImpCard;
