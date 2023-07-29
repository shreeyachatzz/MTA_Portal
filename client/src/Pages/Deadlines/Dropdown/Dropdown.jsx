import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';
import { BiDownArrow } from 'react-icons/bi';

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Add event listener to handle clicks outside the dropdown
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button className="dropbtn" onClick={handleDropdownClick}>
        {selectedOption || 'Dropdown'}&nbsp;<BiDownArrow/>
      </button>
      <div className="dropdown-content">
        {items.map((item, index) => (
          <a key={index} href="#" onClick={() => handleOptionClick(item)}>
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
