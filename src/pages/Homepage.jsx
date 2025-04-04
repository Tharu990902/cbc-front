import { Link } from "react-router-dom";
import "./Homepage.css";
export default function Homepage() {
    return (
        <div className="homepage">
            <h1>Welcome to the Homepage</h1>
            <p>This is the main page of the application.</p>
            <Link to="/">Go back to Login</Link>
        </div>
    );
}