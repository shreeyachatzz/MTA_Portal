import React, { useState } from 'react';
import './Deadline.css';
import SideNav from '../../../Components/Navbar/Navbar';
import DCard from './DCard/DCard';
import Dropdown from './Dropdown/Dropdown';

const Deadline = () => {
  const dataArray = [
    { title: 'Card 1', content: 'Content 1', subject: 'DSA', date: '15/09/2003' },
    { title: 'Card 2', content: 'Content 2', subject: 'CN', date: '15/06/2013' },
    { title: 'Card 3', content: 'Content 3', subject: 'DAA', date: '15/06/2023' },
    { title: 'Card 1', content: 'Content 1', subject: 'AI', date: '15/07/2003' },
    { title: 'Card 2', content: 'Content 2', subject: 'CN', date: '15/08/2003' },
    { title: 'Card 3', content: 'Content 3', subject: 'OS', date: '15/09/2003' },
    { title: 'Card 1', content: 'Content 1', subject: 'CN', date: '15/10/2003' },
    { title: 'Card 2', content: 'Content 2', subject: 'OS', date: '15/11/2003' },
    { title: 'Card 3', content: 'Content 3', subject: 'DAA', date: '15/12/2003' },
    // Add more objects as needed
  ];

  const dropdownItems = ['OS', 'DSA', 'DAA', 'CN', 'AI'];

  const shouldSetHeight = dataArray.length < 4;
  const noEl = dataArray.length === 0;

  const [selectedSubject, setSelectedSubject] = useState(null);

  // Filter the dataArray based on the selected subject in the dropdown
  const filteredDataArray = selectedSubject
    ? dataArray.filter(item => item.subject === selectedSubject)
    : dataArray;

  const handleSubjectChange = (selectedSubject) => {
    setSelectedSubject(selectedSubject);
  };

  // Convert the date strings to Date objects for proper sorting
  const sortedDataArray = [...filteredDataArray].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
    return Date.UTC(yearA, monthA - 1, dayA) - Date.UTC(yearB, monthB - 1, dayB);
  });

  return (
    <div className={`fullmain ${shouldSetHeight ? 'fill' : ''}`}>
      <SideNav heading='DEADLINES' />
      <div className="containerr-dd">
        <div className='mobHead'>
          DEADLINES
        </div>

        <div className='deadBard'>
          <div className='filter'>
            FILTER BY <Dropdown items={[...dropdownItems, 'All Subjects']} onChange={handleSubjectChange} selectedSubject={selectedSubject} />
          </div>
          <div className='fend'>
            <div className='butf'>
              COE16
            </div>
            <div className='butf'>
              COE15-22
            </div>
          </div>
        </div>
        <div className={`msg ${noEl ? 'show' : ''}`}>
          No Data Available
        </div>
        {sortedDataArray.map((item, index) => (
          <DCard
            key={index}
            title={item.title}
            content={item.content}
            subject={item.subject}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Deadline;
