import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
    return null; 
  }

  const providers = [
    {
      id: "google", 
      name: "Google"
    },
  ];

  return (
    <div className="container-fluid h-100 d-flex justify-content-center align-items-center">
      {providers.map((provider) => (
        <Button key={provider.id} onClick={() => signIn(provider.id)}>
          Entrar com o {provider.name}
        </Button>
      ))}
    </div>
  );
}
