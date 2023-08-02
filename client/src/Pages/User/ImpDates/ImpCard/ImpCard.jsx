import React from 'react'
import './ImpCard.css';
const ImpCard = ({subject,date,time,venue,type}) => {
  return (
    <div className='card-imp'>
      <div className='subj'>{subject}</div>
      <div className='date'>{date}</div>
      <div className='time'>{time}</div>
      <div className='venue'>{venue}</div>
      <div className='type'>{type}</div>
    </div>
  )
}

export default ImpCard