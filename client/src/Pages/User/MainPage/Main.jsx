import React, { useState } from 'react';
import './Main.css';
import SideNav from '../../../Components/Navbar/Navbar';
import SmCard from './SmCard/SmCard';
import { BiSearchAlt } from 'react-icons/bi';

const MainPage = (props, state) => {
  const dataArray = [
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
    { title: 'Card 3', content: 'Content 3' },
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
  ];
  const heading = 'STUDY MATERIAL';

  const shouldSetHeight = dataArray.length < 10;

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredData(
      dataArray.filter((item) =>
        item.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const [filteredData, setFilteredData] = useState(dataArray);

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
              placeholder='Search by title...'
            />
            <BiSearchAlt className='icon-search' />
          </div>
        </div>
        <div className='cards-m'>
          {filteredData.map((item, index) => (
            <SmCard key={index} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
