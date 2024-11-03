'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock
} from '@mui/icons-material';
import styles from './login.module.css';

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      if (formData.email === 'admin@123.com' && formData.password === '123456') {
        document.cookie = 'isLoggedIn=true; path=/';
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/character');
        }, 1000);
      } else {
        setError('邮箱或密码错误');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('两次输入的密码不一致');
        return;
      }
      setError('注册功能暂未开放');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box className={styles.pageContainer}>
      {/* 动画背景 */}
      <div className={styles.animatedBg}></div>
      
      <Container component="main" maxWidth="xs">
        <Box className={styles.mainContent}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              gutterBottom
              sx={{ 
                mb: 3,
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                fontFamily: "'Noto Sans SC', sans-serif",
              }}
            >
              AI助手酱
            </Typography>

            <Tabs
              value={isLogin ? 0 : 1}
              onChange={(_, newValue) => {
                setIsLogin(newValue === 0);
                setError('');
                setFormData({ email: '', password: '', confirmPassword: '' });
              }}
              variant="fullWidth"
              sx={{ 
                mb: 4,
                '& .MuiTab-root': {
                  color: '#FF6B6B',
                  fontFamily: "'Noto Sans SC', sans-serif",
                  fontWeight: 'bold',
                },
                '& .Mui-selected': {
                  color: '#FF6B6B !important',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#FF6B6B',
                }
              }}
            >
              <Tab label="登录" />
              <Tab label="注册" />
            </Tabs>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  animation: 'shake 0.5s'
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="邮箱地址"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleInputChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#FF6B6B',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF6B6B',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#FF6B6B' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#FF6B6B',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF6B6B',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#FF6B6B' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? 
                          <VisibilityOff sx={{ color: '#FF6B6B' }} /> : 
                          <Visibility sx={{ color: '#FF6B6B' }} />
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {!isLogin && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="确认密码"
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#FF6B6B',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6B6B',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#FF6B6B' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                  border: 0,
                  borderRadius: 3,
                  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                  color: 'white',
                  height: 48,
                  padding: '0 30px',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FE4A4A 30%, #FF7043 90%)',
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                {isLogin ? '登录' : '注册'}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%',
            background: '#4ECDC4',
            color: 'white'
          }}
        >
          登录成功！
        </Alert>
      </Snackbar>

      {/* 装饰元素 */}
      <div className={styles.decorativeElement1}></div>
      <div className={styles.decorativeElement2}></div>
    </Box>
  );
} 