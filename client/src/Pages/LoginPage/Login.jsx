import React,{useState } from 'react';

import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here, you can add your logic to handle form submission
      console.log('Submitted:', email, password);
      // You can use this data to perform authentication, etc.
    };
  
  return (
    <div className='lpage'>
        <div className='pimg'>
        </div>
        <div className='form-sec'>
        <div className='form'>
            <div className='descF'>
                <div className='title'>
                    Sign in
                </div>
                <div className='desc'>
                If you don't have an account,<br/>Contact your <span className='
                red'>GR/CR!</span>
                </div>
            </div>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <div className='labell'>Email</div>
          <input
            placeholder='College email id'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <div className='labell'>Password</div>
          <input
            placeholder='Enter your password'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='forg'></div>
        <button type="submit" className='but-sin'>Login</button>
      </form>
    </div>
        </div>
        </div>
    </div>
  )
}

export default Login