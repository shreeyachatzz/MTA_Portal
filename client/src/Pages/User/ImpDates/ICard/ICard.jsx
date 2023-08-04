import React from 'react'
import './ICard.css'

const ICard = ({ title, content, date }) => {
  const isAdmin=false;
  return (
    <div className='card-i'>
    <div className='header'>
    <div className='date-i'>
            {date}
        </div>
        {isAdmin&& <div className='del-dead'>
              Delete
            </div>}
    </div>
        <div className='info-i'>
        {content}
        </div>
    </div>
  )
}

export default ICard