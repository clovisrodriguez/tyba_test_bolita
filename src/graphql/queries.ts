// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    cmus
    createdAt
    email
    id
    nickname
    transactions
    type
    updatedAt
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      cmus
      createdAt
      email
      id
      nickname
      transactions
      type
      updatedAt
    }
    nextToken
  }
}
`;
export const getTransaction = `query GetTransaction($id: ID!) {
  getTransaction(id: $id) {
    cmus
    createdAt
    fromId
    fromNickName
    id
    tags
    toId
    toNickname
    type
    status
    updatedAt
  }
}
`;
export const listTransactions = `query ListTransactions(
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      cmus
      createdAt
      fromId
      fromNickName
      id
      tags
      toId
      toNickname
      type
      status
      updatedAt
    }
    nextToken
  }
}
`;
