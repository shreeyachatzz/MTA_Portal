import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import './StudyAdd.css';

const StudyAddCard = () => {
  const navigate = useNavigate();
  const [addBtn,setAddBtN] = useState('Add');
  const [inputData, setInputData] = useState({ subject: '', link: '' });

  const handleClickSub = async (event) => {
    setAddBtN('Adding ...');
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/resource/addResource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        },
        body: JSON.stringify(inputData),
      });

      const data = response.json();

      if (response.status === 400) {
        setAddBtN('Add');
        window.alert('Empty fields!');
      }

      else{
        setAddBtN('Add');
        navigate('/study');
      }
    } catch (error) {
      navigate('/login');
      console.error(error);
      // Handle error if needed
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='full'>
      <div className='title-a'>Subject</div>
      <input
        className='an-details-sm'
        placeholder='Enter title'
        type='text'
        name='subject'
        onChange={handleChange}
      />
      <div className='title-a'>
        <br />
        Link
      </div>
      <input
        className='an-details-sm'
        placeholder='Paste link here...'
        type='text'
        name='link'
        onChange={handleChange}
      />
      <div className='break'></div>
      <div className='submiting'>
        <p className='sub' onClick={handleClickSub}>
          {addBtn}
        </p>
      </div>
    </div>
  );
};

export default StudyAddCard;
