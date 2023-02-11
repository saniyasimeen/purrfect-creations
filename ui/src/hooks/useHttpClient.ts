import axios from 'axios';
import { useMemo } from 'react';
import { useLogout } from './useAuth';

export function useHttpClient() {
  const logout = useLogout();
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api/`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const responseSuccess = (response: any) => response;
  const responseError = (error: any) => {
    const { status } = JSON.parse(JSON.stringify(error));
    if (status === 401) {
      logout();
    }
    return Promise.reject(error);
  };

  return useMemo(() => {
    axiosInstance.interceptors.response.use(responseSuccess, responseError);
    return axiosInstance;
  }, [axiosInstance, responseSuccess, responseError]);
}
