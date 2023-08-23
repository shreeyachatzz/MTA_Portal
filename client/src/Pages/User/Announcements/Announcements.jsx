import React, { useEffect, useState } from 'react';
import './Announcements.css';
import SideNav from '../../../Components/Navbar/Navbar';
import ACard from './ACard/ACard';
import { useNavigate } from 'react-router-dom';
import { useEditContext } from '../../../EditContext';

const Announcements = () => {
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useEditContext();

  const token = localStorage.getItem('jwtoken');

  useEffect(() => {
    const fetchAllAnnouncements = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://mta-backend.vercel.app/announcement/getAllAnnouncements', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('An error occurred while fetching announcements');
        }

        const data = await response.json();
        setAllAnnouncements(data.announcements);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchAllAnnouncements();
  }, [token]);

  const handleButtonClick = (category) => {
    setSelectedButton(prevState => prevState === category ? '' : category);
  };

  const filteredAnnouncements = allAnnouncements.filter(item => {
    if (selectedButton === 'COE16') {
      return item.subgroup === userData.subgroup;
    } else if (selectedButton === 'COE15-22') {
      return item.group === userData.group;
    }
    return true;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  const reversedAnnouncements = [...filteredAnnouncements].reverse();
  const shouldSetHeight = reversedAnnouncements.length < 4;

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
          <div>Loading...</div>
        ) : reversedAnnouncements.length === 0 ? (
          <div className='nodat anndat'>No Data Available</div>
        ) : (
          reversedAnnouncements.map((item) => (
            <ACard
              key={item._id}
              id={item._id}
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
