import React, { useState, useEffect } from 'react';
import './Main.css';
import SideNav from '../../../Components/Navbar/Navbar';
import SmCard from './SmCard/SmCard';
import { BiSearchAlt } from 'react-icons/bi';

const MainPage = (props, state) => {
  const [data, setData] = useState([]); // Store the original data
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const heading = 'STUDY MATERIAL';

  const shouldSetHeight = filteredData.length < 10;

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();

    setSearchQuery(inputValue);

    if (inputValue === '') {
      setFilteredData(data); // Use the original data when the search query is empty
    } else {
      setFilteredData(
        data.filter((item) =>
          item.subject.toLowerCase().includes(inputValue)
        )
      );
    }
  };

  const token = localStorage.getItem('jwtoken');
  useEffect(() => {
    // Fetch resources from the backend
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
        setData(data); // Store the original data
        setFilteredData(data);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    fetchResources();
  }, []);

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
        </div>
        <div className='cards-m'>
          {filteredData.map((item, index) => (
            <SmCard key={index} subject={item.subject} link={item.link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
