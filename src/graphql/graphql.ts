/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  rootsPhoto?: Maybe<RootsPhoto>;
  rootsPhotos: Array<RootsPhoto>;
  rootsStatus?: Maybe<RootsStatus>;
  rootsStatuses: Array<RootsStatus>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryRootsPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRootsPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RootsPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RootsPhoto_Filter>;
};


export type QueryRootsStatusArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRootsStatusesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RootsStatus_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RootsStatus_Filter>;
};


export type QueryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type QueryWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type RootsPhoto = {
  __typename?: 'RootsPhoto';
  id: Scalars['ID'];
  owner: Wallet;
  primarySaleAt: Scalars['BigInt'];
  primarySaleBuyer: Wallet;
  primarySalePrice: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  transfers: Array<Transfer>;
};


export type RootsPhotoTransfersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Transfer_Filter>;
};

export type RootsPhoto_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Wallet_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  primarySaleAt?: InputMaybe<Scalars['BigInt']>;
  primarySaleAt_gt?: InputMaybe<Scalars['BigInt']>;
  primarySaleAt_gte?: InputMaybe<Scalars['BigInt']>;
  primarySaleAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  primarySaleAt_lt?: InputMaybe<Scalars['BigInt']>;
  primarySaleAt_lte?: InputMaybe<Scalars['BigInt']>;
  primarySaleAt_not?: InputMaybe<Scalars['BigInt']>;
  primarySaleAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  primarySaleBuyer?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_?: InputMaybe<Wallet_Filter>;
  primarySaleBuyer_contains?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_contains_nocase?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_ends_with?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_gt?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_gte?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_in?: InputMaybe<Array<Scalars['String']>>;
  primarySaleBuyer_lt?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_lte?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_not?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_not_contains?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_not_ends_with?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_not_in?: InputMaybe<Array<Scalars['String']>>;
  primarySaleBuyer_not_starts_with?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_starts_with?: InputMaybe<Scalars['String']>;
  primarySaleBuyer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  primarySalePrice?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_gt?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_gte?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  primarySalePrice_lt?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_lte?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_not?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transfers_?: InputMaybe<Transfer_Filter>;
};

export enum RootsPhoto_OrderBy {
  Id = 'id',
  Owner = 'owner',
  PrimarySaleAt = 'primarySaleAt',
  PrimarySaleBuyer = 'primarySaleBuyer',
  PrimarySalePrice = 'primarySalePrice',
  TokenId = 'tokenId',
  Transfers = 'transfers'
}

export type RootsStatus = {
  __typename?: 'RootsStatus';
  id: Scalars['ID'];
  maxPhotos: Scalars['BigInt'];
  primarySalePrice: Scalars['BigInt'];
  totalBurned: Scalars['BigInt'];
  totalSold: Scalars['BigInt'];
};

export type RootsStatus_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  maxPhotos?: InputMaybe<Scalars['BigInt']>;
  maxPhotos_gt?: InputMaybe<Scalars['BigInt']>;
  maxPhotos_gte?: InputMaybe<Scalars['BigInt']>;
  maxPhotos_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxPhotos_lt?: InputMaybe<Scalars['BigInt']>;
  maxPhotos_lte?: InputMaybe<Scalars['BigInt']>;
  maxPhotos_not?: InputMaybe<Scalars['BigInt']>;
  maxPhotos_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  primarySalePrice?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_gt?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_gte?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  primarySalePrice_lt?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_lte?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_not?: InputMaybe<Scalars['BigInt']>;
  primarySalePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBurned?: InputMaybe<Scalars['BigInt']>;
  totalBurned_gt?: InputMaybe<Scalars['BigInt']>;
  totalBurned_gte?: InputMaybe<Scalars['BigInt']>;
  totalBurned_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBurned_lt?: InputMaybe<Scalars['BigInt']>;
  totalBurned_lte?: InputMaybe<Scalars['BigInt']>;
  totalBurned_not?: InputMaybe<Scalars['BigInt']>;
  totalBurned_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSold?: InputMaybe<Scalars['BigInt']>;
  totalSold_gt?: InputMaybe<Scalars['BigInt']>;
  totalSold_gte?: InputMaybe<Scalars['BigInt']>;
  totalSold_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSold_lt?: InputMaybe<Scalars['BigInt']>;
  totalSold_lte?: InputMaybe<Scalars['BigInt']>;
  totalSold_not?: InputMaybe<Scalars['BigInt']>;
  totalSold_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum RootsStatus_OrderBy {
  Id = 'id',
  MaxPhotos = 'maxPhotos',
  PrimarySalePrice = 'primarySalePrice',
  TotalBurned = 'totalBurned',
  TotalSold = 'totalSold'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  rootsPhoto?: Maybe<RootsPhoto>;
  rootsPhotos: Array<RootsPhoto>;
  rootsStatus?: Maybe<RootsStatus>;
  rootsStatuses: Array<RootsStatus>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionRootsPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRootsPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RootsPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RootsPhoto_Filter>;
};


export type SubscriptionRootsStatusArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRootsStatusesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RootsStatus_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RootsStatus_Filter>;
};


export type SubscriptionTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type SubscriptionWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Transfer = {
  __typename?: 'Transfer';
  from: Wallet;
  id: Scalars['ID'];
  photo: RootsPhoto;
  timestamp: Scalars['BigInt'];
  to: Wallet;
  txHash: Scalars['Bytes'];
};

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  from?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Wallet_Filter>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  photo?: InputMaybe<Scalars['String']>;
  photo_?: InputMaybe<RootsPhoto_Filter>;
  photo_contains?: InputMaybe<Scalars['String']>;
  photo_contains_nocase?: InputMaybe<Scalars['String']>;
  photo_ends_with?: InputMaybe<Scalars['String']>;
  photo_ends_with_nocase?: InputMaybe<Scalars['String']>;
  photo_gt?: InputMaybe<Scalars['String']>;
  photo_gte?: InputMaybe<Scalars['String']>;
  photo_in?: InputMaybe<Array<Scalars['String']>>;
  photo_lt?: InputMaybe<Scalars['String']>;
  photo_lte?: InputMaybe<Scalars['String']>;
  photo_not?: InputMaybe<Scalars['String']>;
  photo_not_contains?: InputMaybe<Scalars['String']>;
  photo_not_contains_nocase?: InputMaybe<Scalars['String']>;
  photo_not_ends_with?: InputMaybe<Scalars['String']>;
  photo_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  photo_not_in?: InputMaybe<Array<Scalars['String']>>;
  photo_not_starts_with?: InputMaybe<Scalars['String']>;
  photo_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  photo_starts_with?: InputMaybe<Scalars['String']>;
  photo_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Wallet_Filter>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Transfer_OrderBy {
  From = 'from',
  Id = 'id',
  Photo = 'photo',
  Timestamp = 'timestamp',
  To = 'to',
  TxHash = 'txHash'
}

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['Bytes'];
  id: Scalars['ID'];
  photos: Array<RootsPhoto>;
};


export type WalletPhotosArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RootsPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RootsPhoto_Filter>;
};

export type Wallet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  photos_?: InputMaybe<RootsPhoto_Filter>;
};

export enum Wallet_OrderBy {
  Address = 'address',
  Id = 'id',
  Photos = 'photos'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type OwnedTokensQueryVariables = Exact<{
  owner: Scalars['ID'];
}>;


export type OwnedTokensQuery = { __typename?: 'Query', wallet?: { __typename?: 'Wallet', photos: Array<{ __typename?: 'RootsPhoto', tokenId: any }> } | null };

export type MintedTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type MintedTokensQuery = { __typename?: 'Query', rootsPhotos: Array<{ __typename?: 'RootsPhoto', tokenId: any }> };


export const OwnedTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OwnedTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenId"}}]}}]}}]}}]} as unknown as DocumentNode<OwnedTokensQuery, OwnedTokensQueryVariables>;
export const MintedTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MintedTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rootsPhotos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenId"}}]}}]}}]} as unknown as DocumentNode<MintedTokensQuery, MintedTokensQueryVariables>;