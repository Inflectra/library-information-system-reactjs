// libraries
import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

// components
import Header from './header.jsx';
import Main from './main.jsx';

// data
import users from './data/users';
import permissions from './data/permissions';
import { books, booksMeta, Book } from './data/books';
import { authors, authorsMeta, Author } from './data/authors';
import genres from './data/genres';



/*
 * =============
 * APP COMPONENT
 * =============
 * 
 * state manager for application and simple wrapper for UI components
 * 
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user login information, permissions enum val, and authentican message
      // permissions initially set to none (0) to ensure not logged in
      permission: permissions.none,
      authMessage: "",
      user: {},
      
      // books data - when editing, store the ID and index in the book array of the in-edit item
      // backup is used to keep a snapshot before editing an item, so can easily revert if not saving changes
      books: books,
      booksEditingId: 0,
      booksEditingIndex: null,
      booksBackup: books,
      booksMeta: JSON.parse(JSON.stringify(booksMeta)),

      // authors data - when editing, store the ID and index in the author array of the in-edit item
      // backup is used to keep a snapshot before editing an item, so can easily revert if not saving changes
      authors: authors,
      authorsEditingId: 0,
      authorsEditingIndex: null,
      authorsBackup: authors,
    };


    // bind all of the state management functions
    // auth
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

    // books
    this.bookChange = this.bookChange.bind(this);
    this.bookCancelEdit = this.bookCancelEdit.bind(this);
    this.bookDelete = this.bookDelete.bind(this);
    this.bookSetEdit = this.bookSetEdit.bind(this);
    this.bookUpdate = this.bookUpdate.bind(this);
    this.bookAddStart = this.bookAddStart.bind(this);

    // authors
    this.authorChange = this.authorChange.bind(this);
    this.authorCancelEdit = this.authorCancelEdit.bind(this);
    this.authorSetEdit = this.authorSetEdit.bind(this);
    this.authorUpdate = this.authorUpdate.bind(this);
    this.authorAddStart = this.authorAddStart.bind(this);

  }



  /*
   * ==============
   * AUTHENTICATION
   * ==============
   */

  // manages getting login info from form, verifying it, setting relevant state
  // @param: - formData - object of username and password from login form
  authHandler(formData) {
    // first make sure form is fully filled in
    if (!formData.username && !formData.password) {
      this.setState({ authMessage: "Please provide login details" });
    } else if (formData.username && !formData.password) {
      this.setState({ authMessage: "Password required" });
    } else if (!formData.username && formData.password) {
      this.setState({ authMessage: "Username required" });
    
    // then look for a username match
    } else if (formData.username && formData.password) {
      const userMatch = users.filter(name => name.username == formData.username)[0];
      if (userMatch) {
        // check the password
        if (userMatch.password === formData.password) {
          // check for active status
          if (userMatch.active) {
            // if correct details and active, log them in
            this.setState({ 
              authMessage: "",
              permission: userMatch.permission,
              user: userMatch
             })
          // if can't log in provide relevant message to user
          } else {
            this.setState({ authMessage: "Sorry, this user is no longer active" });
          }
        } else {
          this.setState({ authMessage: "Login attempt not successful. Please try again." });
        }
      } else {
        this.setState({ authMessage: "User does not exist" });
      }
    }
  };

  // manages logout of a logged in user
  // all that is needed is to reset the permissions enum and user obhect
  logout() {
    this.setState({ 
      permission: permissions.none,
      user: {},
     });
  }



  /*
   * ===============
   * BOOK MANAGEMENT
   * ===============
   */

  // on 'edit' click on data table, set the row to edit
  // set state on the editing id - used for managing UI logic, store the index to save on calculations
  // also take static copy of current array to allow easy reversion 
  // @param: id - int from UI about the relevant entry
  bookSetEdit(id) {
    const newArray = JSON.parse(JSON.stringify(this.state.books));
    const editingIndex = newArray.map(book => book.id).indexOf(id);
    this.setState({ booksEditingId: id, booksEditingIndex: editingIndex, booksBackup: newArray });
  }

  // when in edit mode, can cancel the edit, and revert any changes made
  // reset editing properties, and switch main books state to the saved backup 
  // @param: id - int from UI about the relevant entry
  bookCancelEdit(id) {
    const newArray = JSON.parse(JSON.stringify(this.state.booksBackup));
    this.setState({ booksEditingId: 0, booksEditingIndex: null, books: this.state.booksBackup });
  }

  // when in edit mode, save changes back to main state
  // because state is being update on any change anyway, just need to turn off edit mode
  // no need to do anything with the backup - it will stay as pre edit, and will be updated on next edit, if any 
  // @param: id - int from UI about the relevant entry
  bookUpdate(id) {
    this.setState({
      booksEditingId: 0, 
      booksEditingIndex: null
    });
  }

  // deleting a book is really a soft delete - set it's active key to false
  // this is both consistent with how a DB may work, and makes it easier to add books and ensure unique IDs 
  // @param: id - int from UI about the relevant entry
  bookDelete(id) {
    const newArray = this.state.books;
    const toDelete = newArray.map(book => book.id).indexOf(id);
    newArray[toDelete].active = false;
    this.setState({books: newArray});
  }

  // updates the books state array on any change event of an editable field 
  // @param: prop - string of the property being edited
  // @param: e - event from the DOM element
  bookChange(prop, e) {
    let newArray = this.state.books;
    newArray[this.state.booksEditingIndex][prop] = e.target.value;
    this.setState({books: newArray});
  }

  // adds a new entry to the array and puts it into edit mode
  // it creates a backup copy of books, then updates the working books state with a new Book entry
  // this is both consistent with how a DB may work, and makes it easier to add books and ensure unique IDs 
  bookAddStart() {
    let newItem = new Book(),
      newArray = this.state.books,
      oldArray = JSON.parse(JSON.stringify(this.state.books)),
      newId = this.state.books.length + 1,
      now = new Date(),
      currentDate_US = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    
    // the ID of the new item is set to the length of the array, and the date added is set to today
    newItem.id = newId;
    newItem.dateAdded = currentDate_US
    newArray.push(newItem);
    // make sure to put the new book into edit mode - any saving / cancelling is then picked up by those standard functions
    this.setState({
      booksEditingId: newId, 
      booksEditingIndex: newId - 1, 
      booksBackup: oldArray, 
      books: newArray
    });
  }



  /*
   * =================
   * AUTHOR MANAGEMENT
   * =================
   * 
   * see comments for equivalent functions for books - these are effective copies
   * note: there's no delete function for authors, as that would corrupt any book entries with that author
   */

  authorSetEdit(id) {
    const newArray = JSON.parse(JSON.stringify(this.state.authors));
    const editingIndex = newArray.map(author => author.id).indexOf(id);
    this.setState({ authorsEditingId: id, authorsEditingIndex: editingIndex, authorsBackup: newArray });
  }
  authorCancelEdit(id) {
    const newArray = JSON.parse(JSON.stringify(this.state.authorsBackup));
    this.setState({ authorsEditingId: 0, authorsEditingIndex: null, authors: this.state.authorsBackup });
  }

  // additionally, on save of authors update booksMeta with correct authors data
  authorUpdate(id) {
    let newBooksMeta = JSON.parse(JSON.stringify(this.state.booksMeta));
    newBooksMeta.author.dropdown = this.state.authors;
    this.setState({
      authorsEditingId: 0, 
      authorsEditingIndex: null,
      booksMeta: newBooksMeta
    });
  }
  authorChange(prop, e) {
    let newArray = JSON.parse(JSON.stringify(this.state.authors));
    newArray[this.state.authorsEditingIndex][prop] = e.target.value;
    this.setState({authors: newArray});
  }
  authorAddStart() {
    let newItem = new Author(),
      newArray = this.state.authors,
      oldArray = JSON.parse(JSON.stringify(this.state.authors)),
      newId = this.state.authors.length + 1;
    newItem.id = newId;
    newArray.push(newItem);
    this.setState({
      authorsEditingId: newId, 
      authorsEditingIndex: newId - 1, 
      authorsBackup: oldArray, 
      authors: newArray
    });
  }



  /*
   * =========
   * RENDERING
   * =========
   * 
   * Header: handles nav, routing links, and displays login information
   * Main: routing switch for the pages - hence requires lots of props passed through
   * 
   */

  render() {
    return (
      <div>
        <Header 
          logout={this.logout}
          permission={this.state.permission} 
          user={this.state.user}
          />
        <Main 
          // used by all pages
          permission={this.state.permission} 

          // for home page
          authHandler={this.authHandler} 
          authMessage={this.state.authMessage}

          // for books page
          books={this.state.books.filter(book => book.active)}
          booksEditingId={this.state.booksEditingId}
          bookDelete={this.bookDelete}
          bookSetEdit={this.bookSetEdit}
          bookCancelEdit={this.bookCancelEdit}
          bookChange={this.bookChange}
          bookUpdate={this.bookUpdate}
          bookAddStart={this.bookAddStart}
          booksMeta={this.state.booksMeta}

          // for authors page
          authors={this.state.authors}
          authorsEditingId={this.state.authorsEditingId}
          authorSetEdit={this.authorSetEdit}
          authorCancelEdit={this.authorCancelEdit}
          authorChange={this.authorChange}
          authorUpdate={this.authorUpdate}
          authorAddStart={this.authorAddStart}
          authorsMeta={authorsMeta}
          />
      </div>
    );
  }
}

// render using BrowserRouter to let react router handle what it needs
render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));