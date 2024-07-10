import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}
