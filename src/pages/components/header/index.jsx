import "./header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <footer>
      <div className="headerComponent shadow-1 ">
        <p className="p-config">
          dengue <span className="map">map</span>{" "}
        </p>
        <div className="bottom-exit">
          <Link to="/" className="pt-1">
            <p className="t-w">Sair</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
