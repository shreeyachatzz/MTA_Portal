import React from 'react'
import './ImpDates.css'
import SideNav from '../../../Components/Navbar/Navbar'
import ICard from './ICard/ICard';
import ImpCard from './ImpCard/ImpCard';

const ImpDates = (props, state) => {
  const dataArray = [
    { subject: 'Network Programming', date: '15/06/03', time: '12.30pm', venue:'LT101',type:'SESS'},
    { subject: 'Software Engineering', date: '15/06/13', time: '12.30pm', venue:'-' , type:'SESS'},
    { subject: 'Machine Learning', date: '15/06/23', time: '12.30pm', venue:'LT101' ,type:'SESS'},
    { subject: 'ML Lab', date: '15/06/33', time: '12.30pm', venue:'LT101',type:'EST' },
    { subject: 'SE Lab', date: '15/06/43', time: '12.30pm', venue:'LT101', type:'MST' },
    { subject: 'EDS', date: '15/06/53', time: '12.30pm', venue:'LT101' ,type:'EST'}, 
    { subject: 'EDS', date: '15/06/53', time: '12.30pm', venue:'LT101' ,type:'EST'},    
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
        <div className='card-imp1'>
            <div className='subj1'>SUBJECT</div>
            
            <div className='dtogether1'>
              <div className='date1'>DATE/TIME</div>
            </div>
            <div className='type1'>TYPE<p className='type-space'>/VENUE</p></div>
            <div className='venue1'>VENUE</div>
        </div>
          {sortedDataArray.map((item, index) => (
              <ImpCard
                key={index}
                subject={item.subject}
                date={item.date}
                time={item.time}
                venue={item.venue}
                type={item.type}
              />
            ))}
        </div>
      </div>
    </div>
    
  )
}

export default ImpDates