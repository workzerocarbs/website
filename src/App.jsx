/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import '../src/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Aos from 'aos'
import 'aos/dist/aos.css'
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Menu from './pages/menu/Menu';
import Footer from './components/footer/Footer';
import Terms from './pages/terms-conditions/Terms';
import Privacy from './pages/privacy-policy/Privacy';
import Return from './pages/return-policy/Return';
import Refund from './pages/refund-policy/Refund';
import Shipping from './pages/shipping-policy/Shipping';
import Payment from './pages/payment/Payment';
import OrderConfirmation from './pages/orderconfirmation/OrderConfirmation';
import Diet from './pages/diet/Diet';
import OrderDetails from './pages/order-details/OrderDetails';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const params = new URLSearchParams(search);
    const scrollTo = params.get('scrollTo');
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, search]);

  return null;
};

function App() {

  useEffect(() => {
    Aos.init()
  })

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/menu" exact element={<Menu />} />
        <Route path="/terms-condition" exact element={<Terms />} />
        <Route path="/privacy-policy" exact element={<Privacy />} />
        <Route path="/return-policy" exact element={<Return />} />
        <Route path="/refund-policy" exact element={<Refund />} />
        <Route path="/shipping-policy" exact element={<Shipping />} />
        <Route path="/payment" exact element={<Payment />} />
        <Route path='/order-placed' exact element={<OrderConfirmation/>}/>
        <Route path='/diet' exact element={<Diet/>}/>
        <Route path='/order-details' exact element={<OrderDetails/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;

