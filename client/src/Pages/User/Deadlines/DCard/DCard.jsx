import React from 'react'
import './DCard.css'

const DCard = ({ title, description, date, groupOrSubgroup }) => {
  //Check Admin Status
  const isAdmin=true;
  
  return (
    <div className='card-d'>
        <div className='deadBarr-d'>
        <div className='p1-d'>
            <div className='sub-d'>
                Subject: {title}
            </div>
            <div className='grpclass-d'>#{groupOrSubgroup}</div>
          </div>
            <div className='date-d'>
            {date}
            </div>
            {isAdmin&& <div className='del-dead'>
              Delete
            </div>}
        </div>
        
        <div className='info-d'>{description}</div>
    </div>
  )
}

export default DCard