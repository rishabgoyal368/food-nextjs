import { auth } from '@/app/auth';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react'

function useAuth() {
    const [authDetails, setAuthDetails ] = useState({});
    const checkAuth = async () => {
        const isAuth = await getSession();
        console.log('auth', isAuth);
        setAuthDetails(isAuth)
        return auth;
    }

    useEffect(() => {
        checkAuth()
    }, [])

  return {
    'authDetails': authDetails
  }
}

export default useAuth