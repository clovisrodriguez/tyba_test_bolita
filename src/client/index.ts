import * as Observable from 'zen-observable';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import {
  CreateUserInput,
  UpdateUserInput,
  ListUsersQueryVariables,
} from '../API';


export const createUser = async (user: CreateUserInput) =>
  await API.graphql(graphqlOperation(mutations.createUser, { input: user }));

export const getAllUser = async (variables: ListUsersQueryVariables) =>
  await API.graphql(graphqlOperation(queries.listUsers, variables));

export const getUser = async (id: String) =>
  await API.graphql(graphqlOperation(queries.getUser, { id }));


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

export const updateUserDB = async (user: UpdateUserInput) =>
  await API.graphql(graphqlOperation(mutations.updateUser, { input: user }));
