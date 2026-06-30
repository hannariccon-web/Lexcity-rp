import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ServerService {
  async getServers() {
    try {
      const token = AuthService.getToken();
      const response = await axios.get(`${API_URL}/servers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data || this.getMockServers();
    } catch (error) {
      console.error('Erro ao buscar servidores:', error);
      return this.getMockServers();
    }
  }

  getMockServers() {
    return [
      {
        id: 1,
        name: 'Lexcity RP #1',
        ip: '192.168.1.1',
        port: 7777,
        players: 45,
        maxPlayers: 100,
        online: true,
        description: 'Servidor principal com gameplay completo'
      },
      {
        id: 2,
        name: 'Lexcity RP #2',
        ip: '192.168.1.2',
        port: 7778,
        players: 87,
        maxPlayers: 100,
        online: true,
        description: 'Servidor cheio - RP avançado'
      },
      {
        id: 3,
        name: 'Lexcity RP #3',
        ip: '192.168.1.3',
        port: 7779,
        players: 0,
        maxPlayers: 100,
        online: false,
        description: 'Servidor em manutenção'
      },
      {
        id: 4,
        name: 'Lexcity RP Test',
        ip: '192.168.1.4',
        port: 7780,
        players: 12,
        maxPlayers: 50,
        online: true,
        description: 'Servidor de testes e novos players'
      }
    ];
  }

  async getServerInfo(serverId) {
    try {
      const token = AuthService.getToken();
      const response = await axios.get(`${API_URL}/servers/${serverId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar info do servidor:', error);
      throw error;
    }
  }

  async checkServerStatus(ip, port) {
    try {
      const response = await axios.get(
        `${API_URL}/servers/status?ip=${ip}&port=${port}`,
        {
          timeout: 5000
        }
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao verificar status do servidor:', error);
      return { online: false };
    }
  }
}

export default new ServerService();
