import React from "react";
import { signOut, useSession } from 'next-auth/client'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Dropdown, Navbar, Nav } from "react-bootstrap";
import { GearFill, ArrowReturnLeft } from "react-bootstrap-icons";
import { useState } from "react";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter()
  const [session, loading] = useSession()
  const [currentPath, setCurrentPath] = useState(router.pathname)

  const goRouter = (path: string) => {
    setCurrentPath(path);
    router.push(path);
  }

  const getActiveRouteClass = (path: string) => {
    return currentPath === path ? 'nav-link-active' : '';
  }

  const getFirstNameUser = () => {
    return session?.user?.name?.split(' ')[0]
  }
  return (<>
    {!session ? (null) : (
      <div>
        <Navbar collapseOnSelect expand="sm"  variant="dark" className="mb-1 bg-midnight">
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdown-user">
                <img src='../../user.png' alt={getFirstNameUser()} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <h6 className="text-center">Olá {getFirstNameUser()}!</h6>
                <hr />
                <Dropdown.Item onClick={() => { }}>
                  <GearFill /> Gerenciar usuários
                </Dropdown.Item>
                <Dropdown.Item onClick={() => signOut()}>
                  <ArrowReturnLeft /> Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

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
            margin-top: -.7rem;
            transform: scale(1.3, 0.9);
          }
        `}</style>
      </div>)
    }
  </>)
}
export default Header