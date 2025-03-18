import { Link } from "react-router-dom";
import "../styles/MainPage.css";

function MainPage() {
    return (
        <div className="main-container">
            <h1>Welcome to the Main Page</h1>
            <p>This is your main landing page.</p>
            <div className="link-container">
                <Link to="/libraryAPI">Go to the Library API</Link>
                <Link to="/secondAPI">Go to the Second API</Link>
                <Link to="/thirdAPI">Go to the Third API</Link>
            </div>
        </div>
    );
}

export default MainPage;
