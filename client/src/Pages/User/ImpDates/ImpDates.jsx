import React from 'react'
import './ImpDates.css'
import SideNav from '../../../Components/Navbar/Navbar'
import ICard from './ICard/ICard';

const ImpDates = (props, state) => {
  const dataArray = [
    { title: 'Card 1', content: 'Content 1', date: '15/09/2003' },
    { title: 'Card 2', content: 'Content 2', date: '15/06/2013' },
    { title: 'Card 3', content: 'Content 3', date: '15/06/2023' },
    { title: 'Card 1', content: 'Content 1', date: '15/07/2003' },
    { title: 'Card 2', content: 'Content 2', date: '15/08/2003' },
    { title: 'Card 3', content: 'Content 3', date: '15/09/2003' },
    { title: 'Card 1', content: 'Content 1', date: '15/10/2003' },
    { title: 'Card 2', content: 'Content 2',  date: '15/11/2003' },
    { title: 'Card 3', content: 'Content 3', date: '15/12/2003' },
    // Add more objects as needed
  ];

  const shouldSetHeight = dataArray.length < 10;

  const sortedDataArray = [...dataArray].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
    return Date.UTC(yearA, monthA - 1, dayA) - Date.UTC(yearB, monthB - 1, dayB);
  });

  return (
     <div className={`fullmain ${shouldSetHeight ? 'fill' : ''}`}>
      <SideNav heading='IMPORTANT DATES'/>
      
      <div className='containerr-d'>
        <div className='mobHead'>
          IMPORTANT DATES
        </div>
        <div className='cards'>
          {sortedDataArray.map((item, index) => (
              <ICard
                key={index}
                title={item.title}
                content={item.content}
                subject={item.subject}
                date={item.date}
              />
            ))}
        </div>
      </div>
    </div>
    
  )
}

export default ImpDates