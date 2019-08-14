// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createTransaction = `mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
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
export const updateTransaction = `mutation UpdateTransaction($input: UpdateTransactionInput!) {
  updateTransaction(input: $input) {
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
export const deleteTransaction = `mutation DeleteTransaction($input: DeleteTransactionInput!) {
  deleteTransaction(input: $input) {
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
