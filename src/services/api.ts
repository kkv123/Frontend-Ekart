import axios from 'axios';
// ...existing code...
const API_BASE_URL = 'https://ekart-book-store.onrender.com';

// helper to set/remove default header
export const setAuthToken = (token?: string) => {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete axios.defaults.headers.common['Authorization'];
};

export const login = async (username: string, password: string, email?: string) => {
  try {
    const payload: Record<string, any> = { username, password };
    if (email) payload.email = email;

    const response = await axios.post(`${API_BASE_URL}/e-kart/user/login`, payload);
    const data = response.data;

    // support different token property names
    const token = data?.token || data?.authToken || data?.accessToken;
    if (token) {
      localStorage.setItem('authToken', token);
      setAuthToken(token);
    }
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || `Error logging in: ${error}`);
  }
};

export const initializeAuth = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthToken(token);
  }
};

export const getProducts = async () => {
  try {
    // axios default header will already include Authorization if set
    const response = await axios.get(`${API_BASE_URL}/e-kart/products/all`);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || `Error fetching products: ${error}`);
  }
};
// ...existing code...