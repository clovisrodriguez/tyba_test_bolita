// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    type
    nickname
    phone_number
    email
    cmus
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    type
    nickname
    phone_number
    email
    cmus
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    type
    nickname
    phone_number
    email
    cmus
  }
}
`;
export const createTransactions = `mutation CreateTransactions($input: CreateTransactionsInput!) {
  createTransactions(input: $input) {
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
export const updateTransactions = `mutation UpdateTransactions($input: UpdateTransactionsInput!) {
  updateTransactions(input: $input) {
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
export const deleteTransactions = `mutation DeleteTransactions($input: DeleteTransactionsInput!) {
  deleteTransactions(input: $input) {
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
