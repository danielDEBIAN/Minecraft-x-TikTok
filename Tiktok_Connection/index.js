const { WebcastPushConnection } = require('tiktok-live-connector');
const { Rcon } = require('rcon-client'); // Calling RCON client from the rcon-client package

// TikTok Configuration
let tiktokUser = "debaleta";
let TikTokOptions = {
    requestOptions: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Cookie': 'sessionid=e8b8c87badba9518fee3c4e91a7d0f02; tt-target-idc=alisg;'
        }
    }
};
let tiktokLiveConnection = new WebcastPushConnection(tiktokUser, TikTokOptions);

// Minecraft RCON Configuration
const rcon = new Rcon({
    host: "127.0.0.1", // localhost IP
    port: 25575,       // RCON port (default is 25575)
    password: "tiktokMC" // server.properties password
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

        // When someone sends a gift, we can react to it in Minecraft
        tiktokLiveConnection.on('gift', async (data) => {
            // TikTok sends gifts in combos
            // This trigger will be called once per gift
            if (data.giftType === 1 && !data.repeatEnd) {
                return;
            }

            console.log(`🎁 ${data.uniqueId} envió un regalo: ${data.giftName} (x${data.repeatCount})`);

            // Show on screen gift and sender
            let msgGift = `title @a title {"text":"¡${data.uniqueId} envió ${data.giftName}!","color":"light_purple"}`;
            await rcon.send(msgGift);

            // GIFT CONFIGURATION

            // ROSE
            if (data.giftName === "Rose") {
                // Diamond for each rose in the combo
                await rcon.send(`give @a diamond ${data.repeatCount}`);
            }

            // ROSE
            if (data.giftName === "Maracas") {
                // Diamond for each maracas in the combo
                await rcon.send(`give @a diamond ${data.repeatCount}`);
            }

            // If you're awesome
            else if (data.giftName === "You're awesome") {
                // Cat appears
                await rcon.send(`execute at @a run summon cat ~ ~1 ~ {CustomName:"\\"Bilbo\\"",CustomNameVisible:1}`);
            }

            // IF GG
            else if (data.giftName === "GG") {
                // Invoca un Creeper a tus espaldas
                await rcon.send(`execute at @a run summon creeper ~-2 ~ ~`);
            }
        });

    } catch (error) {
        console.error("🔴 An error occurred:", error);
    }
}

// Start the program
startEverything();