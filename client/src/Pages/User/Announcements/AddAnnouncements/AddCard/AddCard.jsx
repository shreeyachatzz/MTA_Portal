import React, { useState } from 'react'
import './AddCard.css'
import { useNavigate } from 'react-router-dom'
import { useEditContext } from '../../../../../EditContext'

const AddCard = () => {
    const { userData, setUserData } = useEditContext();
    const [clickedButton, setClickedButton] = useState('subgroup');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem("jwtoken");
    const handleAnnSubmit = async(e) => {
        try {

            if (!description) {
                window.alert('Please fill in all the details.');
                return;
              }
            const requestData = {
                description,
            };

            // Determine the appropriate backend route based on the clickedButton value
            const backendRoute = clickedButton === 'group' ? 'http://localhost:5000/announcement/postMyGrpAnnouncements' : 'http://localhost:5000/announcement/postMySubGrpAnnouncements';

            const response = await fetch(backendRoute, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.status === 422) {
                window.alert('Empty fields! Please fill in all the details.');
            } else if (response.status === 201) {
                // Handle success scenario, e.g., show success message, clear form, etc.
                console.log('Announcement submission successful!');
                console.log(data);

                // Clear the form fields after successful submission
                setDescription('');

                // Navigate to another page after successful submission, if required
                navigate('/announcements'); // Change '/success' to the desired route
            } else {
                console.log('Announcement submission failed!');
                console.log(data);
            }
        } catch (error) {
            // Handle any error that may occur during the API call
            console.error('Error submitting deadline:', error);
        }
    }

    const handleButtonClick = (buttonType) => {
        setClickedButton(buttonType);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <div className='full'>
            <div className='title-a'>
                Class
            </div>
            <div className='context'>
                Select your Section/Group
            </div>
            <button
                className={`sec-grp ${clickedButton === 'subgroup' ? 'active' : ''}`}
                onClick={() => handleButtonClick('subgroup')}
            >
                {userData.subgroup}
            </button>
            <button
                className={`sec-grp ${clickedButton === 'group' ? 'active' : ''}`}
                onClick={() => handleButtonClick('group')}
            >
                {userData.group}
            </button>
            <div className='title-a'>
                Announcement
            </div>
            <textarea className="an-detail" placeholder="Write an announcement here..." onChange={handleDescriptionChange}>
            </textarea>
            <div className='submiting'>
                <p className='sub' onClick={handleAnnSubmit}>Submit</p>
            </div>

        </div>
    )
}

export default AddCard