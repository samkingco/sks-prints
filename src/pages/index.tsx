import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "../components/Button";
import { CustomConnectButton } from "../components/CustomConnectButton";
import { NftGrid } from "../components/NftGrid";
import SocialMeta from "../components/SocialMeta";
import { Heading, Mono, subdued, Title } from "../components/Typography";
import getStripe from "../utils/stripe";
import { trpc } from "../utils/trpc";

const Layout = styled.main`
  padding: 2em 2em 6em;
`;

const Header = styled.header`
  background-image: linear-gradient(
    to right,
    rgba(var(--foreground-alpha), 0.2) 16%,
    rgba(var(--background-alpha), 0) 0%
  );
  background-position: bottom;
  background-size: 8px 1px;
  background-repeat: repeat-x;
  padding-bottom: 2em;

  p {
    max-width: 48em;
  }
`;

const BulletList = styled.ul`
  margin: 0;
  padding: 0 0 0 1.25em;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
  }

  li + li {
    margin-top: 0.5em;
  }

  li:before {
    content: "\\2022";
    color: var(--foreground);
    font-family: var(--font-mono);
    ${subdued};
    display: inline-block;
    width: 1.25em;
    margin-left: -1em;
    flex: none;
  }
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "wallet filter" "checkout checkout";
  grid-gap: 1em;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 2em 1em;
  margin: 1em -1em 2em;
  background: rgba(var(--background-alpha), 0.9);
  backdrop-filter: blur(16px);

  button {
    width: 100%;
  }

  @media (min-width: 36rem) {
    grid-template-columns: 1fr max-content max-content;
    grid-template-areas: "wallet filter checkout";

    button {
      width: auto;
    }
  }
`;

const Wallet = styled.div`
  grid-area: wallet;
`;

const Filter = styled.div`
  grid-area: filter;
`;

const Checkout = styled.form`
  grid-area: checkout;
`;

export default function Home() {
  const { data: session } = useSession();
  const [onlyMine, setOnlyMine] = useState(false);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [selectedRootsIds, setSelectedRootsIds] = useState<number[]>([]);
  const { mutateAsync, isLoading } = trpc.stripe.checkoutSession.useMutation();

  const onSelect = (id: number) => {
    if (selectedRootsIds.includes(id)) {
      setSelectedRootsIds((s) => s.filter((i) => i !== id));
    } else {
      setSelectedRootsIds((s) => [...s, id]);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const session = await mutateAsync({
        project: "ROOTS",
        tokens: selectedRootsIds,
      });
      if (session) {
        setIsLoadingCheckout(true);
        const stripe = await getStripe();
        const redirect = await stripe?.redirectToCheckout({
          sessionId: session.id,
        });

        setIsLoadingCheckout(false);
        if (redirect && redirect.error) {
          console.error(redirect.error);
          return;
        }
      }
    } catch (error) {
      setIsLoadingCheckout(false);
      console.error(error);
    }
  };

  return (
    <Layout>
      <SocialMeta />
      <Header>
        <Title>Prints</Title>
        <Mono as="h2" margin="-4 0 24" uppercase subdued>
          Giclée prints for holders of{" "}
          <a href="https://roots.samking.photo">Roots</a> NFTs
        </Mono>

        <Mono margin="0 0 8">
          I want to thank collectors of my work and give back a little something
          to show my gratitude. Anyone who holds a Roots NFT is now able to
          claim a print of that NFT. The only cost is postage and packaging.
        </Mono>

        <Mono margin="0 0 24">
          If you notice your country is not in the list at checkout, please send
          an email to <a href="mailto:sam@samking.studio">sam@samking.studio</a>{" "}
          and I can arrange something.
        </Mono>

        <Heading margin="0 0 8">Details</Heading>
        <BulletList>
          <li>
            <Mono>
              Signed 1/1 archival giclée print on Hahnemüle Photo Rag 308gsm
              paper
            </Mono>
          </li>
          <li>
            <Mono>370x370mm printed area</Mono>
          </li>
          <li>
            <Mono>480x480mm paper size including 55mm border</Mono>
          </li>
          <li>
            <Mono>Includes certificate of authenticity</Mono>
          </li>
          <li>
            <Mono>Each NFT can be used to claim a print only once</Mono>
          </li>
          <li>
            <Mono>Only claimable by the current NFT owner</Mono>
          </li>
          <li>
            <Mono>Free to claim, just pay postage &amp; packaging</Mono>
          </li>
        </BulletList>
      </Header>

      <Buttons>
        <Wallet>
          <CustomConnectButton />
        </Wallet>

        <Filter>
          <Button
            uppercase
            variant="secondary"
            disabled={!session}
            onClick={() => {
              setOnlyMine(!onlyMine);
            }}
          >
            {onlyMine ? "Show all" : "Only mine"}
          </Button>
        </Filter>

        <Checkout onSubmit={onSubmit}>
          <Button
            disabled={selectedRootsIds.length === 0}
            isLoading={isLoading || isLoadingCheckout}
            uppercase
            type="submit"
          >
            Checkout
          </Button>
        </Checkout>
      </Buttons>

      <NftGrid
        project="ROOTS"
        selected={selectedRootsIds}
        onSelect={onSelect}
        showForOwner={onlyMine}
      />
    </Layout>
  );
}
