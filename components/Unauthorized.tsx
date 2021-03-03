import { signIn } from 'next-auth/client'

export default function Unauthorized() {

    return (
        <div className="row">
            <div className="col text-center">

                <p>Para ter acesso a essa página é necessário efetuar login.</p>

                <p> Por favor clique em Entrar ou Sing In.</p>

                <p> <button className="btn btn-secondary" onClick={() => signIn()}>Entrar</button></p>
            </div>
        </div>
    )
}
