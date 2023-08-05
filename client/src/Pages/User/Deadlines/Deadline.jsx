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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching deadlines:', error);
        setIsLoading(false);
      }
    };

    fetchAllDeadlines();
  }, []);

  const sortedDataArray = allDeadlines.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  const shouldSetHeight = sortedDataArray.length < 4;
  const noEl = sortedDataArray.length === 0;

  const handleSubjectChange = (selectedSubject) => {
    setSelectedSubject(selectedSubject);
  
    if (selectedSubject !== 'All Subjects') {
      const filteredDeadlines = originalDeadlines.filter(item => item.title === selectedSubject);
      setAllDeadlines(filteredDeadlines);
    } else {
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
            FILTER BY <Dropdown items={[...dropdownItems, 'All Subjects']} onChange={(selectedSubject) => handleSubjectChange(selectedSubject === null ? 'All Subjects' : selectedSubject)} selectedSubject={selectedSubject} />
          </div>
        </div>
        <div className={`msg ${isLoading ? 'show' : ''}`}>
          {isLoading ? 'Loading ...' : null}
        </div>
        {sortedDataArray.map(item => (
          <DCard
            key={item._id}
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
