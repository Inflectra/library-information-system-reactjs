// libraries
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// components
import DataPage from './components/DataPage.jsx' 
import Home from './home.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'

// data
import { authorsMeta } from './data/authors'
import { booksMeta } from './data/books'

// Main page has routes to show different 'pages'
// new vars for each component are creating to make the route creation easier - allow standard route creation
// react-router does not make it easy to add a component with lots of props to a route, so this approach works well
// custom PrivateRoute used to handle pages requiring authentication
const Main = (props) => {

  const booksPage = () => <DataPage
    data={props.books}
    dataChange={props.bookChange}
    dataCancelEdit={props.bookCancelEdit}
    dataDelete={props.bookDelete}
    dataEditingId={props.booksEditingId}
    dataSetEdit={props.bookSetEdit}
    dataUpdate={props.bookUpdate}
    dataAddStart={props.bookAddStart}
    meta={booksMeta}
    permission={props.permission}
    textTitle="The following books exist in the system:"
    textAdd="create new book"
  />;
  const authorsPage = () => <DataPage
    data={props.authors}
    dataChange={props.authorChange}
    dataCancelEdit={props.authorCancelEdit}
    dataDelete={props.authorDelete}
    dataEditingId={props.authorsEditingId}
    dataSetEdit={props.authorSetEdit}
    dataUpdate={props.authorUpdate}
    dataAddStart={props.authorAddStart}
    meta={authorsMeta}
    permission={props.permission}
    textTitle="The following authors exist in the system:"
    textAdd="create new author"
  />;
  const homePage = () => <Home 
    authHandler={props.authHandler}
    authMessage={props.authMessage}
    permission={props.permission}
  />;



  return (
    <main className="container">
      <Switch>
        <Route  
          component={homePage}
          exact 
          path='/' 
          />
        <PrivateRoute 
          authed={props.permission}
          component={booksPage}
          path='/books' 
          />
        <PrivateRoute 
          authed={props.permission}
          component={authorsPage}
          path='/authors' 
          />
          <Redirect to="/" />
      </Switch>
    </main>
  )
}

export default Main