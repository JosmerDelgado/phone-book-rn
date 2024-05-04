/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getContact = /* GraphQL */ `query GetContact($id: ID!) {
  getContact(id: $id) {
    id
    name
    lastName
    phoneNumber
    userId
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetContactQueryVariables,
  APITypes.GetContactQuery
>;
export const listContacts = /* GraphQL */ `query ListContacts(
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
) {
  listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      lastName
      phoneNumber
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListContactsQueryVariables,
  APITypes.ListContactsQuery
>;
export const syncContacts = /* GraphQL */ `query SyncContacts(
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncContacts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      lastName
      phoneNumber
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncContactsQueryVariables,
  APITypes.SyncContactsQuery
>;
export const contactsByUser = /* GraphQL */ `query ContactsByUser(
  $userId: String!
  $nameLastName: ModelContactContactsByUserCompositeKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
) {
  contactsByUser(
    userId: $userId
    nameLastName: $nameLastName
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      lastName
      phoneNumber
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ContactsByUserQueryVariables,
  APITypes.ContactsByUserQuery
>;
