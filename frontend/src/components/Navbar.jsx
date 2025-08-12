import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg text-orange-500">
        Global Connect
      </Link>
      <div className="flex gap-4">
        <Link to="/login" className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          Register
        </Link>
      </div>
    </nav>
  );
}
