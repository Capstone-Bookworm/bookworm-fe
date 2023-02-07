import React from 'react'

interface book {
    id: number
    imageURL: string
}

const Book: React.FC<book> = ({ id, imageURL }): JSX.Element => {
  console.log('IMAGE', imageURL)
  return (
    <div>
      <img src={imageURL} alt="Book cover" />
    </div>
  )
}

export default Book