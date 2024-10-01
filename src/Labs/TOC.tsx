import { Link } from "react-router-dom";

export default function TOC() {
    return (
      <ul>
        <li><Link to="/Labs">Labs</Link></li>
        <li><Link to="/Labs/Lab1">Lab 1</Link></li>
        <li><Link to="/Labs/Lab2">Lab 2</Link></li>
        <li><Link to="/Labs/Lab3">Lab 3</Link></li>
        <li><Link to="/Kanbas">Kanbas</Link></li>
        <li><Link to="https://github.com/Bartavius/cs4550">github link</Link></li>
        <li><a href="https://github.com/Bartavius/cs4550" id="wd-github" target="_blank" rel="noreferrer">GitHub</a></li>
      </ul>
    );
  }
  