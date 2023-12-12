import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebasae';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // You can access the user information like userCredential.user
      console.log('User signed up:', userCredential.user);
      navigate('/login')

    } catch (error) {
      console.error('Error signing up:', error.message);
      navigate('/signup')
    }
  };

  return (
    <div className='bg-gradient-to-b from-emerald-500 to-blue-800 flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0  h-screen w-full '>
      <form onSubmit={handleSignup} className='inline-block p-4 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full '>
      <h2 className='text-center text-2xl font-bold mb-5 text-gradient-to-b from-emerald-500 to-blue-800'>Signup</h2>
      <div className='flex justify-center items-center mb-4'>

        <label className='font-bold   text-center    w-1/3   '>
          Username:
        </label>
        <input 
        type="text" 
        placeholder='Enter Your User Name'
        value={username} 
        className='border pl-2 py-1 border-black w-2/3 rounded-md'

        onChange={(e) => setUsername(e.target.value)} 
        required />

        </div>
      <div className='flex justify-center items-center mb-4'>
        <label className='font-bold   text-center    w-1/3   '>
          Email:
        </label>
        <input 
        type="email" 
        placeholder='Enter Your Email Address'
        value={email} 
        className='border pl-2 py-1 border-black w-2/3 rounded-md'
        onChange={(e) => setEmail(e.target.value)} 
        required />
        </div>
      <div className='flex justify-center items-center mb-4'>
       
        <label className='font-bold   text-center    w-1/3   '>
          Password:
          
        </label>
        <input 
          type="password"
          placeholder='Enter Your Password'  
          value={password} 
        className='border pl-2 py-1 border-black w-2/3 rounded-md'
          onChange={(e) => setPassword(e.target.value)} 
          required />
        </div>
        
        <div className='flex justify-center mt-4 gap-4 '>
                    <button className='bg-gradient-to-b from-emerald-500 to-blue-800 rounded-full text-white font-bold px-6 flex justify-center py-2' type="submit">Sign Up</button>
                    <button className='flex items-center'>Already Registered! <Link to='/login'><span className='text-blue-500 ml-1'>Login</span></Link></button>
                    </div>
      </form>
    </div>
  );
};

export default Signup;
