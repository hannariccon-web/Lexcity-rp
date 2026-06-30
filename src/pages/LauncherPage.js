import React, { useState, useEffect } from 'react';
import '../styles/LauncherPage.css';
import ServerList from '../components/ServerList';
import GameLauncher from '../components/GameLauncher';
import ServerService from '../services/ServerService';

function LauncherPage({ user, onLogout }) {
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      setLoading(true);
      const data = await ServerService.getServers();
      setServers(data);
      if (data.length > 0) {
        setSelectedServer(data[0]);
      }
    } catch (err) {
      setError('Erro ao carregar servidores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="launcher-container">
      <header className="launcher-header">
        <div className="header-left">
          <h1>Lexcity RP</h1>
          <p>Bem-vindo, {user.username}</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Sair
        </button>
      </header>

      <div className="launcher-content">
        <div className="servers-panel">
          <h2>Servidores Disponíveis</h2>
          {loading ? (
            <div className="loading-text">Carregando servidores...</div>
          ) : error ? (
            <div className="error-text">{error}</div>
          ) : (
            <ServerList
              servers={servers}
              selectedServer={selectedServer}
              onSelectServer={setSelectedServer}
            />
          )}
        </div>

        <div className="launcher-panel">
          {selectedServer ? (
            <GameLauncher server={selectedServer} user={user} />
          ) : (
            <div className="no-server">
              Selecione um servidor para continuar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LauncherPage;
