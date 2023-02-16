//APP COMPONENT
export interface Location {
  pathname: string,
  search: string,
  hash: string,
  state: null,
  key: string
}

//APP & LOGIN COMPONENT
export interface currentUser {
  userLogin: {
    emailAddress: string;
    id: string
    location: string;
    userName: string;
    __typename: string;
  }
}

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
export interface User {
  emailAddress: string;
  id: string
  location: string;
  userName: string;
  __typename: string;
}
export interface Value {
  userName: string | any
  emailAddress: string | any
  location: string | any
  id: string | any
}

//BOOKSEARCH COMPONENT
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

//CLICKABLEBOOK COMPONENT & HOME COMPONENT
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
  emailAddress?: string
  location?: string
  contactInfo?: string
  borrowerUsername?: string
}

//MYBOOKS & BORROWEDBOOKS COMPONENT
export interface UserBook {
  id: any
  title: string,
  author: string,
  imageUrl: string
}

//BOOKRESULT & BOOKSEARCH COMPONENT
export interface bookResult {
  imageUrl: string;
  title: string;
  isbn: string;
  author: string;
  pageCount: number;
  summary?: string
  addToLibrary: (isbn: string) => void
}


//MYBOOKS COMPONENT
export interface IdMatch {
  author: string
  borrower: {
    emailAddress: string
    id: string
    userName: string
    location: string
  }[] | any
  id: string
  imageUrl: string
  title: string
}

//PENDING REQUEST COMPONENT
export interface SpecificRequest {
  author: string
  borrower?: {
    emailAddress?: string
    id?: string
    userName?: string
    location?: string
  }
  id: any
  imageUrl: string
  title: string
}

//REQUEST COMPONENT
export interface RequestProps {
  author?: string
  id: string;
  title: string;
  imageUrl: string;
  borrower: any;
  borrowerId: string;
  borrowerLocation: string;
  borrowerEmailAddress: string;
  currentUser: User,
  denyRequest: (bookId: string, borrowerId: string) => void;
  acceptRequest: (bookId: string, borrowerId: string) => void
}

//SERVER ERROR COMPONENT
  export interface message {
    message?: string;
  }
