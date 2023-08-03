import React, { useState } from 'react'
import './SmCard.css'

const SmCard = ({ title, key }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className='card-m'>
      {title}
      {!isAdmin &&
        <span className="del-dead">
          Delete
        </span>
      }
    </div>
  )
}

export default SmCard