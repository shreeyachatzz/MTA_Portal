import React from 'react'
import './AddCard.css'

const AddCard = () => {
  return (
    <div className='full'>
        <div className='title-a'>
            Class
        </div>
        <div className='context'>
            Select your Section/Group
        </div>
        <div className='select-but'>
            <button className='sec-grp'>
                CO16
            </button>
            <button className='sec-grp'>
                CO15-22
            </button>            
        </div>
        <div className='title-a'>
            Announcement
        </div>
        <textarea className="an-detail" placeholder="Write an announcement here...">
        </textarea>
        

    </div>
  )
}

export default AddCard