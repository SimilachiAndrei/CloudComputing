const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import CORS

const server = express();
const port = 5000;

server.use(cors()); // Enable CORS for all routes

server.get("/libraries", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4000/libraries");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data from web service" });
    }
});
server.get("/authors", async(req, res) => {
    try{
        const response = await axios.get("http://localhost:4000/authors")
        res.json(response.data)
    }
    catch(error){
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data from web service" });
    }
})

server.get("/books", async(req, res) => {
    try{
        const response = await axios.get("http://localhost:4000/books")
        res.json(response.data)
    }
    catch(error){
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data from web service" });
    }
})

server.get('/authors/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:4000/authors/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching author:', error);
        res.status(404).json({ error: 'Author not found' });
    }
});

server.get('/books/:id', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:4000/books/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(404).json({ error: 'Book not found' });
    }
});

server.get('/libraries/:id', async (req, res) => {
    try{
        const response = await axios.get(`http://localhost:4000/libraries/${req.params.id}`)
        res.json(response.data)
    }
    catch (error) {
        console.error('Error fetching book:', error);
        res.status(404).json({ error: 'Book not found' });
    }
})


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
