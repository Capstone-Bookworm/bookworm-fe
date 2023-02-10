export interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}

export interface User {
  userName: string;
  location: string;
  emailAddress: string;
  __typename: string;
  id: number
}