import { trpc } from "../utils/trpc";

export default function Home() {
  const { data } = trpc.stripe.checkoutSession.useQuery({ text: "print shop" });
  console.log(data);

  return (
    <main>
      <h1>Prints</h1>

      {data && data.greeting && <p>{data.greeting}</p>}
    </main>
  );
}
