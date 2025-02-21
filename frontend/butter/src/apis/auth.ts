// 토큰 관리 함수 파일

export const getAccessToken = (): string | null => localStorage.getItem('accessToken')
export const setAccessToken = (token: string): void  => localStorage.setItem('accessToken', token)
export const removeAccessToken = (): void  => localStorage.removeItem('accessToken')