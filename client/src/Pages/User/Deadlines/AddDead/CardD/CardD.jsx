import React from 'react'
import './CardD.css'
import DropdownAdd from '../../../../../Components/DropDownPop/DropDownAdd';
import {useNavigate} from 'react-router-dom';

const CardD = () => {
    const navigate = useNavigate();
    const handleClickSubD = event => {
        event.preventDefault();
    
        navigate('/deadline');
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
            Deadline
        </div>
        <input type='date' className='datechoice'></input>
        <div className='title-a'>
            More info
        </div>
        <textarea className="an-details" placeholder="Write an announcement here...">
        </textarea>

        <div className='submiting'>
        <p className='sub' onClick={handleClickSubD}>Submit</p>
        </div>
        

    </div>
  )
}

export default CardD