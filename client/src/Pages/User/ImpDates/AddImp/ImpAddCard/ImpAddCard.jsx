import React, { useState } from 'react';
import Dropdown from '../../../Deadlines/Dropdown/Dropdown';
import { useNavigate } from 'react-router-dom';
import './ImpAddCard.css'

const ImpAddCard = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState('');

  const handleImpSubmit = (e) => {
    e.preventDefault();
    navigate('/impdates');
  };

  const classOptions = ['EST', 'MST', 'SESS', 'MISC'];

  const handlegrp = (e) => {
    setSelectedButton(e.target.value);
  };

  return (
    <div className='full'>
      <div className='row-1'>
      <div className='rowz'>
      <div className='date-imp'>
          <div className='title-a'>Deadline</div>
          <input type='date' className='datechoice'></input>
        </div>

        <div className='time-imp'>
          <div className='title-a'>Time</div>
          <input type='time' className='datechoice bbt'></input>
        </div>
      </div>
      <div className='rowz1'>
      <div className='venue-imp'>
          <div className='title-a'>Venue</div>
          <input type='text' className='datechoice'></input>
        </div>

        <div className='type-imp'>
          <div className='title-a'>Type</div>
          <select value={selectedButton} onChange={handlegrp} className='datechoice tyty'>
            <option value=''>All</option>
            {classOptions.map((option, index) => (
              <option className='harsh' key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
        

      </div>

      <div className='title-a'>Info</div>
      <textarea className='an-details' placeholder='Write an announcement here...'></textarea>
      <div className='submiting'>
        <p className='sub' onClick={handleImpSubmit}>
          Submit
        </p>
      </div>
    </div>
  );
};

export default ImpAddCard;
