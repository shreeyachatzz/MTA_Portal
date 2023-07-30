import React from 'react'
import './ACard.css'

const ACard = () => {
  
  // Check admin status
  const isAdmin=false;

  return (
    <div className='card-a'>
    
        <div className='top-an'>
        <div className='grpclass-a'>#CO15-22</div>
        {isAdmin&&<div className='del-an'>Delete</div>}
        </div>
        <div className='info-a'>This is the text of the announcement which can indeed be so big that you can sleep while reading it. It all comes down to the creative writing abilities of the CR/GR posting the information on this portal.</div>
    </div>
  )
}

export default ACard