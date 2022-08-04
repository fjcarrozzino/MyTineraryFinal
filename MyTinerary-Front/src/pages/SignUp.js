import '../styles/Cities.css'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userActions from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../styles/signUp.css'
import GoogleSignUp from '../components/GoogleSignUp';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { FormControl, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        MyTinerary
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [urlImage, setUrlImage] = React.useState('')
  const [passwordEyeTrigger, setPasswordEyeTrigger] = React.useState(true)
  const [selectCountries, setSelectCountries] = React.useState("unselected")
  const [country, setCountry] = React.useState([])
  const [listCountries, setListCountries] = React.useState([])

  React.useEffect(() => {
    const fetchCountries = async () => {

      const result = await axios.get("https://restcountries.com/v3.1/all")
      setCountry(result.data)
  
    }
    fetchCountries()
  },[])

  React.useEffect(() => {
    const showEveryCountry =  () => {
      const countryName = country.length ? country.map((anycountry) => anycountry.name.common).sort() : []
      const everyCountry = ["Unselected", ...countryName]
      setListCountries(everyCountry)

    }
    showEveryCountry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectCountries, country])

  let passwordType = passwordEyeTrigger ? 'password' : 'text'

  function selected(event) {
    setSelectCountries(event.target.value)
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      urlImage: urlImage,
      from: "form-Signup",
      country: selectCountries
    }
    const res = await dispatch(userActions.signUpUser(userData))
    const errormsg = res.data.message

    if(res.data.from === "validator"){

      errormsg.forEach(e => {
        toast.error(e.message)
    })
    } 


    if (res.data.from === "form-Signup") {
      if(res.data.success){
          navigate("/", {replace: true})
          toast.success(res.data.message)
      }else{
          toast.error(res.data.message)
      }
  }
  }
  
  
  return (
    <>
     <div className={selectCountries === "unselected" ? "select-div" : "select-div-none"}>
      <FormControl size="small" sx={{minWidth: 120}}>
        <Select sx={{fontSize: "1.5rem", padding: 0, textAlign: "center"}} id="list-country" labelId="list-country-label" value="Unselected" className='select' onChange={selected}>
          {listCountries.map((country, index) => 
          <MenuItem sx={{maxHeight: "2rem"}} key={index} value={country}> {country}</MenuItem>
          )}
        </Select>
        </FormControl>
        <h2> Please Select a country</h2>
      </div>
    {selectCountries !== "unselected" ? 
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                onChange={event => setFirstName(event.target.value)}
                value={firstName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                autoComplete="family-name"
                onChange={event => setLastName(event.target.value)}
                value={lastName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
              <Box>
              <TextField
                className='hola'
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={passwordType}
                id="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
                value={password}
              />
              <span className='password-eye' onClick={ () => setPasswordEyeTrigger(!passwordEyeTrigger)}> { passwordType === "password" ? <VisibilityIcon/> : <VisibilityOffIcon/>  }</span>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                name="urlImage"
                label="Picture (url)"
                type="text"
                id="urlImage"
                onChange={event => setUrlImage(event.target.value)}
                value={urlImage}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
              </Button>
              <Box className='div-face-google'>
                <div className='google-signup'>
              <GoogleSignUp country={selectCountries}/>
                </div>
              </Box>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Log In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider> : null}
    </>
  );
}