import { providers, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

export async function getServerSideProps(context) {
  return { props: { providers: await providers() } };
}

export default function SignIn({ providers }) {
  const [session] = useSession()
  const router = useRouter()

  if (session)
    router.push('/')
    
  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
      {Object.values(providers).map((provider: any) => (
        <Button key={provider.name} onClick={() => signIn(provider.id)}>
          Entrar com o {provider.name}
        </Button>
      ))}
    </div>
  );
}
