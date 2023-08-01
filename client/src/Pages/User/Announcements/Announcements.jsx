import React, { useEffect, useState } from 'react';
import './Announcements.css';
import SideNav from '../../../Components/Navbar/Navbar';
import ACard from './ACard/ACard';
import { useEditContext } from '../../../EditContext';

const Announcements = (props) => {
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status
  const { userData, setUserData } = useEditContext();

  useEffect(() => {
    // Fetch all announcements when the component mounts or when selectedButton changes
    const fetchAllAnnouncements = async () => {
      try {
        setIsLoading(true); // Set loading status to true when fetching data
        const response = await fetch('http://localhost:5000/announcement/getAllAnnouncements', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('An error occurred while fetching announcements');
        }

        const data = await response.json();

        // Filter announcements based on selectedButton (subgroup or group)
        let filteredAnnouncements = [];
        if (selectedButton === 'COE16') {
          filteredAnnouncements = data.announcements.filter(item => item.subgroup === userData.subgroup);
        } else if (selectedButton === 'COE15-22') {
          filteredAnnouncements = data.announcements.filter(item => item.group === userData.group);
        } else {
          filteredAnnouncements = data.announcements;
        }

        setAllAnnouncements(filteredAnnouncements);
        setIsLoading(false); // Set loading status to false after data is fetched
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Set loading status to false on error
      }
    };

    fetchAllAnnouncements();
  }, [selectedButton, userData.subgroup, userData.group]);

  const shouldSetHeight = allAnnouncements.length < 4;

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
            {userData.subgroup}
          </div>
          <div
            className={`butf ${selectedButton === 'COE15-22' ? 'active' : ''}`}
            onClick={() => handleButtonClick('COE15-22')}
          >
            {userData.group}
          </div>
        </div>
        {isLoading ? (
          // Show loading message or spinner while data is being fetched
          <div>Loading...</div>
        ) : (
          // Show announcement cards once data is fetched
          allAnnouncements.map((item, index) => (
            <ACard
              key={index}
              id = {item._id}
              date={item.date} 
              description={item.description}
              groupOrSubgroup={item.group || item.subgroup}
               />
          ))
        )}
      </div>
    </div>
  );
}

export default Announcements;
