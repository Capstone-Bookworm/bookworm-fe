export interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}

export interface User {
  emailAddress: string;
  id: string
  location: string;
  userName: string;
  __typename: string;
}

export interface currentUser {
  userLogin: {
    emailAddress: string;
    id: string
    location: string;
    userName: string;
    __typename: string;
  }
}

// export interface CurrentUser {
//   userName?: string ;
//   location?: string;
//   id?: string;
//   emailAddress?: string;
//   __typename?: string; 
// }

//ADD BOOK COMPONENT
export interface Books {
  isbn: Number,
  title: String,
  author: String,
  imageUrl: String,
  summary: String,
  pageCount: Number
}
