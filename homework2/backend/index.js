const express = require("express");
const axios = require("axios");
const server = express();
const port = 3000;

server.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/authors');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Return an appropriate error status code and message
        res.status(500).json({ error: 'Failed to fetch data from web service' });
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
