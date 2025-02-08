// import React, { useContext } from 'react';
// import { WantToReadContext } from '../context/WantToReadContext';
// import BookItem from '../components/BookItem';
// import './WantToRead.css'; // Import the CSS file

// const WantToRead: React.FC = () => {
//   const { wantToRead, removeFromWantToRead } = useContext(WantToReadContext);

//   return (
//     <section className="want-to-read-container">
//       <h1>Want to Read</h1>
//       <div className="search-results">
//         {wantToRead.map((book) => (
//           <BookItem
//             key={book.id}
//             book={book}
//             buttonText="Remove"
//             buttonClass="btn-danger remove-from-want-to-read"
//             onButtonClick={() => removeFromWantToRead(book.id)}
//             onWantToReadClick={() => {}} // No action needed for "Want to Read" button here
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default WantToRead;