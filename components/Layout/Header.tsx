import React from "react";
import { signOut, useSession } from 'next-auth/client'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Dropdown, Navbar, Nav } from "react-bootstrap";
import { useState } from "react";
import Router from 'next/router'

const Header: React.FC = () => {
  const [session, loading] = useSession()
  const [userName] = useState(session?.user?.name?.split(' ')[0]) //Primeiro nome
  return (
  <div className="">
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="mb-1">
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <img src='../../user.png' title={userName}/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => signOut()}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>        
      </div>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav.Link className="navbar-link" onClick={() => Router.push('/')}>Início</Nav.Link>
        <Nav.Link className="navbar-link" href="music">Músicas</Nav.Link>
        <Nav.Link className="navbar-link" href="organization">Organização</Nav.Link>
      </Navbar.Collapse>

      <style jsx>{`
          img {
            width: 30px;
            height: 30px;
            margin-top: -.25rem;
          }
        `}</style>
    </Navbar>
  </div>
  )
}

export default Header