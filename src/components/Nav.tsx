import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/savedCandidates">Potential Candidates</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;