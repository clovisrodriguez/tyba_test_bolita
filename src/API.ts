/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  cmus: number,
  createdAt?: string | null,
  email: string,
  id?: string | null,
  nickname: string,
  status?: User_status | null,
  transactions: Array< string | null >,
  type?: User_type | null,
  updatedAt?: string | null,
};

export enum User_status {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}


export enum User_type {
  ADMIN_USER = "ADMIN_USER",
  REGULAR_USER = "REGULAR_USER",
  BUSINESS_USER = "BUSINESS_USER",
}


export type UpdateUserInput = {
  cmus?: number | null,
  createdAt?: string | null,
  email?: string | null,
  id: string,
  nickname?: string | null,
  status?: User_status | null,
  transactions?: Array< string | null > | null,
  type?: User_type | null,
  updatedAt?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateTransactionInput = {
  cmus: number,
  createdAt?: string | null,
  fromId: string,
  fromNickName?: string | null,
  id?: string | null,
  tags?: string | null,
  toId: string,
  toNickname?: string | null,
  type: Transaction_type,
  status: Transaction_status,
  updatedAt?: string | null,
};

export enum Transaction_type {
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
  USER_TRANSACTION = "USER_TRANSACTION",
}


export enum Transaction_status {
  SUCCESFUL = "SUCCESFUL",
  PENDING = "PENDING",
  FAILED = "FAILED",
}


export type UpdateTransactionInput = {
  cmus?: number | null,
  createdAt?: string | null,
  fromId?: string | null,
  fromNickName?: string | null,
  id: string,
  tags?: string | null,
  toId?: string | null,
  toNickname?: string | null,
  type?: Transaction_type | null,
  status?: Transaction_status | null,
  updatedAt?: string | null,
};

export type DeleteTransactionInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  cmus?: ModelFloatFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  id?: ModelIDFilterInput | null,
  nickname?: ModelStringFilterInput | null,
  status?: ModelUser_statusFilterInput | null,
  transactions?: ModelIDFilterInput | null,
  type?: ModelUser_typeFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
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

export type ModelUser_statusFilterInput = {
  eq?: User_status | null,
  ne?: User_status | null,
};

export type ModelUser_typeFilterInput = {
  eq?: User_type | null,
  ne?: User_type | null,
};

export type ModelTransactionFilterInput = {
  cmus?: ModelFloatFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  fromId?: ModelIDFilterInput | null,
  fromNickName?: ModelStringFilterInput | null,
  id?: ModelIDFilterInput | null,
  tags?: ModelStringFilterInput | null,
  toId?: ModelIDFilterInput | null,
  toNickname?: ModelStringFilterInput | null,
  type?: ModelTransaction_typeFilterInput | null,
  status?: ModelTransaction_statusFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  not?: ModelTransactionFilterInput | null,
};

export type ModelTransaction_typeFilterInput = {
  eq?: Transaction_type | null,
  ne?: Transaction_type | null,
};

export type ModelTransaction_statusFilterInput = {
  eq?: Transaction_status | null,
  ne?: Transaction_status | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    cmus: number,
    createdAt: string | null,
    email: string,
    id: string,
    nickname: string,
    status: User_status | null,
    transactions: Array< string | null >,
    type: User_type | null,
    updatedAt: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    cmus: number,
    createdAt: string | null,
    email: string,
    id: string,
    nickname: string,
    status: User_status | null,
    transactions: Array< string | null >,
    type: User_type | null,
    updatedAt: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    cmus: number,
    createdAt: string | null,
    email: string,
    id: string,
    nickname: string,
    status: User_status | null,
    transactions: Array< string | null >,
    type: User_type | null,
    updatedAt: string | null,
  } | null,
};

export type CreateTransactionMutationVariables = {
  input: CreateTransactionInput,
};

export type CreateTransactionMutation = {
  createTransaction:  {
    __typename: "Transaction",
    cmus: number,
    createdAt: string | null,
    fromId: string,
    fromNickName: string | null,
    id: string,
    tags: string | null,
    toId: string,
    toNickname: string | null,
    type: Transaction_type,
    status: Transaction_status,
    updatedAt: string | null,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  input: UpdateTransactionInput,
};

export type UpdateTransactionMutation = {
  updateTransaction:  {
    __typename: "Transaction",
    cmus: number,
    createdAt: string | null,
    fromId: string,
    fromNickName: string | null,
    id: string,
    tags: string | null,
    toId: string,
    toNickname: string | null,
    type: Transaction_type,
    status: Transaction_status,
    updatedAt: string | null,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  input: DeleteTransactionInput,
};

export type DeleteTransactionMutation = {
  deleteTransaction:  {
    __typename: "Transaction",
    cmus: number,
    createdAt: string | null,
    fromId: string,
    fromNickName: string | null,
    id: string,
    tags: string | null,
    toId: string,
    toNickname: string | null,
    type: Transaction_type,
    status: Transaction_status,
    updatedAt: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    cmus: number,
    createdAt: string | null,
    email: string,
    id: string,
    nickname: string,
    status: User_status | null,
    transactions: Array< string | null >,
    type: User_type | null,
    updatedAt: string | null,
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
      cmus: number,
      createdAt: string | null,
      email: string,
      id: string,
      nickname: string,
      status: User_status | null,
      transactions: Array< string | null >,
      type: User_type | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTransactionQueryVariables = {
  id: string,
};

export type GetTransactionQuery = {
  getTransaction:  {
    __typename: "Transaction",
    cmus: number,
    createdAt: string | null,
    fromId: string,
    fromNickName: string | null,
    id: string,
    tags: string | null,
    toId: string,
    toNickname: string | null,
    type: Transaction_type,
    status: Transaction_status,
    updatedAt: string | null,
  } | null,
};

export type ListTransactionsQueryVariables = {
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsQuery = {
  listTransactions:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      cmus: number,
      createdAt: string | null,
      fromId: string,
      fromNickName: string | null,
      id: string,
      tags: string | null,
      toId: string,
      toNickname: string | null,
      type: Transaction_type,
      status: Transaction_status,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    cmus: number,
    createdAt: string | null,
    email: string,
    id: string,
    nickname: string,
    status: User_status | null,
    transactions: Array< string | null >,
    type: User_type | null,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    cmus: number,
    createdAt: string | null,
    email: string,
    id: string,
    nickname: string,
    status: User_status | null,
    transactions: Array< string | null >,
    type: User_type | null,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    cmus: number,
    createdAt: string | null,
    email: string,
    id: string,
    nickname: string,
    status: User_status | null,
    transactions: Array< string | null >,
    type: User_type | null,
    updatedAt: string | null,
  } | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction:  {
    __typename: "Transaction",
    cmus: number,
    createdAt: string | null,
    fromId: string,
    fromNickName: string | null,
    id: string,
    tags: string | null,
    toId: string,
    toNickname: string | null,
    type: Transaction_type,
    status: Transaction_status,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction:  {
    __typename: "Transaction",
    cmus: number,
    createdAt: string | null,
    fromId: string,
    fromNickName: string | null,
    id: string,
    tags: string | null,
    toId: string,
    toNickname: string | null,
    type: Transaction_type,
    status: Transaction_status,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction:  {
    __typename: "Transaction",
    cmus: number,
    createdAt: string | null,
    fromId: string,
    fromNickName: string | null,
    id: string,
    tags: string | null,
    toId: string,
    toNickname: string | null,
    type: Transaction_type,
    status: Transaction_status,
    updatedAt: string | null,
  } | null,
};
