import React from 'react'
import './ImpDates.css'
import SideNav from '../../Components/Navbar/Navbar'
import ICard from './ICard/ICard';

const ImpDates = (props, state) => {
  const dataArray = [
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
    { title: 'Card 3', content: 'Content 3' },
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
  ];

  const shouldSetHeight = dataArray.length < 10;

  return (
     <div className={`fullmain ${shouldSetHeight ? 'fill' : ''}`}>
      <SideNav />
      
      <div className='containerr-d'>
        <div className='mobHead'>
          IMPORTANT DATES
        </div>
        <div className='cards'>
          {dataArray.map((item, index) => (
              <ICard key={index} title={item.title}/>
            ))}
        </div>
      </div>
    </div>
    
  )
}

export default ImpDates