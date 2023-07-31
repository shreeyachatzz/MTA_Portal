import React from 'react'
import Dropdown from '../../../Deadlines/Dropdown/Dropdown'
import { useNavigate } from 'react-router-dom';

const ImpAddCard = () => {
    const navigate = useNavigate()
    const handleImpSubmit=(e)=>{
      e.preventDefault();
      navigate('/impdates');
    }
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
    <div className='submiting'>
        <p className='sub' onClick={handleImpSubmit}>Submit</p>
        </div>
    

</div>
  )
}

export default ImpAddCard