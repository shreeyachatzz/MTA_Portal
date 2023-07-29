import React from 'react'
import './Deadline.css'
import SideNav from '../../Components/Navbar/Navbar'
import DCard from './DCard/DCard';
import Dropdown from './Dropdown/Dropdown';


const Deadline = (props, state) => {
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

      const dropdownItems = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

      const shouldSetHeight = dataArray.length < 4;
      const noEl = dataArray.length === 0;


      return (
         <div className={`fullmain ${shouldSetHeight ? 'app' : ''}`}>
          <SideNav />
        <div className="containerr-d">
        <div className='mobHead'>
            DEADLINES
        </div>

        <div className='deadBar'>
            <div className='filter'>
            FILTER BY <Dropdown items={dropdownItems}/>
            </div>
            <div className='fend'>
                <div className='butf'>
                    COE16
                </div>
                <div className='butf'>
                    COE15-22
                </div>
            </div>
        </div>
        <div className={`msg ${noEl ? 'show' : ''}`}>
        No Data Available
        </div>
        {dataArray.map((item, index) => (
          <DCard key={index} title={item.title}/>
        ))}
        </div>
     </div>
    
  )
}

export default Deadline