import React, { useEffect } from "react";
import { signOut, useSession } from 'next-auth/client'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Dropdown, Navbar, Nav } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const [userName] = useState(session?.user?.name?.split(' ')[0]) //Primeiro nome
  const [currentPath, setCurrentPath] = useState(router.pathname)

  const goRouter = (path: string) => {
    setCurrentPath(path);
    router.push(path);
  }

  const getActiveRouteClass = (path: string) => {
    return currentPath === path ? 'nav-link-active' : '';
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="mb-1">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <img src='../../user.png' title={userName} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => signOut()}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link className={"navbar-link " + getActiveRouteClass('/')} onClick={() => goRouter('/')}>Início</Nav.Link>
          <Nav.Link className={"navbar-link " + getActiveRouteClass('/music')} onClick={() => goRouter('/music')}>Músicas</Nav.Link>
          <Nav.Link className={"navbar-link " + getActiveRouteClass('/organization')} onClick={() => goRouter('/organization')}>Organização</Nav.Link>
        </Navbar.Collapse>
      </Navbar>

      <style jsx>{`
          img {
            width: 30px;
            height: 30px;
            margin-top: -.25rem;
          }
        `}</style>
    </div>
  )
}

export default Header