import React, { useCallback, useState } from 'react';
import { TextField, Button, Typography, Box, Divider, Grid2 } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { Link } from 'react-router';
import API from '../../api';
import { AxiosError } from 'axios';
import useNotification from '../../hooks/useNotification';

const RegistrationForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ firstName: string; lastName: string; email: string; password: string }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { notifyError } = useNotification();

  const handleSubmit = useCallback((event: React.FormEvent) => {

    event.preventDefault();

    const fn = async () => {
      try {
        const res = await API.register({ firstName, lastName, email, password })
        if (res.status === 201) { throw new Error("Failed to register user") }
        //todo navigate to dashboard
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
  }, [firstName, lastName, email, password]);

  return (
    <Box
      sx={{ maxWidth: 500, margin: '0 auto', padding: 3, background: '#ffffff7d', borderRadius: '10px', }}
    >
      <Typography variant="h4" fontWeight={900} gutterBottom>
        Sign up for an account
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Send, spend and save smarter
      </Typography>

      <Grid2 container justifyContent={'space-between'}>
        <Grid2 size={5}>
          <Button
            variant="outlined"
            fullWidth
            size='small'
            startIcon={<GoogleIcon />}
            sx={{ marginBottom: 1 }}
          >
            Sign In with Google
          </Button>

        </Grid2>
        <Grid2 size={5}>
          <Button
            variant="outlined"
            fullWidth
            size='small'
            startIcon={<AppleIcon />}
            sx={{ marginBottom: 1 }}
          >
            Sign In with Apple
          </Button>
        </Grid2>
      </Grid2>
      <Typography variant='h5' fontSize={18} textAlign={'center'} color='gray' fontWeight={900}>OR With Email</Typography>


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
        >
          Sign Up
        </Button>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          By creating an account, you are agreeing to our{' '}
          <a href="#">Privacy Policy</a> and{' '}
          <a href="#">Electronic Communication Policy</a>.
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Already have an account?
          <Link to={'/login'}>Sign In</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default RegistrationForm;
