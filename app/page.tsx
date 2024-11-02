'use client';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box,
  Paper
} from '@mui/material';
import Link from 'next/link';
import ChatIcon from '@mui/icons-material/Chat';

export default function Home() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <ChatIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI助手
          </Typography>
          <Button color="inherit" component={Link} href="/login">
            登录
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Paper 
            elevation={3}
            sx={{
              p: 6,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <Typography variant="h2" component="h1" gutterBottom>
              欢迎使用 AI 助手
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              您的智能对话伙伴，随时为您提供帮助
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              href="/login"
              sx={{ mt: 4 }}
            >
              开始对话
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
