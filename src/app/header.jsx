import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = (props) => (
  <header>
    <nav className="navbar navbar-default">
      <div className="container-fluid">

        <div className="navbar-header">
          <NavLink 
            to='/' 
            exact
            className="navbar-brand"
            activeStyle={{
              color: 'red'
            }}
            >
            Library Information System
          </NavLink>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavLink 
                to='/books' 
                activeStyle={{
                  color: 'red'
                }}
                >
                Books
              </NavLink>
            </li>
            <li>
              <NavLink 
                to='/authors' 
                activeStyle={{
                  color: 'red'
                }}
                >
                Authors
              </NavLink>
            </li>
          </ul>

          {props.permission ?
            <p className="navbar-text navbar-right">
              Logged in as {props.user.name}, <a href="#" onClick={props.logout}>Logout</a>
            </p>
            : null
          }

        </div>

      </div>
    </nav>

  </header>
)

export default Header