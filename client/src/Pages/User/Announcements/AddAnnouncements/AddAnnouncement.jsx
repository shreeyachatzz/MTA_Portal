import React from 'react'
import './AddAnnouncement.css';
import SideNav from '../../../../Components/Navbar/Navbar';
import AddCard from './AddCard/AddCard';

const AddAnnouncement = () => {
  return (
    <div className='fullmain'>
          <SideNav />
        <div className="containerr">
            <AddCard />
        </div>
     </div>
  )
}

export default AddAnnouncement