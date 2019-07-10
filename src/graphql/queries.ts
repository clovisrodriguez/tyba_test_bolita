// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    type
    nickname
    phone_number
    email
    cmus
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
      id
      type
      nickname
      phone_number
      email
      cmus
    }
    nextToken
  }
}
`;
export const getTransactions = `query GetTransactions($id: ID!) {
  getTransactions(id: $id) {
    id
    createAt
    from {
      id
      type
      nickname
      phone_number
      email
      cmus
    }
    to {
      id
      type
      nickname
      phone_number
      email
      cmus
    }
    cmus
    status
  }
}
`;
export const listTransactionss = `query ListTransactionss(
  $filter: ModelTransactionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactionss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createAt
      from {
        id
        type
        nickname
        phone_number
        email
        cmus
      }
      to {
        id
        type
        nickname
        phone_number
        email
        cmus
      }
      cmus
      status
    }
    nextToken
  }
}
`;
