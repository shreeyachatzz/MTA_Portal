import React, { useState } from 'react';
import './ImpDates.css';
import SideNav from '../../../Components/Navbar/Navbar';
import ImpCard from './ImpCard/ImpCard';

const ImpDates = (props) => {
  const [selectedButton, setSelectedButton] = useState('');

  const dataArray = [
    { subject: 'Network Programming', date: '15/06/03', time: '12.30pm', venue:'LT101',type:'SESS', class: 'co16'},
    { subject: 'Software Engineering', date: '15/06/13', time: '12.30pm', venue:'-' , type:'SESS',class: 'co16-20'},
    { subject: 'Machine Learning', date: '15/06/23', time: '12.30pm', venue:'LT101' ,type:'SESS', class: 'co16'},
    { subject: 'ML Lab', date: '15/06/33', time: '12.30pm', venue:'LT101',type:'EST', class: 'co16-20' },
    { subject: 'SE Lab', date: '15/06/43', time: '12.30pm', venue:'LT101', type:'MST', class: 'co16-20' },
    { subject: 'EDS', date: '15/06/53', time: '12.30pm', venue:'LT101' ,type:'EST',class: 'co16'}, 
    { subject: 'EDS', date: '15/06/53', time: '12.30pm', venue:'LT101' ,type:'EST', class: 'co16-20'},    
    // Add more objects as needed
  ];
  
  const shouldSetHeight = dataArray.length < 10;

  const sortedDataArray = [...dataArray].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
    return Date.UTC(yearA, monthA - 1, dayA) - Date.UTC(yearB, monthB - 1, dayB);
  });

  const handlegrp = () => {
    setSelectedButton((prevSelected) => (prevSelected === 'co16' ? '' : 'co16'));
  };

  const filteredDataArray = sortedDataArray.filter((item) => {
    return selectedButton === '' || item.class === selectedButton;
  });

  return (
    <div className={`fullmain ${shouldSetHeight ? 'fill' : ''}`}>
      <SideNav heading='IMPORTANT DATES' />

      <div className='containerr-d'>
        <div className='mobHead'>IMPORTANT DATES</div>
        <div className={`butf harshlove ${selectedButton === 'co16' ? 'active' : ''}`} onClick={handlegrp}>
          CO16
        </div>
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
          {filteredDataArray.map((item, index) => (
            <ImpCard
              key={index}
              subject={item.subject}
              date={item.date}
              time={item.time}
              venue={item.venue}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpDates;