import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.webp'
import { useAuth } from '../context/auth';
const Navbar = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark" >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" width={40}/>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-4">
              {/* <SearchInput /> */}
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">HOME</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employeelist">EMPLOYEE LIST</Link>
              </li>
              {
                !auth.user? (<>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">LOGIN</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">REGISTER</Link>
                  </li>
              </>) : <>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name.toUpperCase()}
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/login" onClick={()=> {
                        localStorage.removeItem('auth');
                        window.alert("Logging out")
                      }}>Log Out</Link></li>
                    </ul>
                  </li>

                </>
              }
              <li className="nav-item">
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
