/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  location: string,
};

export type UpdateUserInput = {
  id: string,
  location?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateTransactionsInput = {
  id?: string | null,
  restaurant?: string | null,
  cost?: number | null,
  productName?: string | null,
  Date?: string | null,
};

export type UpdateTransactionsInput = {
  id: string,
  restaurant?: string | null,
  cost?: number | null,
  productName?: string | null,
  Date?: string | null,
};

export type DeleteTransactionsInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  location?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelTransactionsFilterInput = {
  id?: ModelIDFilterInput | null,
  restaurant?: ModelStringFilterInput | null,
  cost?: ModelFloatFilterInput | null,
  productName?: ModelStringFilterInput | null,
  Date?: ModelStringFilterInput | null,
  and?: Array< ModelTransactionsFilterInput | null > | null,
  or?: Array< ModelTransactionsFilterInput | null > | null,
  not?: ModelTransactionsFilterInput | null,
};

export type ModelFloatFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    location: string,
    transactions:  Array< {
      __typename: "Transactions",
      id: string,
      restaurant: string | null,
      cost: number | null,
      productName: string | null,
      Date: string | null,
    } | null > | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    location: string,
    transactions:  Array< {
      __typename: "Transactions",
      id: string,
      restaurant: string | null,
      cost: number | null,
      productName: string | null,
      Date: string | null,
    } | null > | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    location: string,
    transactions:  Array< {
      __typename: "Transactions",
      id: string,
      restaurant: string | null,
      cost: number | null,
      productName: string | null,
      Date: string | null,
    } | null > | null,
  } | null,
};

export type CreateTransactionsMutationVariables = {
  input: CreateTransactionsInput,
};

export type CreateTransactionsMutation = {
  createTransactions:  {
    __typename: "Transactions",
    id: string,
    restaurant: string | null,
    cost: number | null,
    productName: string | null,
    Date: string | null,
  } | null,
};

export type UpdateTransactionsMutationVariables = {
  input: UpdateTransactionsInput,
};

export type UpdateTransactionsMutation = {
  updateTransactions:  {
    __typename: "Transactions",
    id: string,
    restaurant: string | null,
    cost: number | null,
    productName: string | null,
    Date: string | null,
  } | null,
};

export type DeleteTransactionsMutationVariables = {
  input: DeleteTransactionsInput,
};

export type DeleteTransactionsMutation = {
  deleteTransactions:  {
    __typename: "Transactions",
    id: string,
    restaurant: string | null,
    cost: number | null,
    productName: string | null,
    Date: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    location: string,
    transactions:  Array< {
      __typename: "Transactions",
      id: string,
      restaurant: string | null,
      cost: number | null,
      productName: string | null,
      Date: string | null,
    } | null > | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      location: string,
      transactions:  Array< {
        __typename: "Transactions",
        id: string,
        restaurant: string | null,
        cost: number | null,
        productName: string | null,
        Date: string | null,
      } | null > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTransactionsQueryVariables = {
  id: string,
};

export type GetTransactionsQuery = {
  getTransactions:  {
    __typename: "Transactions",
    id: string,
    restaurant: string | null,
    cost: number | null,
    productName: string | null,
    Date: string | null,
  } | null,
};

export type ListTransactionssQueryVariables = {
  filter?: ModelTransactionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionssQuery = {
  listTransactionss:  {
    __typename: "ModelTransactionsConnection",
    items:  Array< {
      __typename: "Transactions",
      id: string,
      restaurant: string | null,
      cost: number | null,
      productName: string | null,
      Date: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    location: string,
    transactions:  Array< {
      __typename: "Transactions",
      id: string,
      restaurant: string | null,
      cost: number | null,
      productName: string | null,
      Date: string | null,
    } | null > | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    location: string,
    transactions:  Array< {
      __typename: "Transactions",
      id: string,
      restaurant: string | null,
      cost: number | null,
      productName: string | null,
      Date: string | null,
    } | null > | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    location: string,
    transactions:  Array< {
      __typename: "Transactions",
      id: string,
      restaurant: string | null,
      cost: number | null,
      productName: string | null,
      Date: string | null,
    } | null > | null,
  } | null,
};

export type OnCreateTransactionsSubscription = {
  onCreateTransactions:  {
    __typename: "Transactions",
    id: string,
    restaurant: string | null,
    cost: number | null,
    productName: string | null,
    Date: string | null,
  } | null,
};

export type OnUpdateTransactionsSubscription = {
  onUpdateTransactions:  {
    __typename: "Transactions",
    id: string,
    restaurant: string | null,
    cost: number | null,
    productName: string | null,
    Date: string | null,
  } | null,
};

export type OnDeleteTransactionsSubscription = {
  onDeleteTransactions:  {
    __typename: "Transactions",
    id: string,
    restaurant: string | null,
    cost: number | null,
    productName: string | null,
    Date: string | null,
  } | null,
};
