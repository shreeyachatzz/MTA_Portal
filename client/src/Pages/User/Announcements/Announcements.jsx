import React, { useEffect, useState } from 'react';
import './Announcements.css';
import SideNav from '../../../Components/Navbar/Navbar';
import ACard from './ACard/ACard';

const Announcements = (props) => {
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState('');

  const token = localStorage.getItem('jwtoken');

  const getUserInfo = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await fetch('http://localhost:5000/user/getUserData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (res.status === 200) {
        const data = await res.json();
        setUserData(data);
      } else {
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
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
        setAllAnnouncements(data.announcements);
        setIsLoading(false); // Set loading status to false after data is fetched
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Set loading status to false on error
      }
    };

    // Fetch all announcements
    fetchAllAnnouncements();
  }, []);

  const handleButtonClick = (category) => {
    setSelectedButton(prevState => prevState === category ? '' : category);
  };

  const filteredAnnouncements = allAnnouncements.filter(item => {
    if (selectedButton === 'COE16') {
      return item.subgroup === userData.subgroup;
    } else if (selectedButton === 'COE15-22') {
      return item.group === userData.group;
    }
    return true; // No filtering for other cases
  });

  const shouldSetHeight = filteredAnnouncements.length < 4;

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
        ) : (
          filteredAnnouncements.reverse().map((item, index) => (
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
