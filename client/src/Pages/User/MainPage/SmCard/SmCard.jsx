import React, { useState } from 'react'
import './SmCard.css'

const SmCard = ({id, subject, link}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className='card-m'>
      {subject}
      {!isAdmin &&
        <span className="del-dead">
          Delete
        </span>
      }
    </div>
  )
}

export default SmCard