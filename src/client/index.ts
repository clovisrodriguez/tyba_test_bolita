import * as Observable from 'zen-observable';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import {
  CreateUserInput,
  CreateTransactionsInput,
  UpdateTransactionsInput,
  UpdateUserInput
} from '../API';

export const createUser = async (user: CreateUserInput) =>
  await API.graphql(graphqlOperation(mutations.createUser, { input: user }));

export const updateUserDB = async (user: UpdateUserInput) =>
  await API.graphql(graphqlOperation(mutations.updateUser, { input: user }));

export const getAllUser = async () =>
  await API.graphql(graphqlOperation(queries.listUsers));

export const getUser = async (id: String) =>
  await API.graphql(graphqlOperation(queries.getUser, { id }));

export const createTransaction = async (transaction: CreateTransactionsInput) =>
  await API.graphql(
    graphqlOperation(mutations.createTransactions, { input: transaction })
  );

export const updateTransaction = async (transaction: UpdateTransactionsInput) =>
  await API.graphql(
    graphqlOperation(mutations.updateTransactions, {
      input: transaction
    })
  );

export const onUpdateTransactionSubscription = API.graphql(
  graphqlOperation(subscriptions.onUpdateTransactions)
) as Observable<any>;
