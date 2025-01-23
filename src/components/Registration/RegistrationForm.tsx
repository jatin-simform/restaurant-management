import React, { useCallback, useState } from 'react';
import { TextField, Button, Typography, Box, Divider, Grid2 } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import { Link, useNavigate } from 'react-router';
import API from '../../api';
import { AxiosError } from 'axios';
import useNotification from '../../hooks/useNotification';
import GoogleIcon from '../UI/Icons/GoogleIcon';

const RegistrationForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ firstName: string; lastName: string; email: string; password: string }>({ firstName: '', lastName: '', email: '', password: '', });

  const { notifyError, notifySuccess } = useNotification();

  const handleSubmit = useCallback((event: React.FormEvent) => {

    event.preventDefault();

    const fn = async () => {
      try {
        const res = await API.register({ firstName, lastName, email, password })
        if (res.status !== 201) { throw new Error("Failed to register user") }
        notifySuccess("Registration done successfully !")
        navigate("/login")
        return;
      } catch (e: unknown) {

        if (e instanceof AxiosError) {
          notifyError("Something went wrong")
        }

        console.error(e)
      }

    }

    let formIsValid = true;
    const newErrors = { firstName: '', lastName: '', email: '', password: '' };

    if (!firstName) {
      newErrors.firstName = 'First name is required.';
      formIsValid = false;
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required.';
      formIsValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required.';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      formIsValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {

      fn();

    }
  }, [firstName, lastName, email, password,notifyError,notifySuccess]);

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 3 }}  >
      <Typography variant="h3" fontSize={32} color="secondary" textAlign='center' fontWeight={900} >
        Sign up for an account
      </Typography>
      <Typography variant="body1" color="textSecondary" textAlign={'center'} padding={3} gutterBottom>
        Effortless Dining, Exceptional Service.
      </Typography>

      <Grid2 container justifyContent={'space-between'} spacing={1}>
        <Grid2 size={{ sm: 6, md: 6, xs: 12 }}>
          <Button variant="outlined" fullWidth size='large' style={{ textTransform: 'none' }} startIcon={<GoogleIcon />}>
            Sign In with Google
          </Button>
        </Grid2>
        <Grid2 size={{ sm: 6, md: 6, xs: 12 }}>
          <Button variant="outlined" fullWidth size='large' style={{ textTransform: 'none' }} startIcon={<AppleIcon style={{ color: 'black' }} />}>
            Sign In with Apple
          </Button>
        </Grid2>
      </Grid2>
      <Box display={'flex'} padding={2} justifyContent={'space-around'}>
        <Box height={10} borderColor={'lightgrey'} borderBottom={1} width={'25%'}></Box>
        <Box><Typography variant='h5' fontSize={18} textAlign={'center'} color='gray' >OR With Email</Typography></Box>
        <Box height={10} borderColor={'lightgrey'} borderBottom={1} width={'25%'} ></Box>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          margin="normal"
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          size='large'
        >
          Sign Up
        </Button>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          By creating an account, you are agreeing to our{' '}
          <a href="#">Privacy Policy</a> and{' '}
          <a href="#">Electronic Communication Policy</a>.
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Box display={'flex'} justifyContent={'space-around'}>
          <Box width={'50%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant="body2" align="center" >
              Already have an account?
            </Typography>
            <Link to={'/login'} >
              <Typography variant="body2" align="right" fontWeight={900} fontSize={16} textTransform={'none'} >
                Signin
              </Typography>
            </Link>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default RegistrationForm;
