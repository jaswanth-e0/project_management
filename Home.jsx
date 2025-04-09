import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <ul className="space-y-4 bg-white p-8 rounded-2xl shadow-xl w-80 text-center">
        <li>
          <Link
            to="/users"
            className="block w-full py-2 px-4 bg-blue-600 text-white-500 rounded-xl hover:bg-blue-700 transition"
          >
            Add Users
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className="block w-full py-2 px-4 bg-green-600 text-white-500 rounded-xl hover:bg-green-700 transition"
          >
            Add Project
          </Link>
        </li>
        <li>
          <Link
            to="/tasks"
            className="block w-full py-2 px-4 bg-purple-600 text-white-500 rounded-xl hover:bg-purple-700 transition"
          >
            Add Tasks
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
