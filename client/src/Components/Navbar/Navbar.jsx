import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { PiBooksDuotone } from 'react-icons/pi';
import { TiThMenuOutline } from 'react-icons/ti';
import { TfiAnnouncement } from 'react-icons/tfi';
import { BsFillPlusSquareFill} from 'react-icons/bs';
import { LiaStopwatchSolid, LiaCalendarSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

const SideNav = (props) => {
  const {heading}=props;

// Check admin status
  const isAdmin=true;

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
          {/* <div className='dash'>DASHBOARD</div> */}
          <div className='person-info'>
            <p className='welc'>Welcome,</p>
            <p className='name'>Lakshaya Aggarwal</p>
            <p className='mail'>laggarwal1_be21@thapar.edu</p>
          </div>

          <div className='links'>
            <Link to="/study">
              <div className='link'>
              <div className='focus'>
                <PiBooksDuotone className='logo' />
                <a href='#section'>Study Material</a>
              </div>                
                {isAdmin && 
                <Link to="/add/study">
                  <BsFillPlusSquareFill className='addLogo'/> 
                </Link>
                }             
              </div>
            </Link>

            <Link to="/announcements">
              <div className='link'>
                <div className='focus'>
                  <TfiAnnouncement className='logo' />
                  <a>Announcements</a>
                </div>
                  
                  &nbsp;
                  {isAdmin && 
                  <Link to="/add/announcements">
                    <BsFillPlusSquareFill className='addLogo'/> 
                  </Link>
                  }
              </div>
            </Link>

            <Link to="/deadline">
              <div className='link'>
              <div className='focus'>
                <LiaStopwatchSolid className='logo' />
                <a>Deadlines</a>
              </div>
                
                {isAdmin && 
                <Link to="/add/deadline">
                  <BsFillPlusSquareFill className='addLogo'/> 
                </Link>
                }
              </div>
            </Link>

            <Link to="/impdates">
              <div className='link'>
              <div className='focus'>
                <LiaCalendarSolid className='logo' />
                <a href='#section'>Important Dates</a>
              </div>
            
                {isAdmin && 
                <Link to="/add/impdates">
                  <BsFillPlusSquareFill className='addLogo'/> 
                </Link>
                }
              </div>
            </Link>

            {/* <Link className={`${isAdmin ? '' : 'showsub'}`} to="/addSub">
              <div className='link-s'>
                <BsFillPlusSquareFill className='logo' />
                <div className='goat'>Add Subjects</div>
              </div>
            </Link> */}

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
      <div className='head'>
        <p>{heading}</p>
      </div>
      </div>
    </div>
  );
};

export default SideNav;
