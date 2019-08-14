import * as Observable from 'zen-observable';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import {
  CreateUserInput,
  CreateTransactionInput,
  UpdateTransactionInput,
  UpdateUserInput
} from '../API';

export const createTransaction = async (transaction: CreateTransactionInput) =>
  await API.graphql(
    graphqlOperation(mutations.createTransaction, { input: transaction })
  );

export const createUser = async (user: CreateUserInput) =>
  await API.graphql(graphqlOperation(mutations.createUser, { input: user }));

export const getAllUser = async () =>
  await API.graphql(graphqlOperation(queries.listUsers));

export const getTransactions = async () => 
  await API.graphql(graphqlOperation(queries.listTransactions))

export const getUser = async (id: String) =>
  await API.graphql(graphqlOperation(queries.getUser, { id }));

export const onUpdateTransactionSubscription = API.graphql(
  graphqlOperation(subscriptions.onUpdateTransaction)
) as Observable<any>;

export const onUpdateUserSuscription = async (user: UpdateUserInput) => {
  const updateUserListener = API.graphql(
    graphqlOperation(subscriptions.onUpdateUser)
  ) as Observable<any>;
  let newStateUser;

  await updateUserListener.subscribe({
    next: user => {
      newStateUser = user.value.data.onUpdateUser;
    }
  });

  if (user.id === newStateUser.id) {
    return newStateUser;
  }
};

export const updateTransaction = async (transaction: UpdateTransactionInput) =>
  await API.graphql(
    graphqlOperation(mutations.updateTransaction, {
      input: transaction
    })
  );

export const updateUserDB = async (user: UpdateUserInput) =>
  await API.graphql(graphqlOperation(mutations.updateUser, { input: user }));
