import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ cart }) {
  const itemCount = cart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" aria-label="AquaPet Fish Shop home">
          <img className="aquapet-logo" src={logo} alt="AquaPet Fish Shop logo" />
          <span className="aquapet-wordmark"><strong>AquaPet</strong><small>Fish Shop</small></span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/gallery">Gallery</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/adminlogin">Admin Login</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/product">Products</NavLink></li>
          </ul>

          {/* <div className="d-flex align-items-center gap-2">
            <Link to="/manageproducts" className="nav-action-btn nav-add-btn" aria-label="Manage products" title="Manage products">
              <i className="fas fa-box" /><span className="d-none d-sm-inline">Manage products</span>
            </Link> */}
            <Link to="/addproducts" className="nav-action-btn nav-add-btn" aria-label="Add product" title="Add product">
              <i className="fas fa-plus" /><span className="d-none d-sm-inline">Add product</span>
            </Link>
            <Link to="/cart" className="nav-action-btn nav-cart-btn position-relative" aria-label={`Cart with ${itemCount} items`} title="View cart">
              <i className="fas fa-shopping-cart" />
              <span className="d-none d-sm-inline">Cart</span>
              {itemCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{itemCount}</span>}
            </Link>
          </div>
        </div>
      {/* </div> */}
    </nav>
  );
}

export default Navbar;
