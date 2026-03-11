# Minecraft x TikTok Project

An innovative integration that connects your TikTok Live stream with a Minecraft server, allowing viewers to see their chat messages displayed in-game!

## 📋 Project Overview

This project consists of two main components:

1. **Server_MC/** - A Paper Minecraft server (version 1.21.11) running on Java
2. **Tiktok_Connection/** - A Node.js application that bridges TikTok Live chat and Minecraft RCON

When someone sends a message in your TikTok Live stream, it automatically appears in the Minecraft game as an action bar message (yellow text above the health bar).

## 🎯 Features

- **Real-time TikTok Integration**: Listen to live chat messages from TikTok
- **In-game Display**: Messages appear as action bar titles in Minecraft
- **Remote Console (RCON)**: Secure communication with the Minecraft server
- **Automatic Message Cleaning**: Removes special characters (quotes) to prevent command issues
- **Error Handling**: Graceful error management with console feedback

## 📁 Project Structure

```
MinecraftxTikTok_Project/
├── Server_MC/                 # Paper Minecraft Server
│   ├── server.properties      # Server configuration
│   ├── bukkit.yml            # Bukkit configuration
│   ├── spigot.yml            # Spigot configuration
│   ├── paper-global.yml       # Paper global settings
│   ├── config/               # Configuration files
│   ├── plugins/              # Server plugins
│   ├── world/                # Main world data
│   ├── world_nether/         # Nether dimension
│   ├── world_the_end/        # End dimension
│   ├── libraries/            # Required Java libraries
│   └── logs/                 # Server logs
└── Tiktok_Connection/         # Node.js Connection Module
    ├── index.js              # Main application code
    ├── package.json          # Project dependencies
    └── node_modules/         # Installed npm packages
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **Java** (v21+ recommended for Paper 1.21.11)
- **npm** (comes with Node.js)
- A **running Minecraft server** with RCON enabled
- A **TikTok account** and active live stream

### Installation

#### 1. Set up the Minecraft Server

1. Navigate to the `Server_MC/` directory
2. Ensure you have Java installed (`java -version`)
3. Start the server using the appropriate launcher for your Paper version
4. Verify RCON is enabled in `server.properties`:
   ```properties
   enable-rcon=true
   rcon.port=25575
   rcon.password=YOUR_SERVER_PASSWORD
   ```

#### 2. Set up the TikTok Connection Module

1. Navigate to the `Tiktok_Connection/` directory:

   ```bash
   cd Tiktok_Connection
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the connection settings in `index.js`:

   ```javascript
   let tiktokUser = "your_tiktok_username"; // Change this to your TikTok username

   // Update RCON credentials to match your server
   const rcon = new Rcon({
     host: "127.0.0.1", // Change if server is remote
     port: 25575, // Match rcon.port from server.properties
     password: "YOUR_PASSWORD", // Match rcon.password from server.properties
   });
   ```

4. Start the connection:
   ```bash
   npm start
   ```
   or
   ```bash
   node index.js
   ```

## ⚙️ Configuration

### TikTok Connection Settings

Edit `Tiktok_Connection/index.js`:

- **`tiktokUser`**: The TikTok username whose live stream to monitor
- **`TikTokOptions`**: Headers and cookies for TikTok connection (may need updates if TikTok changes API)

### Minecraft RCON Settings

Edit `Tiktok_Connection/index.js`:

- **`host`**: Minecraft server IP (use `127.0.0.1` for localhost, your server IP for remote)
- **`port`**: RCON port (default: 25575)
- **`password`**: RCON password from `server.properties`

### Server Configuration

Edit `Server_MC/server.properties`:

- **`enable-rcon`**: Must be `true`
- **`rcon.port`**: RCON listening port (default: 25575)
- **`rcon.password`**: Secure password for RCON access
- **`max-players`**: Maximum concurrent players (default: 20)
- **`difficulty`**: Game difficulty level (currently: easy)
- **`gamemode`**: Game mode (currently: survival)

## 🔧 How It Works

1. **Initialization**: The Node.js app connects to both the Minecraft server (via RCON) and the TikTok live stream
2. **Chat Reception**: Messages from TikTok live chat are captured in real-time
3. **Message Processing**: Messages are cleaned of problematic characters (quotes removed)
4. **Command Building**: A Minecraft title command is constructed:
   ```
   title @a actionbar {"text":"[TikTok] username: message", "color":"yellow"}
   ```
5. **Execution**: The command is sent to the Minecraft server via RCON
6. **Display**: All players in the game see the message as yellow text above their health bar

## 📊 Minecraft Server Details

- **Version**: Paper 1.21.11
- **Gamemode**: Survival
- **Difficulty**: Easy
- **Max Players**: 20
- **RCON**: Enabled (port 25575)
- **Worlds**:
  - Overworld (`world/`)
  - Nether (`world_nether/`)
  - The End (`world_the_end/`)

## 📦 Dependencies

### Node.js (Tiktok_Connection)

- **`tiktok-live-connector`** ^2.1.1-beta1 - TikTok Live stream connection
- **`rcon-client`** ^4.2.5 - Minecraft RCON client

### Minecraft Server

- **Paper 1.21.11** - High-performance Minecraft server implementation
- Java 21+ runtime

## 🎮 Usage Example

Once everything is configured and running:

1. Start the Minecraft server
2. Players join the game
3. Start your TikTok live stream
4. Run `node index.js` in the Tiktok_Connection directory
5. When you go live on TikTok, messages from live chat will appear in-game:

   ```
   [TikTok] viewer_username: Great stream!
   ```

## ⚠️ Troubleshooting

### RCON Connection Failed

- Ensure `enable-rcon=true` in `server.properties`
- Verify the RCON password matches
- Check that RCON port (25575) is not blocked by firewall
- Ensure the server is fully started

### TikTok Connection Failed

- Verify the TikTok username is correct
- Check internet connection
- TikTok may require updated headers/cookies (see User-Agent in code)
- Ensure the live stream is actually active

### Messages Not Appearing

- Check Minecraft server logs for RCON errors
- Verify all players have message feedback enabled
- Ensure the title bar is not being suppressed by other plugins

## 🔐 Security Notes

- **Never commit** `index.js` with real passwords to version control
- Consider using **environment variables** for sensitive data
- The RCON password is sensitive - use a strong password
- Update TikTok headers regularly if connection fails (TikTok changes API)

## 🚦 Status Indicators

The console output will show:

- 🟢 **Green circle** - Successful connection
- 💬 **Chat bubble** - Message received from TikTok
- 🔴 **Red circle** - Error occurred

## 📝 License

ISC License

## 👨‍💻 Author

danielDEBIAN

## 🔗 Related Technologies

- [Paper Minecraft Server](https://papermc.io/)
- [TikTok Live Connector](https://www.npmjs.com/package/tiktok-live-connector)
- [RCON Client](https://www.npmjs.com/package/rcon-client)
- [Minecraft RCON Protocol](https://wiki.vg/RCON)

---

**Enjoy connecting your TikTok Live stream with Minecraft!** 🎮🎬
