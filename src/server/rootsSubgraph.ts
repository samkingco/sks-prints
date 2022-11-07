import { GraphQLClient } from "graphql-request";
import { graphql } from "../graphql";

export const rootsSubgraph = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/samkingco/roots"
);

export const ownedTokensDocument = graphql(/* GraphQL */ `
  query OwnedTokens($owner: ID!) {
    wallet(id: $owner) {
      photos {
        tokenId
      }
    }
  }
`);

export const mintedTokensDocument = graphql(/* GraphQL */ `
  query MintedTokens {
    rootsPhotos {
      tokenId
    }
  }
`);
