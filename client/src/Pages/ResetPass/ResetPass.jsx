import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPass = () => {
  const [resetMsg, setResetMsg] = useState('Reset');
  const [resetData, setResetData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMsg('PROCESSING ...');

    const { email, currentPassword, newPassword } = resetData;

    try {
      const res = await fetch('https://mta-backend.vercel.app/user/resetPassword', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.status === 400 || res.status === 404) {
        setResetMsg('Reset');
        window.alert('Reset password failed!');
      } else {
        window.alert('Password reset successful!');
        setResetMsg('Reset');
        navigate('/login');
      }
    } catch (error) {
      // console.error('An error occurred:', error);
      setResetMsg('Reset');
    }
  };

  return (
    <div className='lpage'>
      <div className='pimg'></div>
      <div className='form-sec'>
        <div className='form'>
          <div className='descF'>
            <div className='title'>Reset Password</div>
            <div className='desc'>
              If you don't have an account,<br />
              Contact your <span className='red'>GR/CR!</span>
            </div>
          </div>
          <div className='form-container'>
            <form onSubmit={handleResetPassword}>
              <div className='form-group'>
                <div className='labell'>
                  <>Email</>
                </div>
                <input
                  placeholder='College email id'
                  type='email'
                  id='email'
                  name='email'
                  required
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <div className='labell'>
                  <>Current Password</>
                </div>
                <input
                  placeholder='Enter your current password'
                  type='password'
                  id='currentPassword'
                  name='currentPassword'
                  required
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <div className='labell'>
                  <>New Password</>
                </div>
                <input
                  placeholder='Enter your new password'
                  type='password'
                  id='newPassword'
                  name='newPassword'
                  required
                  onChange={handleChange}
                />
              </div>
              <Link className='rplink' to='/login'>
                <div className='rp'>Go Back!</div>
              </Link>
              <div className='forg'></div>
              <button type='submit' className='but-sin'>
                {resetMsg}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
