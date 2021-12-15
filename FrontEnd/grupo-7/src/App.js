import { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Loading from "./Components/Loading/Loading"
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import ProductPage from './Components/ProductPage/ProductPage';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import BookingPage from './Components/BookingPage/BookingPage.jsx';
import Confirmation from './Components/Confirmation/Confirmation.jsx';
import ProductAdministration from './Components/Administration/ProductsAdministration';
import ProductRegistration from './Components/Administration/ProductRegistration';
import ProductEdition from './Components/Administration/ProductEdition';
import ReservationDetail from './Components/ReservationDetail/ReservationDetail';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import User from './Components/User/User';

import PrivateRoute from './Components/Authentication/PrivateRoute';
import AdminRoute from './Components/Authentication/AdminRoute';

import './Styles/App.scss'

function App() {
  
  const [logged, setLogged] = useState()
  const [id, setId] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (sessionStorage.getItem("name") ) 
        setLogged(true)
    else
        setLogged(false)
  },);

  return (
    <div className="App">
      <Router >
        <Header logged={logged} setLogged={setLogged}/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login button="register" setLogged={setLogged}/>
            </Route>
            <Route exact path="/register">
              <Register button="login" id={id} setLogged={setLogged}/>
            </Route>
            <Route exact path="/product/:id"> 
              <ProductPage setId={setId} />
            </Route>
            {/* RUTAS QUE NECESITAN LOGEARSE */}
            <PrivateRoute exact path="/product/:id/booking">
              <BookingPage  />
            </PrivateRoute>
            <PrivateRoute exact path="/booking">
              <Confirmation icon={faCalendarCheck} text={t('booking_success_title')}/>
            </PrivateRoute>
            <PrivateRoute exact path="/user">
              <User  />
            </PrivateRoute>
            <PrivateRoute exact path="/reservation/:id">
                <ReservationDetail />
            </PrivateRoute>
            {/* RUTAS DE ADMINISTRADOR */}
            <AdminRoute exact path="/success">
              <Confirmation icon={faCalendarCheck} text={t('booking_success_title')} />
            </AdminRoute>
            <AdminRoute exact path="/administration/products">
              <ProductAdministration/>
            </AdminRoute>
            <AdminRoute exact path="/administration/products/register">
              <ProductRegistration  />
            </AdminRoute>
            <AdminRoute exact path="/administration/products/:id/edit">
              <ProductEdition  />
            </AdminRoute>
          </Switch>
        <Footer/>
      <ScrollToTop/>
      </Router>
    </div>
  );
}

export default App;