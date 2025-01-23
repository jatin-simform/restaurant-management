import React, { useCallback, useState } from 'react';
import { TextField, Button, Typography, Box, Divider, FormControlLabel, Checkbox, Grid2 } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import GoogleIcon from '../UI/Icons/GoogleIcon';



const validateLoginForm = (username: string, password: string) => {

  let formIsValid = true;
  const errors = { username: '', password: '' };

  if (!username) {

    errors.username = 'User name  is required.';
    formIsValid = false;

  }

  if (!password) {

    errors.password = 'Password is required.';
    formIsValid = false;

  } else if (password.length < 6) {

    errors.password = 'Password must be at least 6 characters.';
    formIsValid = false;

  }

  return {
    ...errors,
    status: formIsValid
  }

}

const LoginForm: React.FC = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({ username: '', password: '' });
  const { notifyError, notifySuccess } = useNotification()
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback((event: React.FormEvent) => {

    event.preventDefault();

    const res = validateLoginForm(username, password);

    if (res.status) {

      login({ password, username: username });

    } else {

      setErrors({ username: res.username, password: res.password });

    }

  }, [username, password, notifyError, notifySuccess, navigate]);

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 3 }}  >

      <Typography variant="h3" fontSize={32} color="secondary" textAlign='center' fontWeight={900} >
        Sign in to Sego
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
          label="User name"
          fullWidth
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          error={Boolean(errors.username)}
          helperText={errors.username}
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
        <Grid2 container justifyContent={'space-between'}>
          <Grid2 size={6}>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
              label="Remember me"
            />
          </Grid2>
          <Grid2 size={6}>
            <Button type='button' fullWidth variant='text'>
              <Typography variant="body2" align="right" fontWeight={900} fontSize={16} textTransform={'none'} >
                Forgot Password?
              </Typography>
            </Button>
          </Grid2>
        </Grid2>
        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>
        <Divider sx={{ marginY: 2 }} />
        <Box display={'flex'} justifyContent={'space-around'}>
          <Box width={'50%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant="body2" align="center" >
              Don't have an account?
            </Typography>
            <Link to={'/register'} >
              <Typography variant="body2" align="right" fontWeight={900} fontSize={16} textTransform={'none'} >
                Signup
              </Typography>
            </Link>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
