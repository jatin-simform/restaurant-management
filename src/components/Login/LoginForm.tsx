import React, { useCallback, useState } from 'react';
import { TextField, Button, Typography, Box, Divider, FormControlLabel, Checkbox, Grid2 } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';



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
      <Typography variant="h5" gutterBottom>
        Sign in to Take it Cheezy
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
          <Grid2 size={5}>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
              label="Remember me"
            />

          </Grid2>
          <Grid2 size={5}>
            <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
              <a href="#">Forgot Password?</a>
            </Typography>
          </Grid2>
        </Grid2>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Sign In
        </Button>



        <Divider sx={{ marginY: 2 }} />

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Don't have an account?
          <Link to={'/register'}>Sign Up</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginForm;
