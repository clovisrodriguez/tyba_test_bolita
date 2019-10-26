// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createTransactions = `mutation CreateTransactions($input: CreateTransactionsInput!) {
  createTransactions(input: $input) {
    id
    restaurant
    cost
    productName
    Date
  }
}
`;
export const updateTransactions = `mutation UpdateTransactions($input: UpdateTransactionsInput!) {
  updateTransactions(input: $input) {
    id
    restaurant
    cost
    productName
    Date
  }
}
`;
export const deleteTransactions = `mutation DeleteTransactions($input: DeleteTransactionsInput!) {
  deleteTransactions(input: $input) {
    id
    restaurant
    cost
    productName
    Date
  }
}
`;
