import React from 'react'
import Dropdown from '../../Dropdown/Dropdown';
import './CardD.css'

const CardD = () => {

      const dropdownItems = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  return (
    <div className='full'>
        <div className='title-a'>
            Subject
        </div>
        <div className='justlikethat'>
        <Dropdown items={dropdownItems}/>
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
        

    </div>
  )
}

export default CardD