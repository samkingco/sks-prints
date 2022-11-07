import { ConnectButton } from "@rainbow-me/rainbowkit";
import { trpc } from "../utils/trpc";

export default function Home() {
  const { data } = trpc.stripe.checkoutSession.useQuery({ text: "print shop" });
  console.log(data);

  const { data: auth } = trpc.auth.getSession.useQuery();
  console.log(auth);

  return (
    <main>
      <ConnectButton />
      <h1>Prints</h1>
      {data && data.greeting && <p>{data.greeting}</p>}
    </main>
  );
}
