import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudyAdd.css';

const StudyAddCard = () => {
  const navigate = useNavigate();
  const [addBtn, setAddBtn] = useState('Add');
  const [inputData, setInputData] = useState({ subject: '', link: '' });
  const [selectedSection, setSelectedSection] = useState('subgroup'); // Default to subgroup selection

  const handleButtonClick = (section) => {
    setSelectedSection(section);
  };

  const handleClickSub = async (event) => {
    event.preventDefault();
    setAddBtn('Adding ...');

    try {
      const response = await fetch('http://localhost:5000/resource/addResource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtoken')}`,
        },
        body: JSON.stringify({
          ...inputData,
          section: selectedSection,
        }),
      });

      if (response.status === 400) {
        setAddBtn('Add');
        window.alert('Empty fields!');
      } else {
        setAddBtn('Add');
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
      <form onSubmit={handleClickSub}>
        <div className='title-a'>Subject</div>
        <input
          className='an-details-sm'
          placeholder='Enter title'
          type='text'
          name='subject'
          onChange={handleChange}
        />
        <div className='title-a sm-cl'>
          Class
        </div>
        <div className='context'>
          Select your Section/Group
        </div>
        <div className='sm-but-cl'>
        <div
          className={`sec-grp ${selectedSection === 'subgroup' ? 'active' : ''}`}
          onClick={() => handleButtonClick('subgroup')}
        >
          Subgroup
        </div>
        <div
          className={`sec-grp ${selectedSection === 'group' ? 'active' : ''}`}
          onClick={() => handleButtonClick('group')}
        >
          Group
        </div>
        </div>
        <div className='title-a'>
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
          <button type='submit' className='sub'>
            {addBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudyAddCard;
