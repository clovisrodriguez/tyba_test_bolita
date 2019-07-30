/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  type?: User_type | null,
  nickname: string,
  phone_number: string,
  email: string,
  cmus: number,
};

export enum User_type {
  REGULAR_USER = "REGULAR_USER",
  BUSINESS_USER = "BUSINESS_USER",
}


export type UpdateUserInput = {
  id: string,
  type?: User_type | null,
  nickname?: string | null,
  phone_number?: string | null,
  email?: string | null,
  cmus?: number | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateTransactionsInput = {
  id?: string | null,
  createAt: string,
  cmus: number,
  status: Transaction_status,
  type: Transaction_type,
  transactionsFromId: string,
  transactionsToId: string,
};

export enum Transaction_status {
  SUCCESFUL = "SUCCESFUL",
  PENDING = "PENDING",
  FAILED = "FAILED",
}


export enum Transaction_type {
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
  USER_TRANSACTION = "USER_TRANSACTION",
}


export type UpdateTransactionsInput = {
  id: string,
  createAt?: string | null,
  cmus?: number | null,
  status?: Transaction_status | null,
  type?: Transaction_type | null,
  transactionsFromId?: string | null,
  transactionsToId?: string | null,
};

export type DeleteTransactionsInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  type?: ModelUser_typeFilterInput | null,
  nickname?: ModelStringFilterInput | null,
  phone_number?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  cmus?: ModelFloatFilterInput | null,
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

export type ModelUser_typeFilterInput = {
  eq?: User_type | null,
  ne?: User_type | null,
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

export type ModelTransactionsFilterInput = {
  id?: ModelIDFilterInput | null,
  createAt?: ModelStringFilterInput | null,
  cmus?: ModelFloatFilterInput | null,
  status?: ModelTransaction_statusFilterInput | null,
  type?: ModelTransaction_typeFilterInput | null,
  and?: Array< ModelTransactionsFilterInput | null > | null,
  or?: Array< ModelTransactionsFilterInput | null > | null,
  not?: ModelTransactionsFilterInput | null,
};

export type ModelTransaction_statusFilterInput = {
  eq?: Transaction_status | null,
  ne?: Transaction_status | null,
};

export type ModelTransaction_typeFilterInput = {
  eq?: Transaction_type | null,
  ne?: Transaction_type | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    type: User_type | null,
    nickname: string,
    phone_number: string,
    email: string,
    cmus: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    type: User_type | null,
    nickname: string,
    phone_number: string,
    email: string,
    cmus: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    type: User_type | null,
    nickname: string,
    phone_number: string,
    email: string,
    cmus: number,
  } | null,
};

export type CreateTransactionsMutationVariables = {
  input: CreateTransactionsInput,
};

export type CreateTransactionsMutation = {
  createTransactions:  {
    __typename: "Transactions",
    id: string,
    createAt: string,
    from:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    to:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    cmus: number,
    status: Transaction_status,
    type: Transaction_type,
  } | null,
};

export type UpdateTransactionsMutationVariables = {
  input: UpdateTransactionsInput,
};

export type UpdateTransactionsMutation = {
  updateTransactions:  {
    __typename: "Transactions",
    id: string,
    createAt: string,
    from:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    to:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    cmus: number,
    status: Transaction_status,
    type: Transaction_type,
  } | null,
};

export type DeleteTransactionsMutationVariables = {
  input: DeleteTransactionsInput,
};

export type DeleteTransactionsMutation = {
  deleteTransactions:  {
    __typename: "Transactions",
    id: string,
    createAt: string,
    from:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    to:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    cmus: number,
    status: Transaction_status,
    type: Transaction_type,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    type: User_type | null,
    nickname: string,
    phone_number: string,
    email: string,
    cmus: number,
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
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
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
    createAt: string,
    from:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    to:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    cmus: number,
    status: Transaction_status,
    type: Transaction_type,
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
      createAt: string,
      from:  {
        __typename: "User",
        id: string,
        type: User_type | null,
        nickname: string,
        phone_number: string,
        email: string,
        cmus: number,
      },
      to:  {
        __typename: "User",
        id: string,
        type: User_type | null,
        nickname: string,
        phone_number: string,
        email: string,
        cmus: number,
      },
      cmus: number,
      status: Transaction_status,
      type: Transaction_type,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    type: User_type | null,
    nickname: string,
    phone_number: string,
    email: string,
    cmus: number,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    type: User_type | null,
    nickname: string,
    phone_number: string,
    email: string,
    cmus: number,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    type: User_type | null,
    nickname: string,
    phone_number: string,
    email: string,
    cmus: number,
  } | null,
};

export type OnCreateTransactionsSubscription = {
  onCreateTransactions:  {
    __typename: "Transactions",
    id: string,
    createAt: string,
    from:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    to:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    cmus: number,
    status: Transaction_status,
    type: Transaction_type,
  } | null,
};

export type OnUpdateTransactionsSubscription = {
  onUpdateTransactions:  {
    __typename: "Transactions",
    id: string,
    createAt: string,
    from:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    to:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    cmus: number,
    status: Transaction_status,
    type: Transaction_type,
  } | null,
};

export type OnDeleteTransactionsSubscription = {
  onDeleteTransactions:  {
    __typename: "Transactions",
    id: string,
    createAt: string,
    from:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    to:  {
      __typename: "User",
      id: string,
      type: User_type | null,
      nickname: string,
      phone_number: string,
      email: string,
      cmus: number,
    },
    cmus: number,
    status: Transaction_status,
    type: Transaction_type,
  } | null,
};
