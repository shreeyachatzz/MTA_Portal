import React, { useState, useEffect } from 'react';
import './Main.css';
import SideNav from '../../../Components/Navbar/Navbar';
import SmCard from './SmCard/SmCard';
import { BiSearchAlt } from 'react-icons/bi';

const MainPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState('');

  const heading = 'STUDY MATERIAL';

  const shouldSetHeight = filteredData.length < 10;

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchQuery(inputValue);

    if (inputValue === '') {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.subject.toLowerCase().includes(inputValue)
        )
      );
    }
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);

    // Apply filtering based on button clicked (subgroup or group)
    if (buttonName === 'COE16') {
      setFilteredData(data.filter((item) => item.subgroup === 'COE16'));
    } else if (buttonName === 'COE15-22') {
      setFilteredData(data.filter((item) => item.group === 'COE15-22'));
    } else {
      // If no button is selected, show all data
      setFilteredData(data);
    }
  };

  const token = localStorage.getItem('jwtoken');
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('http://localhost:5000/resource/viewResource', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }

        const data = await response.json();
        setData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        // Handle error if needed
      }
    };

    fetchResources();
  }, [token]);

  return (
    <div className={`fullmain ${shouldSetHeight ? 'fill' : ''}`}>
      <SideNav heading={heading} />

      <div className='containerr'>
        <div className='mobHead'>LINKS</div>
        <div className='search-contain'>
          <div className='search'>
            <input
              className='cards-i'
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder='Search by subject...'
            />
            <BiSearchAlt className='icon-search' />
          </div>
          <div
            className={`butf mainbut ${selectedButton === 'COE16' ? 'active' : ''}`}
            onClick={() => handleButtonClick('COE16')}
          >
            CO16
          </div>
          <div
            className={`butf mainbut ${selectedButton === 'COE15-22' ? 'active' : ''}`}
            onClick={() => handleButtonClick('COE15-22')}
          >
            CO16-20
          </div>
        </div>
        <div className='cards-m'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            filteredData.map((item) => (
              <SmCard key={item._id} id={item._id} subject={item.subject} link={item.link} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
