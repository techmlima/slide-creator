import React from "react";
import { signIn, signOut, useSession } from 'next-auth/client'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { Dropdown, Navbar, Nav } from "react-bootstrap";
import { GearFill, ArrowReturnLeft, ArrowReturnRight } from "react-bootstrap-icons";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter()
  const [session] = useSession()

  const getActiveRouteClass = (path: string) => {
    const mainPath = router.pathname.split('/')[1];
    return `/${mainPath}` === path ? 'nav-link-active' : '';
  }

  const getFirstNameUser = () => {
    return session?.user?.name?.split(' ')[0]
  }
  return (<>
    <div>
      <Navbar collapseOnSelect expand="sm" variant="dark" className="mb-1 bg-midnight">
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="dropdown-user">
              <img src='../../user.png' alt={getFirstNameUser()} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {session && (<>
                <h6 className="text-center">Olá {getFirstNameUser()}!</h6>
                <hr />
                <Dropdown.Item onClick={() => { }}>
                  <GearFill /> Gerenciar usuários
                </Dropdown.Item>
              </>)}

              <Dropdown.Item onClick={() => session ? signOut() : signIn()}>
                {session ? 
                  (<><ArrowReturnLeft /> Sair</>) : (<><ArrowReturnRight /> Entrar</>)
                } 
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link className={"navbar-link " + getActiveRouteClass('/')} onClick={() => router.push('/')}>Início</Nav.Link>
          {session && (<>
            <Nav.Link className={"navbar-link " + getActiveRouteClass('/music')} onClick={() => router.push('/music')}>Músicas</Nav.Link>
            <Nav.Link className={"navbar-link " + getActiveRouteClass('/organization')} onClick={() => router.push('/organization')}>Congregação</Nav.Link>
          </>)}
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
    </div>
  </>)
}
export default Header