import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      if (response.data.token) {
        const decoded = this.decodeToken(response.data.token);
        return {
          success: true,
          token: response.data.token,
          user: {
            id: decoded.id,
            username: decoded.username || email.split('@')[0],
            email: decoded.email,
            ...decoded
          }
        };
      }

      return {
        success: false,
        message: 'Erro na autenticação'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao conectar com o servidor'
      };
    }
  }

  decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = this.decodeToken(token);
      if (decoded.exp) {
        return decoded.exp * 1000 > Date.now();
      }
      return true;
    } catch {
      return false;
    }
  }
}

export default new AuthService();
