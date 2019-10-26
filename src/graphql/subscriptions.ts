// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    location
    transactions {
      id
      restaurant
      cost
      productName
      Date
    }
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    location
    transactions {
      id
      restaurant
      cost
      productName
      Date
    }
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    location
    transactions {
      id
      restaurant
      cost
      productName
      Date
    }
  }
}
`;
export const onCreateTransactions = `subscription OnCreateTransactions {
  onCreateTransactions {
    id
    restaurant
    cost
    productName
    Date
  }
}
`;
export const onUpdateTransactions = `subscription OnUpdateTransactions {
  onUpdateTransactions {
    id
    restaurant
    cost
    productName
    Date
  }
}
`;
export const onDeleteTransactions = `subscription OnDeleteTransactions {
  onDeleteTransactions {
    id
    restaurant
    cost
    productName
    Date
  }
}
`;
