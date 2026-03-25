const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const app = express();
// Render uses process.env.PORT, local uses 3000
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Route to serve your landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontpage.html'));
});

// Map your events to the Environment Variables you set in Render
const webhooks = {
    "Elite_Enigma": process.env.Elite_Enigma,
    "The_Management_Matrix": process.env.The_Management_Matrix,
    "Breaking_Brand": process.env.Breaking_Brand,
    "The_Boardroom": process.env.The_Boardroom,
    "Kephalaio_Nexus": process.env.Kephalaio_Nexus,
    "Handes_Of_Heaven": process.env.Handes_Of_Heaven,
    "Lens_Of_Patterns": process.env.Lens_Of_Patterns,
    "Boss_Mode_The_Peaky_Venture": process.env.Boss_Mode_The_Peaky_Venture,
    "Reel_Royale": process.env.Reel_Royale,
    "The_Directors_Deck": process.env.The_Directors_Deck,
    "Variants_Got_Talent": process.env.Variants_Got_Talent,
    "Face_Of_Derry": process.env.Face_Of_Derry,
    "Episodes_Of_Echos": process.env.Episodes_Of_Echos,
    "Bokolly_E_Youkoso": process.env.Bokolly_E_Youkoso,
    "Over_All_Events": process.env.Over_All_Events
};

// The Registration Route
app.post('/register', async (req, res) => {
    try {
        const { username, user_email, phone, event_name, team_name } = req.body;
        
        // Find the correct Discord Webhook based on the event name
        const targetWebhook = webhooks[event_name];

        if (targetWebhook) {
            // Send formatted data to Discord
            await axios.post(targetWebhook, {
                content: `🚀 **New Registration Received!**\n\n**Event:** ${event_name}\n**Name:** ${username}\n**Email:** ${user_email}\n**Phone:** ${phone}\n**Team:** ${team_name || "Solo"}`
            });
            
            // Redirect to your custom success.html file
            res.redirect('/success.html');
        } else {
            console.error("Webhook not found for event:", event_name);
            res.status(404).send("Event webhook configuration missing.");
        }

    } catch (error) {
        console.error("Discord Error:", error.message);
        res.status(500).send("Server Error: Could not send registration.");
    }
});
// This line tells the app: Use Render's port, or 3000 if running on my laptop
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});