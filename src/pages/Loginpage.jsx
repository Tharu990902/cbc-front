import { Link } from "react-router-dom";
import "./Loginpage.css"
export default function Loginpage() {
    return (
        <div className="login-page">
        <h1>Login Page</h1>
        <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>

            <Link to="/home">Go to Homepage</Link>
        </form>
        </div>
    );
}