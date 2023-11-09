import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksAction } from '../../redux/actions/books/bookAction';
import Loading from '../Loading/Loading';

const Books = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action
    dispatch(fetchBooksAction());
  }, [dispatch]);

  // Grab the data from store
  const { books, loading } = useSelector(state => state.booksList);

  return (
    <div>
      <div className='row'>
        <div className='col'>
          <table className='table table-hover ' >
            <thead>
              <tr>
                <th scope='col' className='text-center'>Author</th>
                <th scope='col' className='text-center'>Book Name</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : (
                <>
                  {books &&
                    books.map(book => {
                      return (
                        <tr className='table-dark' key={book.id}>
                          <th scope='row' className='text-center'>{book.title}</th>
                          <td className='text-center'>{book.author}</td>
                        </tr>
                      );
                    })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Books;
