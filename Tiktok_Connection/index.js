const { WebcastPushConnection } = require('tiktok-live-connector');
const { Rcon } = require('rcon-client'); // Calling RCON client from the rcon-client package

// TikTok Configuration
let tiktokUser = "debaleta";
let TikTokOptions = {
    requestOptions: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Cookie': 'sessionid=TEST; tt-target-idc=TEST;'
        }
    }
};
let tiktokLiveConnection = new WebcastPushConnection(tiktokUser, TikTokOptions);

// Minecraft RCON Configuration
const rcon = new Rcon({
    host: "127.0.0.1", // localhost IP
    port: 25575,       // RCON port (default is 25575)
    password: "TEST" // server.properties password
});

// Principal function
async function startEverything() {
    try {
        // Connection to Minecraft RCON
        await rcon.connect();
        console.log("🟢 Minecraft RCON connection successful!");

        // Connection to TikTok Live
        await tiktokLiveConnection.connect();
        console.log(`🟢 Connected to ${tiktokUser}'s live stream successfully!`);

        // When a chat message is received, we send it to Minecraft
        tiktokLiveConnection.on('chat', async (data) => {
            console.log(`💬 ${data.uniqueId}: ${data.comment}`);

            // Clean the comment to avoid issues with Minecraft commands (like quotes)
            let cleanComment = data.comment.replace(/"/g, '');

            // Build the command to send to Minecraft. We use the actionbar to show the message at the top of the health bar.
            let command = `title @a actionbar {"text":"[TikTok] ${data.uniqueId}: ${cleanComment}", "color":"yellow"}`;

            // Send the command to Minecraft!
            await rcon.send(command);
        });

    } catch (error) {
        console.error("🔴 An error occurred:", error);
    }
}

// Start the program
startEverything();