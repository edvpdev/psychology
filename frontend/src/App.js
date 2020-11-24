import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Header, Footer } from './components/index'
import { 
  Main, Services, 
  Team, Contact, 
  ArticleScreen, Articles, 
  Specialist, Admin,
  SpecialistEditScreen, SessionEditScreen,
  ArticleEditScreen
} from './screens/index'
import {
  PrivateRoute
} from './hocs/PrivateRoute'

const App = () => {
  return (
    <Router>
      <Header />
      <>
        <Route path="/" exact component={Main} />
        <Route path="/services" exact component={Services} />
        <Route path="/specialists" exact component={Team} />
        <Route path="/contact" exact component={Contact} />
        <Route path='/articles' component={Articles} />
        <Route path='/article/:id' component={ArticleScreen} />
        <Route path='/specialist/:id' component={Specialist} />
        <PrivateRoute path='/admin' exact component={Admin} />
        <PrivateRoute path='/admin/specialistedit/' component={SpecialistEditScreen} />
        <PrivateRoute path='/admin/articleedit/' component={ArticleEditScreen} />
        <PrivateRoute path='/admin/sessionedit/' component={SessionEditScreen} />
      </>
      <Footer />
    </Router>
  )
}

export default App
