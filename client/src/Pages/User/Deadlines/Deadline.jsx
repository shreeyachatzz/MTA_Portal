import React, { useEffect, useState } from 'react';
import './Deadline.css';
import SideNav from '../../../Components/Navbar/Navbar';
import DCard from './DCard/DCard';
import Dropdown from './Dropdown/Dropdown';

const Deadline = () => {
  const dropdownItems = ['OS', 'DSA', 'DAA', 'CN', 'AI'];

  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [allDeadlines, setAllDeadlines] = useState([]);
  const [originalDeadlines, setOriginalDeadlines] = useState([]);

  useEffect(() => {
    // Fetch all deadlines when the component mounts
    const fetchAllDeadlines = async () => {
      try {
        const response = await fetch('http://localhost:5000/deadline/getAllDeadlines', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('An error occurred while fetching deadlines');
        }

        const data = await response.json();
        setAllDeadlines(data.deadlines);
        setOriginalDeadlines(data.deadlines);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllDeadlines();
  }, []);

  // Convert the date strings to Date objects for proper sorting
  const sortedDataArray = allDeadlines.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/');
    const [dayB, monthB, yearB] = b.date.split('/');
    return Date.UTC(yearA, monthA - 1, dayA) - Date.UTC(yearB, monthB - 1, dayB);
  });

  const shouldSetHeight = sortedDataArray.length < 4;
  const noEl = sortedDataArray.length === 0;

  const handleSubjectChange = (selectedSubject) => {
    setSelectedSubject(selectedSubject);

    // If a subject is selected, filter the deadlines based on the subject
    // Otherwise, display all deadlines
    if (selectedSubject!=='All Subjects') {
      const filteredDeadlines = originalDeadlines.filter(item => item.title === selectedSubject);
      setAllDeadlines(filteredDeadlines);
    } else {
      // If no subject is selected, fetch all deadlines again
      // You can add a separate endpoint to fetch all deadlines without filters to improve performance
      setAllDeadlines(originalDeadlines);
    }
  };

  return (
    <div className={`fullmain ${shouldSetHeight ? 'fill' : ''}`}>
      <SideNav heading='DEADLINES' />
      <div className="containerr-dd">
        <div className='mobHead'>
          DEADLINES
        </div>

        <div className='deadBard'>
          <div className='filter'>
            FILTER BY <Dropdown items={[...dropdownItems, 'All Subjects']} onChange={handleSubjectChange} selectedSubject={selectedSubject} />
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
        {sortedDataArray.map((item, index) => (
          <DCard
            key={index}
            id={item._id}
            title={item.title}
            description={item.description}
            date={item.date}
            groupOrSubgroup={item.group || item.subgroup}
          />
        ))}
      </div>
    </div>
  );
};

export default Deadline;
