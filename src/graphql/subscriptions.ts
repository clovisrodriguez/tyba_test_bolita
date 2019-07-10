// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    type
    nickname
    phone_number
    email
    cmus
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    type
    nickname
    phone_number
    email
    cmus
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    type
    nickname
    phone_number
    email
    cmus
  }
}
`;
export const onCreateTransactions = `subscription OnCreateTransactions {
  onCreateTransactions {
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
export const onUpdateTransactions = `subscription OnUpdateTransactions {
  onUpdateTransactions {
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
export const onDeleteTransactions = `subscription OnDeleteTransactions {
  onDeleteTransactions {
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
