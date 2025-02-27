import { jwtDecode } from 'jwt-decode'

export const verifyToken = (token: string | null | undefined) => {
  if (!token) {
    throw new Error('Invalid token: token is null or undefined')
  }

  try {
    return jwtDecode(token)
  } catch (error) {
    console.error('Error decoding token:', error)
    throw new Error('Invalid token format')
  }
}
