import styled from "@emotion/styled";
import Link from "next/link";
import SocialMeta from "../components/SocialMeta";
import { Mono, subdued, Title } from "../components/Typography";

const Layout = styled.main`
  padding: 2em 1em 6em;

  @media (min-width: 36rem) {
    padding: 2em 2em 6em;
  }
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
  margin-bottom: 2em;

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
  return (
    <Layout>
      <SocialMeta />
      <Header>
        <Title>Prints</Title>
        <Mono margin="-4 0 0" uppercase subdued>
          Giclée prints for holders of{" "}
          <a href="https://roots.samking.photo">Roots</a> NFTs
        </Mono>
      </Header>

      <Mono margin="0 0 8">
        This website has been moved. To claim or purchase a print, head to{" "}
        <Link href="https://roots.samking.photo/prints">
          roots.samking.photo
        </Link>
        .
      </Mono>
    </Layout>
  );
}
