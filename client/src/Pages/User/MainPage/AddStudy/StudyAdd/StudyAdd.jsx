import React from 'react'
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import './StudyAdd.css'
import DropdownAdd from '../../../../../Components/DropDownPop/DropDownAdd';

const StudyAddCard = () => {

  const navigate = useNavigate();

  const handleClickSub = event => {
    event.preventDefault();

    // 👇️ redirect to /contacts
    navigate('/study');
  };
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
    
    <input className="an-details-sm" placeholder="Paste link here..." type='link'>
    </input>
    <div className='break'></div>
    <div className='submiting'>
        <p className='sub' onClick={handleClickSub}>Submit</p>
        </div>
  </div>
  )
}

export default StudyAddCard