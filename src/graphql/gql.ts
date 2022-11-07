/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query OwnedTokens($owner: ID!) {\n    wallet(id: $owner) {\n      photos {\n        tokenId\n      }\n    }\n  }\n": types.OwnedTokensDocument,
    "\n  query MintedTokens {\n    rootsPhotos {\n      tokenId\n    }\n  }\n": types.MintedTokensDocument,
};

export function graphql(source: "\n  query OwnedTokens($owner: ID!) {\n    wallet(id: $owner) {\n      photos {\n        tokenId\n      }\n    }\n  }\n"): (typeof documents)["\n  query OwnedTokens($owner: ID!) {\n    wallet(id: $owner) {\n      photos {\n        tokenId\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query MintedTokens {\n    rootsPhotos {\n      tokenId\n    }\n  }\n"): (typeof documents)["\n  query MintedTokens {\n    rootsPhotos {\n      tokenId\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;