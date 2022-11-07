import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { Mono, Title } from "../components/Typography";

const Layout = styled.main`
  padding: 2em 2em 6em;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  p {
    max-width: 48em;
  }
`;

const Content = styled.div``;

export default function Success() {
  const router = useRouter();

  return (
    <Layout>
      <Content>
        <Title>Order successful</Title>
        <Mono margin="0 0 24">
          Thank you so much for your continued support. I hope you enjoy your
          print when it arrives! I&apos;ll send you a follow up email when
          it&apos;s been posted, along with any tracking information. Let me
          know if there&apos;s any issues or you need some more information from
          me.
        </Mono>

        <Button variant="secondary" uppercase onClick={() => router.push("/")}>
          Done
        </Button>
      </Content>
    </Layout>
  );
}
