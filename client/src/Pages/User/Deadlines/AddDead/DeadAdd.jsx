import React from 'react'
import './DeadAdd.css';
import SideNav from '../../../../Components/Navbar/Navbar';
import CardD from './CardD/CardD';


const DeadAdd = () => {
  return (
    <div>
        <div className='fullmain'>
          <SideNav heading='ADD DEADLINE'/>
        <div className="containerr">
        <div className='heading'>ADD DEADLINE</div>
            <CardD />
        </div>
     </div>
    </div>
  )
}

export default DeadAdd