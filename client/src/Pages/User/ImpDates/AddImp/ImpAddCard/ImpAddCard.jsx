import React from 'react'
import Dropdown from '../../../Deadlines/Dropdown/Dropdown'

const ImpAddCard = () => {
    const dropdownItems = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  return (
    <div className='full'>
    <div className='title-a'>
        Deadline
    </div>
    <input type='date' className='datechoice'></input>
    <br/>
    <div className='title-a'>
       Info
    </div>
    <textarea className="an-details" placeholder="Write an announcement here...">
    </textarea>
    

</div>
  )
}

export default ImpAddCard