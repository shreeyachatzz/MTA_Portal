import React, { useState, useEffect } from 'react';
import './ImpDates.css';
import SideNav from '../../../Components/Navbar/Navbar';
import ImpCard from './ImpCard/ImpCard';

const ImpDates = (props) => {
  const [selectedButton, setSelectedButton] = useState('');
  const [examDates, setExamDates] = useState([]);

  const shouldSetHeight = examDates.length < 10;

  useEffect(() => {
    // Fetch exam dates from the backend
    const fetchExamDates = async () => {
      try {
        const response = await fetch('http://localhost:5000/exam/viewMyExamDates', {
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
        console.error(error);
        // Handle error if needed
      }
    };

    fetchExamDates();
  }, []);

  const filteredExamDates = selectedButton === ''
    ? examDates
    : examDates.filter(item => item.class === selectedButton);

  // Sort the filtered exam dates by date and time
  filteredExamDates.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));

  return (
    <div className={`fullmain ${shouldSetHeight ? 'fill' : ''}`}>
      <SideNav heading='IMPORTANT DATES' />

      <div className='containerr-d'>
        <div className='mobHead'>IMPORTANT DATES</div>
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
          {filteredExamDates.map((item, index) => (
            <ImpCard
              key={index}
              id={item._id}
              subject={item.title}
              date={item.date}
              time={item.time}
              venue={item.venue}
              type={item.type}
              groupOrSubgroup={item.group || item.subgroup}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpDates;
