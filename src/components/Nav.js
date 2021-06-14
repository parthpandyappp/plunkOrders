import "../../src/styles.css";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { RiSlideshow4Line } from "react-icons/ri";
function Nav() {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link
          title="home"
          to={`/`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "black" }}
        >
          <HiOutlineUpload
            style={{ fontSize: "1.1rem", paddingRight: "0.5rem" }}
          />
          plunkOrders
        </Link>
      </div>
      <ul className="nav-pills">
        <li
          className="list-item-inline"
          style={{ fontSize: "1.2rem", paddingRight: "0.5rem", margin: "1rem" }}
        >
          <Link
            title="Order Summary"
            to={`/reveal`}
            activeClassName="active"
            style={{ textDecoration: "none", color: "black" }}
          >
            <RiSlideshow4Line style={{ fontSize: "1.5rem" }} />
          </Link>
        </li>
        <li className="list-item-inline">
          <a
            title="Github repository of the project"
            href="https://github.com/parthpandyappp/plunkOrders/"
            style={{ textDecoration: "none", color: "black" }}
          >
            <FaGithub style={{ fontSize: "1.5rem", paddingRight: "0.5rem" }} />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
