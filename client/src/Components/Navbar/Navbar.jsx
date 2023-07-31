import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { PiBooksDuotone } from 'react-icons/pi';
import { TiThMenuOutline } from 'react-icons/ti';
import { TfiAnnouncement } from 'react-icons/tfi';
import { BsFillPlusSquareFill} from 'react-icons/bs';
import { LiaStopwatchSolid, LiaCalendarSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { useEditContext } from '../../EditContext';


const SideNav = (props) => {
  const navigate = useNavigate();
  const {heading}=props;

// Check admin status
  const isAdmin=true;
  const { makeEdit, setMakeEdit } = useEditContext();
  

  const [showSidee, setShowSidee] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleEditClick = () => {
    setMakeEdit(true); // Set the makeEdit state using the context function
  };

  const handleExitClick = () => {
    setMakeEdit(false); // Set the makeEdit state using the context function
  };

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

  const [userData, setUserData] = useState('');
  const token = localStorage.getItem("jwtoken");

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
        // navigate('/login');
        console.log("failed");
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  };

  useEffect(()=>{
    getUserInfo();
  },[])

  return (
    <div className='whole'>
      <div className={`sidee ${showSidee ? 'show-sidee' : ''}`}>
        <div className='sidenav'>
          {/* <div className='dash'>DASHBOARD</div> */}
          <div className='person-info'>
            <p className='welc'>Welcome,</p>
            <p className='name'>{userData.name}</p>
            <p className='mail'>{userData.email}</p>
            <p className='admin-mode'>
              {isAdmin&&<p className='crgr'>CR/GR</p>}
              {isAdmin&&!makeEdit&&<button className='edit' onClick={handleEditClick}>ADD INFO</button>}
              {isAdmin&&makeEdit&&<button className='edit' onClick={handleExitClick}>EXIT</button>}
            </p>
          </div>
          {!isAdmin&&<br/>}
          <div className='links'>
            <Link to="/study">
              <div className='link'>
              <div className='focus'>
                <PiBooksDuotone className='logo' />
                Links
              </div>                
                {isAdmin && makeEdit &&
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
                  Announcements
                </div>
                  
                  &nbsp;
                  {isAdmin && makeEdit &&
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
                Deadlines
              </div>
                
                {isAdmin && makeEdit &&
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
                Important Dates
              </div>
            
                {isAdmin && makeEdit &&
                <Link to="/add/impdates">
                  <BsFillPlusSquareFill className='addLogo'/> 
                </Link>
                }
              </div>
            </Link>


          </div>

          <Link className="linkabt" to="/about">
          <div className='foot'>
            LSH Team
          </div>
          </Link>

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
