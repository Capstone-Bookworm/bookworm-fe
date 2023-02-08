import React from "react";

interface UserBook {
  id: number,
  title: string,
  author: string,
  imageUrl: string
}

const LibraryBook = (props: UserBook) => {

  return(
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

export default LibraryBook