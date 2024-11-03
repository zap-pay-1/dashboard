// app/auth/signin/page.js
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await signIn('credentials', { email, redirect: false });
      if (!res.ok) setError(res.error);
      else setOtpSent(true);
      
    } catch (error) {
      alert(error)
    }
   
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', { email, otp, redirect: false });
    if (res.ok) {
      // Redirect on successful sign-in
      window.location.replace('/');
    } else {
      setError(res.error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={otpSent}
        />
        {otpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        )}
        <button type="submit">{otpSent ? 'Verify OTP' : 'Request OTP'}</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
