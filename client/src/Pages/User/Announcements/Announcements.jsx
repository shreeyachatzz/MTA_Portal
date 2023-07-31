import React from 'react'
import './Announcements.css'
import SideNav from '../../../Components/Navbar/Navbar'
import ACard from './ACard/ACard';


const Announcements = (props, state) => {
    const dataArray = [
        { title: 'Card 1', content: 'Content 1' },
        { title: 'Card 2', content: 'Content 2' },
        { title: 'Card 3', content: 'Content 3' },
        { title: 'Card 1', content: 'Content 1' },
        { title: 'Card 2', content: 'Content 2' },
        { title: 'Card 3', content: 'Content 3' },
        { title: 'Card 1', content: 'Content 1' },
        { title: 'Card 2', content: 'Content 2' },
        { title: 'Card 3', content: 'Content 3' },
        // Add more objects as needed
      ];

      const shouldSetHeight = dataArray.length < 4;
    
      return (
         <div className={`fullmain ${shouldSetHeight ? 'app' : ''}`}>
          <SideNav heading='ANNOUNCEMENTS'/>
        <div className="containerr">
        <div className='mobHead'>
            ANNOUNCEMENTS
        </div>
        {dataArray.map((item, index) => (
          <ACard key={index} title={item.title}/>
        ))}
        </div>
     </div>
    
  )
}

export default Announcements