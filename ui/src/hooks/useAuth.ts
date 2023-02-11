import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { LocalAuthResponseDto, LoginDto } from '../types';
import { useHttpClient } from './useHttpClient';

export function useLogout() {
  const navigate = useNavigate();
  return useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);
}

export function useLogin() {
  const httpClient = useHttpClient();
  return useMutation(async (payload: LoginDto) => {
    const { data } = await httpClient.post<LocalAuthResponseDto>(
      `/auth/login`,
      payload
    );
    return data;
  });
}

export function useUpdatePassword() {
  const httpClient = useHttpClient();
  return useMutation(async (payload: { password: string }) => {
    const { data } = await httpClient.put<LocalAuthResponseDto>(
      `/auth/change-password`,
      payload
    );
    return data;
  });
}
