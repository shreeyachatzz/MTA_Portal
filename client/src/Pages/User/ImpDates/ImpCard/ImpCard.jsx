import React from 'react'
import './ImpCard.css';
import { MdOutlineDeleteForever } from 'react-icons/md';

const ImpCard = ({subject,date,time,venue,type}) => {
    const isAdmin=true;
  return (
    <>
      <div>
      {isAdmin&&<div className='card-imp-d'>
      
      <div className='card-imp'>
      <div className='sub-box'>
      <div className='subj'>{subject}</div>
      </div>
        <div className='dtogether'>
          <div className='date'>{date}</div>
          <div className='time'>{time}</div>
        </div>
        <div className='tven'>
          <div className='type'>{type}</div>
          <div className='venmob'>{venue}</div>
        </div>
        <div className='venue'>{venue}</div>
        {isAdmin&&<div className='del-impdate'><MdOutlineDeleteForever/></div>}
      </div>
      </div>}
      </div>
    </>
  )
}

export default ImpCard