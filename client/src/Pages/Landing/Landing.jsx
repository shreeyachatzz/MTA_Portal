import React from 'react'
import './Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='everything'>
        <div className='contain'>
    {/* Horizontal for pc*/}
            <div className='lcont'> 
            <div className='text-u'>
                <div className='oneu'>MY THAPAR</div>
                <div className='twou'>Academia</div> 
                <div className='threeu'>A one stop solution to all your academic problems.</div>
            </div>   
            <div className='pos'>
            <Link to='/login'>
                <button className='l-but'>
                    LOGIN
                </button>
            </Link>
            </div>
            </div>
            <div className='marb'>
            </div>

        </div>
    {/* Vertical for mobile */}
    <div className='mob-cont'>
        <div className='lcont-mob'>   
        <div className='text-l'>
            <div className='one'>MY THAPAR</div>
            <div className='two'>Academia</div> 
            <div className='three'>A one stop solution to all your academic problems.</div>
        </div>
        </div>
        <div className='marb-mob'>
            <div className='posm'>
                    <Link to='/login'>
                    <button className='l-butm'>
                        LOGIN
                    </button>
                    </Link>
                </div>
            </div>
    </div>
        
    </div>
    
  )
}

export default Landing