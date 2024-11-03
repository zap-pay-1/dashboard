
"use client"

//= middleware/authMiddleware.js

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserContext } from '../providers/user-context';
import Link from 'next/link';


const withAuth = (WrappedComponent) => {
    const ComponentWithAuth = (props) => {
        const { userProfile } = useUserContext();
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('kbg4_accessToken');
            if (!userProfile  && ! token) {
                router.push('/login');
            }
        }, [userProfile, router]);

        if (!userProfile) {
            return (
                 <div className='w-full h-screen bg-red-700 flex items-center justify-center'>
                    <div className='bg-yellow-500 w-screen h-screen'>
                     <Link className='bg-purple-500' href={`/login`}>Login</Link>
                     </div>
                 </div>
            ) // Render a loading spinner or nothing while redirecting
        }

        return <WrappedComponent {...props} />;
    };

    // Set the display name for easier debugging
    ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default withAuth;

/*import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUserContext } from '../providers/user-context';

const withAuth = (WrappedComponent) => {
    const ComponentWithAuth = (props) => {
        const { userProfile } = useUserContext();
        const router = useRouter();
        const [loading, setLoading] = useState(true);  // Track loading state

        useEffect(() => {
            const token = localStorage.getItem('kbg4_accessToken');
            
            // If there is no user profile and no token, redirect to login
            if (!userProfile && !token) {
                router.push('/login');
            } else {
                // If userProfile is available or a valid token exists, set loading to false
                setLoading(false);
            }
        }, [userProfile, router]);

        // Render loading state while determining the auth status
        if (loading) {
            return <div>redirecting...</div>;  // Or any loading spinner
        }

        return <WrappedComponent {...props} />;
    };

    // Set the display name for easier debugging
    ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default withAuth;*/






