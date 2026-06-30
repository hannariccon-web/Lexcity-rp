import React, { useState, useEffect } from 'react';
import '../styles/GameLauncher.css';

function GameLauncher({ server, user }) {
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [sampInstalled, setSampInstalled] = useState(true);

  useEffect(() => {
    checkSampInstallation();
    const savedNickname = localStorage.getItem('lastNickname');
    if (savedNickname) {
      setNickname(savedNickname);
    }
  }, []);

  const checkSampInstallation = async () => {
    try {
      if (window.electron && window.electron.checkSampInstall) {
        const result = await window.electron.checkSampInstall();
        setSampInstalled(result.installed);
      }
    } catch (error) {
      console.error('Erro ao verificar SA-MP:', error);
    }
  };

  const handleLaunchGame = async (e) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setMessage({ type: 'error', text: 'Digite um nickname' });
      return;
    }

    if (!sampInstalled) {
      setMessage({
        type: 'error',
        text: 'SA-MP não está instalado. Instale antes de continuar.'
      });
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      localStorage.setItem('lastNickname', nickname);

      if (window.electron && window.electron.launchGame) {
        const result = await window.electron.launchGame({
          serverIp: server.ip,
          serverPort: server.port,
          nickname: nickname,
          password: ''
        });

        if (result.success) {
          setMessage({
            type: 'success',
            text: 'Jogo lançado com sucesso!'
          });
        } else {
          setMessage({
            type: 'error',
            text: result.error || 'Erro ao lançar o jogo'
          });
        }
      } else {
        setMessage({
          type: 'success',
          text: `Modo desenvolvimento: Lançaria o jogo no servidor ${server.name} com nickname ${nickname}`
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro ao lançar o jogo: ' + error.message
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="launcher-form">
      <div className="server-details">
        <h2>{server.name}</h2>
        <div className="details-row">
          <span>IP/Porta:</span>
          <span className="value">{server.ip}:{server.port}</span>
        </div>
        <div className="details-row">
          <span>Jogadores:</span>
          <span className="value">{server.players}/{server.maxPlayers}</span>
        </div>
        <div className="details-row">
          <span>Status:</span>
          <span className={`value ${server.online ? 'online' : 'offline'}`}>
            {server.online ? '🟢 Online' : '🔴 Offline'}
          </span>
        </div>
        {server.description && (
          <div className="details-row">
            <span>Descrição:</span>
            <span className="value">{server.description}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleLaunchGame} className="form">
        <div className="form-group">
          <label htmlFor="nickname">Seu Nickname</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Digite seu nickname"
            maxLength="20"
            disabled={loading || !sampInstalled}
          />
        </div>

        {!sampInstalled && (
          <div className="warning">
            ⚠️ SA-MP não detectado. Instale antes de continuar.
          </div>
        )}

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          className="launch-btn"
          disabled={loading || !server.online || !sampInstalled}
        >
          {loading ? '⏳ Lançando...' : '▶️ Entrar no Servidor'}
        </button>

        <div className="launcher-info">
          <p>Certifique-se de ter SA-MP instalado em seu computador</p>
          <p>Versão mínima recomendada: 0.3.7</p>
        </div>
      </form>
    </div>
  );
}

export default GameLauncher;
