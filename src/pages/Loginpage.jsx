import { Link } from "react-router-dom";

export default function Loginpage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-2xl">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Login to Your Account</h1>
                
                <form className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="example@mail.com"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div>
                            <input type="checkbox" id="remember" className="mr-1" />
                            <label htmlFor="remember" className="text-gray-600">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="text-purple-600 hover:underline">Forgot Password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white transition duration-300 bg-purple-600 rounded-lg hover:bg-purple-700"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-purple-600 hover:underline">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
}
