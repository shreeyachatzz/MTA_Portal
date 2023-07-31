import React from 'react'

import './StudyAdd.css'
import DropdownAdd from '../../../../../Components/DropDownPop/DropDownAdd';

const StudyAddCard = () => {
    const dropdownItems = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  return (
    <div className='full'>
    <div className='title-a'>
        Subject
    </div>
    <div className='justlikethat'>
 
    <DropdownAdd items={dropdownItems}/>
    </div>
    <div className='title-a'>
        Link
    </div>
    
    <input className="an-details-sm" placeholder="Write an announcement here..." type='link'>
    </input>
    

</div>
  )
}

export default StudyAddCard