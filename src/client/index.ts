import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { CreateUserInput } from '../API';

export const createUser = async (user: CreateUserInput) =>
  await API.graphql(graphqlOperation(mutations.createUser, { input: user }));

export const getAllUser = async () =>
  await API.graphql(graphqlOperation(queries.listUsers));

export const getUser = async (id: String) =>
  await API.graphql(graphqlOperation(queries.getUser, { id }));
