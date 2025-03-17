import { Link } from "react-router-dom";

function MainPage() {

    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <p>This is your main landing page.</p>
            <Link to="/libraryAPI">Go to Page where you can access the library API.</Link>
            <Link to="/secondAPI">Go to Page where you can access the second API.</Link>
            <Link to="/thirdAPI">Go to Page where you can access the third API.</Link>
        </div>
    );
}

export default MainPage;
