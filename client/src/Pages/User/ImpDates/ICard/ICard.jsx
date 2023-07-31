import React from 'react'
import './ICard.css'

const ICard = () => {
  const isAdmin=true;
  return (
    <div className='card-i'>
    <div className='header'>
    <div className='date-i'>
            15/06/2023
        </div>
        {isAdmin&& <div className='del-dead'>
              Delete
            </div>}
    </div>
        <div className='info-i'>
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ng Lorem Ipsum is that it.
        </div>
    </div>
  )
}

export default ICard