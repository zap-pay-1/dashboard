
/*'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

// Email validation RegEx
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default function SignIn() {
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    setIsEmailValid(validateEmail(email));
  };

  const handleRequestOtp = async () => {
    setIsRequesting(true);
    setOtp('');
    try {
      const res = await signIn('email', { email: userEmail, redirect: false });

      if (res?.error) {
        toast({
          title: 'Error',
          description: res?.error,
          variant: 'destructive',
        });
      } else {
        setOtpSent(true);
        toast({
          title: 'OTP Sent',
          description: 'Please check your email for the OTP code.',
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRequesting(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsRequesting(true);
    try {
      const res = await signIn('credentials', { email: userEmail, otp, redirect: false });

      if (res.error) {
        toast({
          title: 'Error',
          description: res?.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'OTP Verified',
          description: 'Redirecting...',
        });
        router.push('/'); // Redirect to home on successful sign-in
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRequesting(false);
    }
  };

  const renderAuthState = () => {
    if (otpSent) {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="border rounded-full p-2 flex items-center justify-center bg-muted my-3 animate-bounce">
            <Mail />
          </div>
          <h1 className="text-xl font-semibold text-center my-2">Email Authentication</h1>
          <h2 className="text-sm text-muted-foreground text-center">
            Please enter the 6-digit OTP sent to your email: {userEmail}
          </h2>

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            className="w-full"
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot key={index} index={index} className="w-12 h-12" />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <div className="flex items-center justify-center mt-2">
            <p className="text-xs text-muted-foreground">Didn't receive a code?</p>
            <Button variant="link" className="text-blue-500 text-sm ml-2" onClick={handleRequestOtp}>
              Resend
            </Button>
          </div>

          <Button
            className="w-full mt-4"
            disabled={otp.length < 6 || isRequesting}
            onClick={handleVerifyOtp}
          >
            {isRequesting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying OTP...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Continue
              </>
            )}
          </Button>
        </div>
      );
    } else {
      return (
        <>
          <div className="border rounded-full p-2 flex items-center justify-center bg-muted my-4">
            <Mail className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-semibold text-center my-4">Sign in with your Email</h1>
          <div className="w-full">
            <Input
              placeholder="example@gmail.com"
              value={userEmail}
              onChange={handleEmailChange}
              className="my-4 h-12"
            />
            <Button
              className="w-full"
              size="lg"
              disabled={isRequesting || !isEmailValid}
              onClick={handleRequestOtp}
            >
              {isRequesting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Requesting OTP...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Continue with Email
                </>
              )}
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="w-[95%] mx-auto md:w-[400px] p-4 rounded-xl bg-popover border flex flex-col items-center justify-center">
      {renderAuthState()}
    </div>
  );
}*/


















































//@ts-nocheck




// app/auth/signin/page.js
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Mail } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'




// Email validation RegEx
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
  
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [isRequesting, setisRequesting] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setIsEmailValid(validateEmail(email));
  };

///// 
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setisRequesting(true)
      const res = await signIn('credentials', { email, redirect: false });
      if (!res.ok)  {
         setError(res.error);
         setisRequesting(false)
         toast({
          title: 'Something went wrong',
          description: 'Please try again.',
          variant: 'destructive',
        });
         }
      else {
        setOtpSent(true);
        setisRequesting(false)
      }
       } catch (error) {
     setisRequesting(false)
     toast({
      title: 'Something went wrong',
      description: 'Please try again.',
      variant: 'destructive',
    });
    }
   
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setisRequesting(true)
    const res = await signIn('credentials', { email, otp, redirect: false });
    if (res.ok) {
      setisRequesting(false)
      // Redirect on successful sign-in
      window.location.replace('/');
    } else {
      setError(res.error);
      setisRequesting(false)
      toast({
        title: 'Something went wrong',
        description: 'Please try again.',
        variant: 'destructive',
      })
    }
  };



  return (
    <div  className='w-full min-h-screen flex items-center justify-center bg-zinc-100 dotted '>
      <div className='w-[95%] mx-auto md:w-[400px] p-4 rounded-xl bg-popover border flex flex-col items-center justify-center shadow-2xl shadow-zinc-500'>
        

        {! otpSent && (
       
      <>
      <div className="border rounded-full p-2 flex items-center justify-center bg-muted my-4">
            <Mail className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-semibold text-center my-4">Sign in with your Email</h1>
          </>
      )}
          <div className='w-full'>
      <form onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp} className='w-full'>
      {! otpSent &&  <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
          disabled={otpSent }
           className="my-4 h-12"
        />
      }
        
        {otpSent && (
          <div className="w-full flex items-center justify-center flex-col">
              <div className="border rounded-full p-2 flex items-center justify-center bg-muted my-3 animate-bounce">
            <Mail />
          </div>
          <h1 className="text-xl font-semibold text-center my-2">Email Authentication</h1>
          <h2 className="text-sm text-muted-foreground text-center">
            To continue, please enter the 6-digit verification code sent to your email: {email}
          </h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className='hidden'
          />

          <div className="my-4 w-full flex flex-col items-center justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="w-full"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-12" />
                <InputOTPSlot index={1} className="w-12 h-12" />
                <InputOTPSlot index={2} className="w-12 h-12" />
                <InputOTPSlot index={3} className="w-12 h-12" />
                <InputOTPSlot index={4} className="w-12 h-12" />
                <InputOTPSlot index={5} className="w-12 h-12" />
              </InputOTPGroup>
            </InputOTP>

            <div className="flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Didn't receive a code?</p>
              <Button type='button' variant="link" className="text-blue-500 text-sm" onClick={handleRequestOtp}>
                Resend
              </Button>
            </div>
          </div>
          </div>
        )}
      

        <Button
              className="w-full"
              size="lg"
              disabled={isRequesting || !isEmailValid || (otpSent && otp.length < 6)}
              type='submit'
            >
              {isRequesting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Requesting OTP...
                </>
              ) : otpSent  ? (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Verify otp
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Continue with Email
                </>
              ) }
            </Button>
      </form>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
}
