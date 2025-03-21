import { useState } from "react";

function OtherWsPage() {
    const [isbn, setIsbn] = useState([]);
    const [city, setCity] = useState([]);

    const fetchBook = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/bookinfo/${isbn}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching book info:", error);
        }
    };
    
    const fetchWeather = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`http://localhost:5000/weather/${city}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching weather:", error);
        }
    };

    return (
        <div>
            <h1>Welcome to the Other Web Services</h1>
            <p>This is the page where you can access the other APIs.</p>

            <h2>Fetch Weather</h2>
            <form onSubmit={fetchWeather}>
                <input
                    type="text"
                    placeholder="Enter a city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Fetch Weather</button>
            </form>
            <form onSubmit={fetchBook}>
                <input type="text" placeholder="Enter an ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)}>
                </input>
                <button type="submit">Fetch Book</button>
            </form>

        </div>
        
    );
}

export default OtherWsPage;