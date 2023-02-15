import './LibraryBook.css'
import { UserLibraryBook } from '../../Interfaces'

const LibraryBook = (props: UserLibraryBook) => {
  return(
    <div className="my-book-card">
      <img src={props.imageUrl} alt={`Image of ${props.title}`} className={props.availability ? 'book-available': 'book-unavailable'} />
      <h3 className="book-title">{props.title}</h3>
      {props.availability && <button className="delete-btn" onClick={() => props.deleteSelectedBook(props.id)}>Delete From Library</button>}
      {props.unavailable && <button className="delete-btn" onClick={() => props.returnSelectedBook(props.id)}>Book Returned</button>}
      {props.pending && <p className='pending-message'>Book in pending</p>}
    </div>
  )
}

export default LibraryBook;