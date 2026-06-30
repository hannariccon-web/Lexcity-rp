# Lexcity RP - SA-MP Launcher

Um launcher moderno e elegante para o servidor SA-MP Lexcity RP, desenvolvido com Electron e React.

## 🚀 Características

- **Login com Autenticação**: Sistema seguro de autenticação com tokens JWT
- **Lista de Servidores**: Exibição em tempo real de servidores disponíveis
- **Launcher de Jogo**: Integração com SA-MP para lançar o jogo diretamente
- **Interface Moderna**: Design cyberpunk com gradientes e efeitos visuais
- **Gerenciamento de Perfil**: Salvamento automático de preferências
- **Verificação de Instalação**: Detecta se SA-MP está instalado

## 📋 Pré-requisitos

- Node.js 14+
- npm ou yarn
- GTA San Andreas com SA-MP instalado
- Git

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/hannariccon-web/Lexcity-rp.git
cd Lexcity-rp
```

2. **Instale as dependências**
```bash
npm install
```

3. **Crie um arquivo .env**
```bash
cp .env.example .env
```

4. **Configure as variáveis de ambiente**
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SAMP_PATH=C:\\Program Files\\GTA San Andreas\\gta_sa.exe
```

## 🚀 Usando o Launcher

### Modo Desenvolvimento

```bash
npm start
```

Isso abrirá a aplicação em modo desenvolvimento com React funcionando em http://localhost:3000 e Electron.

### Build para Produção

```bash
npm run build
```

Isso criará um executável no diretório `dist/`.

## 📁 Estrutura do Projeto

```
Lexcity-rp/
├── public/
│   └── index.html          # HTML principal
├── src/
│   ├── components/         # Componentes React
│   │   ├── ServerList.js
│   │   └── GameLauncher.js
│   ├── pages/              # Páginas principais
│   │   ├── LoginPage.js
│   │   └── LauncherPage.js
│   ├── services/           # Serviços (API, Auth)
│   │   ├── AuthService.js
│   │   └── ServerService.js
│   ├── styles/             # CSS dos componentes
│   ├── App.js              # Componente raiz
│   └── index.js            # Entrada React
├── main.js                 # Processo principal Electron
├── preload.js              # Script de preload Electron
├── package.json            # Dependências
└── README.md               # Este arquivo
```

## 🔐 Autenticação

O launcher usa JWT (JSON Web Tokens) para autenticação. Os tokens são armazenados localmente e enviados nas requisições.

### Fluxo de Login

1. Usuário insere email e senha
2. Requisição POST para `/api/auth/login`
3. Servidor retorna token JWT
4. Token é decodificado e armazenado
5. Usuário é redirecionado para o launcher

## 🎮 Lançando um Servidor

1. Selecione um servidor na lista
2. Digite seu nickname
3. Clique em "Entrar no Servidor"
4. O launcher lançará SA-MP automaticamente

## 🔌 API Backend

O launcher requer um backend que implemente os seguintes endpoints:

### Autenticação
- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/refresh` - Renovar token

### Servidores
- `GET /api/servers` - Lista todos os servidores
- `GET /api/servers/:id` - Informações de um servidor
- `GET /api/servers/status?ip=X&port=Y` - Status do servidor

## 🛠️ Desenvolvimento

### Adicionar um novo componente

1. Crie o componente em `src/components/`
2. Crie o CSS em `src/styles/`
3. Importe o componente onde necessário

### Adicionar um novo serviço

1. Crie o arquivo em `src/services/`
2. Implemente a classe com métodos necessários
3. Exporte a instância singleton

## 📦 Build e Distribuição

Para criar um instalável:

```bash
npm run build
```

Isso gera um arquivo executável em `dist/` que pode ser distribuído aos usuários.

## 🐛 Troubleshooting

### SA-MP não é detectado

Verifique se o caminho em `.env` está correto:
```env
REACT_APP_SAMP_PATH=C:\\Program Files\\GTA San Andreas\\gta_sa.exe
```

### Erro de conexão com a API

Certifique-se de que:
1. O servidor backend está rodando
2. A URL em `REACT_APP_API_URL` está correta
3. Não há problemas de CORS

### Token expirado

O launcher automaticamente trata tokens expirados. Faça login novamente se necessário.

## 📝 Licença

Este projeto é propriedade do servidor Lexcity RP.

## 👥 Contribuindo

Abra uma issue ou envie um pull request com melhorias.

## 📞 Suporte

Para problemas e dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para Lexcity RP**
