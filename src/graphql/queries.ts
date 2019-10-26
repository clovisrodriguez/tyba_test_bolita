// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    location
    transactions {
      id
      restaurant
      cost
      productName
      Date
    }
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
      location
      transactions {
        id
        restaurant
        cost
        productName
        Date
      }
    }
    nextToken
  }
}
`;
export const getTransactions = `query GetTransactions($id: ID!) {
  getTransactions(id: $id) {
    id
    restaurant
    cost
    productName
    Date
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
      restaurant
      cost
      productName
      Date
    }
    nextToken
  }
}
`;
