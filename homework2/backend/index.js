const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import CORS

const server = express();
const port = 5000;

server.use(cors());
server.use(express.json());


server.get("/libraries", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4000/libraries");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data from web service" });
    }
});
server.get("/authors", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4000/authors")
        res.json(response.data)
    }
    catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data from web service" });
    }
})

server.get("/books", async (req, res) => {
    try {
        const response = await axios.get("http://localhost:4000/books")
        res.json(response.data)
    }
    catch (error) {
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
    try {
        const response = await axios.get(`http://localhost:4000/libraries/${req.params.id}`)
        res.json(response.data)
    }
    catch (error) {
        console.error('Error fetching library:', error);
        res.status(404).json({ error: 'Library not found' });
    }
})

server.post('/libraries', async (req, res) => {
    try {
        const { name, address } = req.body;

        if (!name || !address) {
            return res.status(400).json({ error: "Name and address are required" });
        }

        const response = await axios.post("http://localhost:4000/libraries", { name, address });

        res.status(201).json(response.data);
    } catch (error) {
        console.error("Error posting library:", error);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

server.post('/authors', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" })
        }
        const response = await axios.post(`http://localhost:4000/authors`, { name });
        res.status(201).json(response.data);
    }
    catch (error) {
        console.error("Error posting author:", error);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
})

server.post('/books', async (req, res) => {
    try {
        const { lib_id, name, genre, author_names } = req.body;

        if (!lib_id || !name || !genre || !author_names) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const response = await axios.post("http://localhost:4000/books", {
            lib_id,
            name,
            genre,
            author_names
        });

        res.status(201).json(response.data);
    } catch (error) {
        console.error("Error posting book:", error);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

server.delete('/books/:id', async (req, res) => {
    try {
        const response = await axios.delete(`http://localhost:4000/books/${req.params.id}`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Error deleting book:', error);
        res.status(404).json({ error: 'Book not found' });
    }
})

server.delete('/libraries/:id', async (req, res) => {
    try {
        const response = await axios.delete(`http://localhost:4000/libraries/${req.params.id}`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Error deleting library:', error);
        res.status(404).json({ error: 'Library not found' });
    }
})

server.delete('/authors/:id', async (req, res) => {
    try {
        const response = await axios.delete(`http://localhost:4000/authors/${req.params.id}`);
        res.json(response.data);
    }
    catch (error) {
        console.error('Error deleting author', error);
        res.status(404).json({ error: 'Author not found' });
    }
})

server.put('/authors/:id', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const response = await axios.put(`http://localhost:4000/authors/${req.params.id}`, { name });
        res.json(response.data);
    } catch (error) {
        console.error("Error updating author:", error);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

server.put('/books/:id', async (req, res) => {
    try {
        const { name, genre } = req.body;
        if (!name || !genre) {
            return res.status(400).json({ error: "Both name and genre are required" });
        }

        const response = await axios.put(`http://localhost:4000/books/${req.params.id}`, { name, genre });
        res.json(response.data);
    } catch (error) {
        console.error("Error updating book:", error);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

server.put('/libraries/:id', async (req, res) => {
    try {
        const { name, address } = req.body;
        if (!name || !address) {
            return res.status(400).json({ error: "Both name and address are required" });
        }

        const response = await axios.put(`http://localhost:4000/libraries/${req.params.id}`, { name, address });
        res.json(response.data);
    } catch (error) {
        console.error("Error updating library:", error);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

server.get("/bookinfo/:isbn", async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);

        const bookData = response.data[`ISBN:${isbn}`];
        if (!bookData) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.json({
            title: bookData.title,
            authors: bookData.authors ? bookData.authors.map(a => a.name) : [],
            description: bookData.excerpts ? bookData.excerpts[0].text : "No description available"
        });
    } catch (error) {
        console.error("Error fetching book info:", error);
        res.status(500).json({ error: "Failed to fetch book information" });
    }
});

server.get("/weather/:city", async (req, res) => {
    try {
        const city = req.params.city;
        const response = await axios.get(`https://wttr.in/${city}?format=%C+%t`);
        
        res.json({ city, weather: response.data });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to fetch weather information" });
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
