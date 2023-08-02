import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ResetPass.css';

const ResetPass = () => {
  const [resetData, setResetData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
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
    const { email, currentPassword, newPassword } = resetData;

    const res = await fetch('http://localhost:5000/user/resetPassword', {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (res.status === 400) {
      window.alert("Reset password failed!");
      console.log(res.status);
      console.log(data);
    } else if (res.status !== 400) {
      window.alert("Password reset successful!");
      navigate('/login'); 
      console.log(res.status);
      console.log(data);
    }
  };

  return (
    <div className='lpage'>
      <div className='pimg'></div>
      <div className='form-sec'>
        <div className='form'>
          <div className='descF'>
            <div className='title'>Sign in</div>
            <div className='desc'>
              If you don't have an account,<br/>Contact your <span className='red'>GR/CR!</span>
            </div>
          </div>
          <div className="form-container">
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <div className='labell'><i>Email</i></div>
                <input
                  placeholder='College email id'
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <div className='labell'><i>Current Password</i></div>
                <input
                  placeholder='Enter your current password'
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <div className='labell'><i>New Password</i></div>
                <input
                  placeholder='Enter your new password'
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  required
                  onChange={handleChange}
                />
              </div>
              <Link className='rplink' to='/reset'>
                <div className='rp'>Reset Password?</div>
              </Link>
              <div className='forg'></div>
              <button type="submit" className='but-sin'>Reset</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
