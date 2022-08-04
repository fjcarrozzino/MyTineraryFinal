import { Routes, Route, useLocation } from 'react-router-dom';
import ResponsiveAppBar from './components/AppBar';
import Footer from './components/Footer';
import './styles/App.css';
import Home from './pages/Home'
import Cities from './pages/Cities';
import SignInSide from './pages/SignIn';
import SignUp from './pages/SignUp';
import ScrollToTopRefresh from './components/ScrollToTopRefresh';
import CityInfo from './pages/CityInfo';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ScrollToTop from 'react-scroll-to-top'
import { useEffect } from 'react';
import citiesActions from './redux/actions/citiesActions';
import { useDispatch, useSelector } from 'react-redux';
import userActions from './redux/actions/userActions';
import Validate from './pages/Validate';
import { Toaster } from 'react-hot-toast'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(citiesActions.getCities())
    
    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem("token")
      dispatch(userActions.VerificarToken(token))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const user = useSelector(store => store.userReducer.user)

  const path = useLocation().pathname

  return (
    <div className="App">
        <Toaster
        toastOptions={{
          className: '',
          duration: "300",
          position: "bottom-left",
          style: {
            boxShadow: "0px 3px 10px rgba(8, 8, 8, 0.413)",
            padding: '8px',
            color: 'black',
            textAlign: "center",
            fontSize: "13px",
          },
        }} />
        <ScrollToTopRefresh/>
        {path !== "login" ?  <ResponsiveAppBar/> :  null}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cities" element={<Cities/>}/>
          { !user && <Route path="/signup" element={<SignUp/>}/>}
          { !user && <Route path="/login" element={<SignInSide/>}/>}
          <Route path="/validation" element={<Validate/>}/>
          <Route path="/cities/:id" element={<CityInfo/>}/>
        </Routes>
        <ScrollToTop smooth component={<ArrowUpwardIcon/>} />
        {path !== "/login" && path !== "/signup" ?  <Footer/> :  null}
    </div>
  );
}

export default App;
