import './LibraryBook.css'
import { UserLibraryBook } from '../../Interfaces'

const LibraryBook: React.FC<UserLibraryBook> = (props) => {
  return(
    <div className="my-book-card">
      <img src={props.imageUrl} alt={`Image of ${props.title}`} className={props.availability ? 'book-available book-img': 'book-unavailable book-img'} />
      <h3 className="book-title">{props.title}</h3>
      {props.availability && <button className="delete-btn" onClick={() => props.deleteSelectedBook(props.id)}>Delete From Library</button>}
      {props.unavailable && <div className='unavailable-info'>
        <h4 className='borrower-intro'>{props.borrowerUsername} is borrowing this book</h4>
        <h5 className='borrower-intro'>Borrower's information:</h5>
        <h6 className='borrower-info'>Location: {props.location}</h6>
        <h6 className='borrower-info'>Email: {props.contactInfo}</h6>
        <button className="return-book-btn" onClick={() => props.returnSelectedBook(props.id)}>Mark book as returned</button>
        </div>}
      {props.pending && <p className='pending-message'>Book in pending</p>}
    </div>
  )
}

export default LibraryBook;