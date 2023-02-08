import React from "react";

interface UserBook {
  id: number,
  title: string,
  author: string,
  imageUrl: string
}

const LibraryBook = (props: UserBook) => {
  console.log(props)
  return(
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

export default LibraryBook