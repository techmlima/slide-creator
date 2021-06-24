import React from "react";
import { signOut, useSession } from 'next-auth/client'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Dropdown, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useState } from "react";

const Header: React.FC = () => {
  const [session, loading] = useSession()
  const [userName] = useState(session?.user?.name?.split(' ')[0]) //Primeiro nome
  return (<>
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="mb-1">
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <img src='../../user.png' />
            <br />
            <span>{userName}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => signOut()}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <style jsx>{`
          img {
            width: 30px;
            height: 30px;
            margin-top: -.25rem;
          }
        `}</style>
      </div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav.Link color="white" href="#home">Músicas</Nav.Link>
        <Nav.Link href="#home">Organização</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  </>)
}

export default Header