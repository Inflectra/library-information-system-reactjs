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
// To ensure authentication stops pages being acccessed when logged out, render function in some routes have a ternary operator checking for logged in status
// there are custom components to handle this, but you need to render the DataPage component directly in the route to ensure you can properly edit fields
const Main = (props) => {

  return (
    <main className="container">
      <Switch>
        <Route  
          render={() =>
            <Home 
              authHandler={props.authHandler}
              authMessage={props.authMessage}
              permission={props.permission}
            />
          }
          exact 
          path='/' 
          />
        <Route 
          render={ () => 
            props.permission ? 
            <DataPage
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
            />
            : 
            <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }}/>
          }
          path='/books' 
          />
        
        <Route 
          render={ () => 
            props.permission ? 
            <DataPage
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
            />
            : 
            <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }}/>
          }
          path='/authors' 
          />
        
        <Redirect to="/" />
      </Switch>
    </main>
  )
}

export default Main