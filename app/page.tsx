'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box,
  Paper,
  Avatar,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import ChatIcon from '@mui/icons-material/Chat';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState('/images/default_avatar.png'); // 默认头像

  useEffect(() => {
    // 检查登录状态
    const loggedIn = document.cookie.includes('isLoggedIn=true');
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      // 如果已登录，获取用户头像（可以从 localStorage 或 cookie 中获取）
      const avatar = localStorage.getItem('userAvatar') || '/images/default_avatar.png';
      setUserAvatar(avatar);
    }
  }, [router]);

  const handleLogout = () => {
    // 清除登录状态
    document.cookie = 'isLoggedIn=false; path=/';
    localStorage.removeItem('userAvatar'); // 清除头像
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <Box className={styles.pageContainer}>
      {/* 动画背景 */}
      <div className={styles.animatedBg}></div>
      
      <AppBar position="static" sx={{ 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <Toolbar>
          <ChatIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              color: theme.palette.primary.main,
              fontFamily: "'Noto Sans SC', sans-serif",
              fontWeight: 'bold'
            }}
          >
            AI助手酱
          </Typography>
          {isLoggedIn ? (
            <Avatar 
              src={userAvatar} 
              alt="User Avatar" 
              sx={{ width: 40, height: 40, cursor: 'pointer' }} 
              onClick={handleLogout} // 点击头像退出登录
            />
          ) : (
            <Button 
              component={Link} 
              href="/login"
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                height: 40,
                padding: '0 30px',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FE4A4A 30%, #FF7043 90%)',
                }
              }}
            >
              登录
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className={styles.mainContent}>
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Paper 
            elevation={3}
            sx={{
              p: 6,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              className={styles.mainTitle}
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              欢迎来到 AI助手酱
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              paragraph
              sx={{
                fontFamily: "'Noto Sans SC', sans-serif",
                mb: 4
              }}
            >
              让我们一起探索AI的奇妙世界吧！
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              href="/character"
              className={styles.startButton}
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                height: 48,
                padding: '0 30px',
                fontSize: '1.2rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FE4A4A 30%, #FF7043 90%)',
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              开始对话
            </Button>
          </Paper>
        </Box>
      </Container>

      {/* 装饰元素 */}
      <div className={styles.decorativeElement1}></div>
      <div className={styles.decorativeElement2}></div>
    </Box>
  );
}
