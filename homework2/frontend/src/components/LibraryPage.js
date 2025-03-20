import { useState } from "react";

function LibraryPage() {
    const [libraries, setLibraries] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [books, setBooks] = useState([]);
    const [singleItem, setSingleItem] = useState(null);
    const [postData, setPostData] = useState({});
    const [putData, setPutData] = useState({});
    const [deleteData, setDeleteData] = useState({})
    const [resourceName, setResourceName] = useState("");
    const [resourceId, setResourceId] = useState("");
    const [selectedResource, setSelectedResource] = useState("libraries");

    const fetchAll = async (resource) => {
        try {
            const response = await fetch(`http://localhost:5000/${resource}`);
            const data = await response.json();
            if (resource === "libraries") setLibraries(data);
            else if (resource === "books") setBooks(data);
            else setAuthors(data);
        } catch (error) {
            console.error(`Error fetching ${resource}:`, error);
        }
    };

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

    const fetchPost = async (e) => {
        e.preventDefault();

        if (Object.keys(postData).length === 0) {
            alert("Please enter data to be posted!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/${selectedResource}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            alert(`${selectedResource} posted successfully!`);
            console.log("Success:", data);
        } catch (error) {
            console.error("Error posting data:", error);
            alert("Failed to post data.");
        }
    };

    const fetchPut = async (e) => {
        e.preventDefault();
    
        if (!putData.id || Object.keys(putData).length === 1) {
            alert("Please enter data to be updated!");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/${selectedResource}/${putData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(putData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            alert(`${selectedResource} updated successfully!`);
            console.log("Success:", data);
        } catch (error) {
            console.error("Error updating data:", error);
            alert("Failed to update data.");
        }
    };
    

    const fetchDelete = async (e) => {
        e.preventDefault();
    
        if (!deleteData.id) {
            alert("Please enter a valid ID to delete!");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/${selectedResource}/${deleteData.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            alert(`${selectedResource} with ID ${deleteData.id} deleted successfully!`);
            console.log("Deleted successfully");            
        } catch (error) {
            console.error("Error deleting data:", error);
            alert("Failed to delete data.");
        }
    };
    

    return (
        <div>
            <h1>Welcome to the Library Page</h1>
            <p>Access the library API here.</p>

            <button onClick={() => fetchAll("libraries")}>Fetch Libraries</button>
            <button onClick={() => fetchAll("authors")}>Fetch Authors</button>
            <button onClick={() => fetchAll("books")}>Fetch Books</button>

            {libraries.map((library) => (
                <ul key={library.id}>
                    <li><strong>{library.name}</strong></li>
                    <li>ID: {library.id}</li>
                    <li>Address: {library.address}</li>
                </ul>
            ))}

            {authors.map((author) => (
                <ul key={author.id}>
                    <li><strong>{author.name}</strong></li>
                    <li>ID: {author.id}</li>
                </ul>
            ))}

            {books.map((book) => (
                <ul key={book.id}>
                    <li><strong>{book.name}</strong></li>
                    <li>ID: {book.id}</li>
                    <li>Genre: {book.genre}</li>
                    <li>Authors: {book.authors?.join(", ")}</li>
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

            <h2>Post a Specific Resource</h2>
            <div>
                <label>
                    <input type="radio" name="resource" value="libraries" checked={selectedResource === "libraries"} onChange={(e) => setSelectedResource(e.target.value)} />
                    Libraries
                </label>
                <label>
                    <input type="radio" name="resource" value="authors" checked={selectedResource === "authors"} onChange={(e) => setSelectedResource(e.target.value)} />
                    Authors
                </label>
                <label>
                    <input type="radio" name="resource" value="books" checked={selectedResource === "books"} onChange={(e) => setSelectedResource(e.target.value)} />
                    Books
                </label>
            </div>

            <form onSubmit={fetchPost}>
                {selectedResource === "libraries" && (
                    <>
                        <input type="text" name="name" placeholder="Library Name" onChange={(e) => setPostData({ ...postData, name: e.target.value })} required />
                        <input type="text" name="address" placeholder="Library Address" onChange={(e) => setPostData({ ...postData, address: e.target.value })} required />
                    </>
                )}

                {selectedResource === "authors" && (
                    <>
                        <input type="text" name="name" placeholder="Author Name" onChange={(e) => setPostData({ ...postData, name: e.target.value })} required />
                    </>
                )}

                {selectedResource === "books" && (
                    <>
                        <input type="text" name="lib_id" placeholder="Library Id"
                            onChange={(e) => setPostData({ ...postData, lib_id: e.target.value })} required />

                        <input type="text" name="name" placeholder="Book Name"
                            onChange={(e) => setPostData({ ...postData, name: e.target.value })} required />

                        <input type="text" name="genre" placeholder="Book Genre"
                            onChange={(e) => setPostData({ ...postData, genre: e.target.value })} required />

                        <input type="text" name="author_names" placeholder="Book Authors (comma-separated)"
                            onChange={(e) => setPostData({ ...postData, author_names: e.target.value.split(",") })} required />
                    </>
                )}


                <button type="submit">Post</button>
            </form>
            <form onSubmit={fetchDelete}>
                {selectedResource === "libraries" && (
                    <>
                        <input type="text" name="id" placeholder="Library ID" onChange={(e) => setDeleteData({ ...deleteData, id: e.target.value })} required />
                    </>
                )}

                {selectedResource === "authors" && (
                    <>
                        <input type="text" name="id" placeholder="Author ID" onChange={(e) => setDeleteData({ ...deleteData, id: e.target.value })} required />
                    </>
                )}

                {selectedResource === "books" && (
                    <>
                        <input type="text" name="id" placeholder="Books ID"
                            onChange={(e) => setDeleteData({ ...deleteData, id: e.target.value })} required />
                    </>
                )}
                <button type="submit">Delete</button>
            </form>
            <form onSubmit={fetchPut}>
                {selectedResource === "libraries" && (
                    <>
                        <input type="text" name="id" placeholder="Library ID" onChange={(e) => setPutData({ ...putData, id: e.target.value })} required />
                        <input type="text" name="name" placeholder="Library Name" onChange={(e) => setPutData({ ...putData, name: e.target.value })} required />
                        <input type="text" name="address" placeholder="Library Address" onChange={(e) => setPutData({ ...putData, address: e.target.value })} required />

                    </>
                )}

                {selectedResource === "authors" && (
                    <>
                        <input type="text" name="id" placeholder="Author ID" onChange={(e) => setPutData({ ...putData, id: e.target.value })} required />
                        <input type="text" name="name" placeholder="Authors Name" onChange={(e) => setPutData({ ...putData, name: e.target.value })} required />
                    </>
                )}

                {selectedResource === "books" && (
                    <>
                        <input type="text" name="id" placeholder="Book ID" onChange={(e) => setPutData({ ...putData, id: e.target.value })} required />
                        <input type="text" name="name" placeholder="Book Name" onChange={(e) => setPutData({ ...putData, name: e.target.value })} required />
                        <input type="text" name="genre" placeholder="Book Genre" onChange={(e) => setPutData({ ...putData, genre: e.target.value })} required />

                    </>
                )}
                <button type="submit">Put</button>
            </form>

            
        </div>
    );
}

export default LibraryPage;
