import React, { useState } from 'react';
import './Announcements.css';
import SideNav from '../../../Components/Navbar/Navbar';
import ACard from './ACard/ACard';

const Announcements = (props) => {
  const dataArray = [
    { title: 'Card 1', content: 'Content 1', category: 'COE16' },
    { title: 'Card 2', content: 'Content 2', category: 'COE15-22' },
    { title: 'Card 3', content: 'Content 3', category: 'COE16' },
    { title: 'Card 4', content: 'Content 4', category: 'COE15-22' },
    // Add more objects as needed
  ];

  const [selectedButton, setSelectedButton] = useState('');

  const shouldSetHeight = dataArray.length < 4;

  // Filter the data based on the selected button
  const filteredData = selectedButton
    ? dataArray.filter(item => item.category === selectedButton)
    : dataArray;

  // Function to handle button clicks
  const handleButtonClick = (category) => {
    setSelectedButton(prevState => prevState === category ? '' : category);
  };

  return (
    <div className={`fullmain ${shouldSetHeight ? 'app' : ''}`}>
      <SideNav heading='ANNOUNCEMENTS' />
      <div className="containerr">
        <div className='mobHead'>
          ANNOUNCEMENTS
        </div>
        <div className='fend'>
          <div
            className={`butf ${selectedButton === 'COE16' ? 'active' : ''}`}
            onClick={() => handleButtonClick('COE16')}
          >
            COE16
          </div>
          <div
            className={`butf ${selectedButton === 'COE15-22' ? 'active' : ''}`}
            onClick={() => handleButtonClick('COE15-22')}
          >
            COE15-22
          </div>
        </div>
        {filteredData.map((item, index) => (
          <ACard key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
}

export default Announcements;
