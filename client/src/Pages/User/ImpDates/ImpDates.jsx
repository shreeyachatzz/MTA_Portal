import React, { useState, useEffect } from 'react';
import './ImpDates.css';
import SideNav from '../../../Components/Navbar/Navbar';
import ImpCard from './ImpCard/ImpCard';
import { useNavigate } from 'react-router-dom';

const ImpDates = () => {
  const [examDates, setExamDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamDates = async () => {
      try {
        const response = await fetch('https://mta-backend.vercel.app/exam/viewMyExamDates', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch exam dates');
        }

        const data = await response.json();
        setExamDates(data.exams);
      } catch (error) {
        // console.error('Error fetching exam dates:', error);
        navigate('/landing');
      } finally {
        setLoading(false);
      }
    };

    fetchExamDates();
  }, []);

  const filteredExamDates = examDates.filter(item => !item.class || item.class === item.selectedButton);

  filteredExamDates.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));

  return (
    <div className={`fullmain ${examDates.length < 10 ? 'fill' : ''}`}>
      <SideNav heading='IMPORTANT DATES' />

      <div className='containerr-d'>
        <div className='mobHead'>IMPORTANT DATES</div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='cards'>
            <div className='card-imp1'>
              <div className='subj1'>SUBJECT</div>
              <div className='dtogether1'>
                <div className='date1'>DATE/TIME</div>
              </div>
              <div className='type1'>
                TYPE<p className='type-space'>/VENUE</p>
              </div>
              <div className='venue1'>VENUE</div>
            </div>
            {filteredExamDates.length === 0 ? (
              <div className='nodat anndat'>No Data Available</div>
            ) : (
              filteredExamDates.map((item) => (
                <ImpCard
                  key={item._id}
                  id={item._id}
                  subject={item.title}
                  date={item.date}
                  time={item.time}
                  venue={item.venue}
                  type={item.type}
                  groupOrSubgroup={item.group || item.subgroup}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpDates;
