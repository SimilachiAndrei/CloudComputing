import { useState } from "react";


function LibraryPage() {

    const [libraries, setLibraries] = useState([])
    const [authors, setAuthors] = useState([])
    const [books, setBooks] = useState([])
    const [singleItem, setSingleItem] = useState(null);

    const [resourceName, setResourceName] = useState("");
    const [resourceId, setResourceId] = useState("");


    const fetchAll = async (resource) => {
        try {
            const response = await fetch(`http://localhost:5000/${resource}`);
            const data = await response.json();
            if (resource == "libraries") setLibraries(data);
            else if (resource == "books") setBooks(data)
            else setAuthors(data)
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    const fetchOne = async (e) => {
        e.preventDefault();
        if (!resourceName || !resourceId) {
            alert("Please enter a resource name and ID.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/${resourceName}/${resourceId}`);
            const data = await response.json();
            setSingleItem(data);
        } catch (error) {
            console.error("Error fetching single item:", error);
        }
    };


    return (
        <div>
            <h1>Welcome to the Library Page</h1>
            <p>This is the page where you can access the library API.</p>
            <button onClick={() => fetchAll("libraries")}>
                Fetch Libraries
            </button>

            {libraries.map((library, index) => (
                <ul key={`library-${library.id || index}`}>
                    {library.name}:
                    <li key={`library-id-${library.id || index}`}>
                        ID: {library.id}
                    </li>
                    <li key={`library-address-${library.id || index}`}>
                        Address: {library.address}
                    </li>
                </ul>
            ))}

            <br></br>
            <button onClick={() => fetchAll("authors")}>
                Fetch Authors
            </button>
            {authors.map((author, index) => (
                <ul key={`author-${author.id || index}`}>
                    {author.name}:
                    <li key={`author-id-${author.id || index}`}>
                        ID: {author.id}
                    </li>
                </ul>
            ))}


            <button onClick={() => fetchAll("books")}>
                Fetch Books
            </button>
            {books.map((book, index) => (
                <ul key={`book-${book.id || index}`}>
                    {book.name}:
                    <li key={`book-id-${book.id || index}`}>
                        ID: {book.id}
                    </li>
                    <li key={`book-lib_id-${book.lib_id || index}`}>
                        LIB_ID: {book.lib_id}
                    </li>
                    <li key={`book-genre-${book.id || index}`}>
                        Genre: {book.genre}
                    </li>
                    <li key={`book-authors-${book.id || index}`}>
                        Authors: {book.authors}
                    </li>
                </ul>
            ))}

            <h2>Fetch a Specific Resource</h2>
            <form onSubmit={fetchOne}>
                <input
                    type="text"
                    placeholder="Enter resource (e.g., books)"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter ID"
                    value={resourceId}
                    onChange={(e) => setResourceId(e.target.value)}
                />
                <button type="submit">Fetch One</button>
            </form>

            {singleItem && (
                <div>
                    <h3>Fetched Item:</h3>
                    <pre>{JSON.stringify(singleItem, null, 2)}</pre>
                </div>
            )}



        </div>
    );
}

export default LibraryPage;
