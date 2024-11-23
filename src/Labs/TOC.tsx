import { useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();
  const links = [
    {path: "#/Labs/Lab1", ref: "Lab1", name: "Lab 1", id: "a1"},
    {path: "#/Labs/Lab2", ref: "Lab2", name: "Lab 2", id: "a2"},
    {path: "#/Labs/Lab3", ref: "Lab3", name: "Lab 3", id: "a3"},
    {path: "#/Labs/Lab4", ref: "Lab4", name: "Lab 4", id: "a4"},
    {path: "#/Labs/Lab5", ref: "Lab5", name: "Lab 5", id: "a5"}
  ];
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a" href="#/Labs" className="nav-link">
          Labs
        </a>
      </li>
      {links.map( (link: any) => (
        <li className="nav-item">
          <a id={`wd-${link.id}`} href={link.path}
            className={`nav-link ${pathname.includes(link.ref) ? "active" : ""}`}>
            {link.name}
          </a>
        </li>
      ))}
      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/Bartavius/cs4550" className="nav-link">
          My React GitHub
        </a>
      
      </li>
    </ul>
  );
}
  