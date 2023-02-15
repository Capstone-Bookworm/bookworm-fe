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

//ADDBOOK COMPONENT
export interface Books {
  isbn: Number,
  title: String,
  author: String,
  imageUrl: String,
  summary: String,
  pageCount: Number
}

//BOOKDETAILS COMPONENT
export interface details {
  title: string
  summary: string
  author: string
  pageCount: number
  imageUrl: string
  users: {
    userName: string
    emailAddress: string
    location: string
  }[]
}

//BOOK SEARCH COMPONENT
export interface Books {
  searchResults: Book[],
}

export interface Book {
  isbn: string,
  title: string,
  author: string,
  imageUrl: string,
  summary: string,
  pageCount: number
}

//CLICKABLE BOOK COMPONENT & HOME COMPONENT
export interface bookProp {
  id: number
  imageUrl: string
}

//LIBRARY BOOK COMPONENT
export interface UserLibraryBook {
  id: number,
  title: string,
  author: string,
  imageUrl: string,
  availability: boolean,
  unavailable: boolean,
  pending: boolean,
  deleteSelectedBook: any
  returnSelectedBook: any
}

//MYBOOKS COMPONENT
export interface UserBook {
  id: number,
  title: string,
  author: string,
  imageUrl: string
}

//SERVER ERROR COMPONENT
export interface message {
  message?: string;
}


//BOOK RESULT COMPONENT
export interface bookResult {
  imageUrl: string;
  title: string;
  isbn: string;
  author: string;
  pageCount: number;
  addToLibrary: (isbn: string) => void
}

//REQUEST COMPONENT
export interface RequestProps {
  id: string;
  title: string;
  imageUrl: string;
  borrower: string;
  borrowerId: string;
  borrowerLocation: string;
  borrowerEmailAddress: string;
  currentUser: User,
  denyRequest: (bookId: string, borrowerId: string) => void;
  acceptRequest: (bookId: string, borrowerId: string) => void
}