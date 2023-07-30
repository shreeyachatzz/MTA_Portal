import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { PiBooksDuotone } from 'react-icons/pi';
import { TiThMenuOutline } from 'react-icons/ti';
import { TfiAnnouncement } from 'react-icons/tfi';
import { LiaStopwatchSolid, LiaCalendarSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

const SideNav = (props) => {
  const [showSidee, setShowSidee] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidee = () => {
    if (windowWidth < 1038) {
      setShowSidee(!showSidee);
    }
  };

  return (
    <div className='whole'>
      <div className={`sidee ${showSidee ? 'show-sidee' : ''}`}>
        <div className='sidenav'>
          <div className='dash'>DASHBOARD</div>
          <p className='welc'>Welcome,</p>
          <p className='name'>Lakshaya Aggarwal</p>
          <p className='mail'>laggarwal1_be21@thapar.edu</p>

          <div className='links'>

            <Link to="/study">
              <div className='link'>
                <PiBooksDuotone className='logo' />
                <a href='#section'>Study Material</a>
              </div>
            </Link>

            <Link to="/announcements">
              <div className='link'>
                <TfiAnnouncement className='logo' />
                <a href='#section'>Announcements</a>
              </div>
            </Link>

            <Link to="/deadline">
              <div className='link'>
                <LiaStopwatchSolid className='logo' />
                <a href='#section'>Deadlines</a>
              </div>
            </Link>

            <Link to="/impdates">
              <div className='link'>
                <LiaCalendarSolid className='logo' />
                <a href='#section'>Important Dates</a>
              </div>
            </Link>

          </div>

          <div className='foot'>
            LSH Team
          </div>
        </div>
      </div>

      <div className='horHead' onClick={toggleSidee}>
        <div className='ham'>
          <TiThMenuOutline />
          <p>Menu</p>
        </div>
      </div>

      <div className='pcHead'>
        <p>HEADING</p>
      </div>
    </div>
  );
};

export default SideNav;
