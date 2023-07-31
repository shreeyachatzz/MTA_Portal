import React from 'react'
import './Main.css'
import SideNav from '../../../Components/Navbar/Navbar'
import SmCard from './SmCard/SmCard'

const MainPage = (props, state) => {
  const dataArray = [
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
    { title: 'Card 3', content: 'Content 3' },
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
    { title: 'Card 1', content: 'Content 1' },
    { title: 'Card 2', content: 'Content 2' },
  ];
  const heading='STUDY MATERIAL';

  const shouldSetHeight = dataArray.length < 10;

  return (
     <div className={`fullmain ${shouldSetHeight ? 'fill' : ''}`}>
      <SideNav heading={heading}/>
      
      <div className='containerr'>
        <div className='mobHead'>
          LINKS
        </div>
        <div className='cards-m'>
          {dataArray.map((item, index) => (
              <SmCard key={index} title={item.title}/>
            ))}
        </div>
      </div>
    </div>
    
  )
}

export default MainPage