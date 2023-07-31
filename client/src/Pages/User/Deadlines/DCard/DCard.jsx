import React from 'react'
import './DCard.css'

const DCard = ({ title, content, subject, date }) => {
  //Check Admin Status
  const isAdmin=true;
  
  return (
    <div className='card-d'>
        <div className='deadBarr-d'>
        <div className='p1-d'>
            <div className='sub-d'>
                Subject: {subject}
            </div>
            <div className='grpclass-d'>#CO15-22</div>
          </div>
            <div className='date-d'>
            {date}
            </div>
            {isAdmin&& <div className='del-dead'>
              Delete
            </div>}
        </div>
        
        <div className='info-d'>{content}</div>
    </div>
  )
}

export default DCard