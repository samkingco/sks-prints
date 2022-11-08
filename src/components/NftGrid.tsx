import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";
import { ProjectType, tokens } from "../utils/tokens";
import { trpc } from "../utils/trpc";
import { ExternalLinkIcon } from "./ExternalLinkIcon";
import { Mono, subdued } from "./Typography";

const Grid = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: max-content;
  grid-gap: 1em;
  align-items: start;

  @media (min-width: 36rem) {
    grid-gap: 2em;
  }
  @media (min-width: 40rem) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 58rem) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3em;
  }
  @media (min-width: 72rem) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: 96rem) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const Empty = styled.div`
  grid-column: 1/-1;
  text-align: center;
  padding: 2em 1em;
`;

const Token = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-areas: "image image" "name claimed";
  grid-gap: 0.5em;

  @media (min-width: 48rem) {
    grid-row-gap: 1em;
  }
`;

interface TokenButtonProps {
  isAvailable?: boolean;
  isSelected?: boolean;
}

const TokenButton = styled.button<TokenButtonProps>`
  grid-area: image;
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;

  ${(p) =>
    !p.isAvailable &&
    css`
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(var(--background-alpha), 0.6);
        backdrop-filter: blur(8px);
      }
    `}

  ${(p) =>
    p.isSelected &&
    css`
      box-shadow: 0 0 0 0.25em var(--foreground);
    `}

  &:disabled {
    cursor: default;
  }
`;

const TokenImage = styled(Image)`
  object-fit: cover;
`;

const TokenName = styled(Mono)`
  grid-area: name;
`;

const TokenInfo = styled(Mono)`
  grid-area: claimed;
  a {
    text-decoration: none;
    span {
      ${subdued};
      transition: opacity 150ms ease;
    }

    &:hover span {
      opacity: 1;
    }
  }
`;

interface Props {
  project: ProjectType;
  selected: number[];
  onSelect: (id: number) => void;
  showForOwner?: boolean;
}

export function NftGrid({ project, selected, onSelect, showForOwner }: Props) {
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const { data: session } = useSession();
  const { data: claimedIds } = trpc.tokens.claimed.useQuery({ project });
  const { data: mintedIds } = trpc.tokens.minted.useQuery({ project });
  const { data: ownedIds } = trpc.tokens.owned.useQuery(
    { project, address },
    { enabled: Boolean(session?.address) }
  );

  const nfts = tokens.filter((i) => i.project === project);
  const visibleTokens =
    showForOwner && ownedIds
      ? nfts.filter((i) => ownedIds.includes(i.id))
      : nfts;

  if (!isMounted) return null;

  return (
    <Grid>
      {visibleTokens.length > 0 ? (
        visibleTokens.map((token) => {
          const isClaimed = claimedIds?.includes(token.id);
          const isOwned = address && ownedIds?.includes(token.id);
          const isMinted = mintedIds && mintedIds.includes(token.id);

          let tokenInfoText: React.ReactNode = "Available";
          if (mintedIds && !isMinted) {
            tokenInfoText = (
              <a
                href={`https://roots.samking.photo/photo/${token.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Mint{" "}
                <span>
                  <ExternalLinkIcon />
                </span>
              </a>
            );
          } else if (address && !isOwned) {
            tokenInfoText = "Not owner";
          } else if (isClaimed) {
            tokenInfoText = "Claimed";
          }

          const isAvailable = Boolean(
            (address && isOwned && !isClaimed) ||
              (!address && !isClaimed) ||
              !isMinted
          );

          return (
            <Token key={`${token.project}_${token.id}`}>
              <TokenButton
                isAvailable={isAvailable}
                isSelected={selected.includes(token.id)}
                disabled={!(isAvailable && address && isMinted)}
                onClick={() => {
                  if (isAvailable && address) {
                    onSelect(token.id);
                  }
                }}
              >
                <TokenImage
                  src={token.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 280px, 350px"
                  priority={token.id < 4}
                />
              </TokenButton>
              <TokenName uppercase>#{token.id}</TokenName>
              <TokenInfo uppercase subdued={!isAvailable}>
                {tokenInfoText}
              </TokenInfo>
            </Token>
          );
        })
      ) : (
        <Empty>
          <Mono uppercase subdued>
            You don&apos;t own any {project} NFTs
          </Mono>
        </Empty>
      )}
    </Grid>
  );
}
