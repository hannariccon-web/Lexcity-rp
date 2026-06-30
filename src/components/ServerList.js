import React from 'react';
import '../styles/ServerList.css';

function ServerList({ servers, selectedServer, onSelectServer }) {
  return (
    <div className="server-list">
      {servers.map((server) => (
        <div
          key={server.id}
          className={`server-item ${selectedServer?.id === server.id ? 'active' : ''}`}
          onClick={() => onSelectServer(server)}
        >
          <div className="server-info">
            <h3>{server.name}</h3>
            <p className="server-ip">{server.ip}:{server.port}</p>
            <div className="server-stats">
              <span className="players">
                👥 {server.players}/{server.maxPlayers}
              </span>
              <span className={`status ${server.online ? 'online' : 'offline'}`}>
                {server.online ? '🟢 Online' : '🔴 Offline'}
              </span>
            </div>
            {server.description && (
              <p className="server-desc">{server.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServerList;
