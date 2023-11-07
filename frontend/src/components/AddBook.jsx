import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBookAction } from "../redux/actions/books/bookAction";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  //handle form submit
  const dispatch = useDispatch();
  const handleForm = (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      category,
    };
    dispatch(createBookAction(data));
    setTitle("");
    setAuthor("");
    setCategory("");
  };

  return (
    <div className="row container-height">
      <div className="col-lg-6 col-md-6 m-auto">
        <div className="container">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Click to add Book.
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Create Book
                  </h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                        setTitle("");
                        setAuthor("");
                        setCategory("");
                        }}
                    />
                </div>
                <div className="modal-body">
                  <h1 className="text-center">Add Book</h1>
                  <form onSubmit={handleForm}>
                    <fieldset>
                      <div className="form-group">
                        <select
                          className="custom-select"
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        >
                          <option defaultValue="programming">CS</option>
                          <option value="religion">Religion</option>
                          <option value="life">Life</option>
                          <option value="culture">Culture</option>
                          <option value="science">Science</option>
                          <option value="history">History</option>
                          <option value="politics">Politics</option>
                          <option value="health">Health</option>
                          <option value="art">Art</option>
                          <option value="sports">Sports</option>
                          <option value="travel">Travel</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Author </label>
                        <input
                          value={author}
                          onChange={(e) => {
                            setAuthor(e.target.value);
                          }}
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Author name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">title</label>
                        <input
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Book title"
                        />
                      </div>
                      <button type="submit" className="btn btn-warning m-auto">
                        Create Book
                      </button>
                    </fieldset>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => {
                        setTitle("");
                        setAuthor("");
                        setCategory("");
                        }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
