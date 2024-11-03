'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Send as SendIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import styles from './chat.module.css';
import { DouBaoApi } from '@/utils/doubaoApi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

const characterAvatars = {
  甘雨: '/images/gan_yu.png',
  刻晴: '/images/ke_qing.png',
  雷电将军: '/images/raiden_shogun.png',
};

const greetings: Record<string, string> = {
  甘雨: '你好，我是甘雨，有什么我可以帮你的吗？',
  刻晴: '你好，我是刻晴，随时准备帮助你！',
  雷电将军: '你好，我是雷电将军，有什么问题请告诉我！',
};

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<keyof typeof characterAvatars>('甘雨'); // 默认角色
  const hasWelcomeMessage = useRef(false); // 使用 useRef 来跟踪是否已经添加过开场白

  // 使用 useEffect 获取选择的角色
  useEffect(() => {
    const character = localStorage.getItem('selectedCharacter');
    if (character && !hasWelcomeMessage.current) {
      setSelectedCharacter(character as keyof typeof characterAvatars);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: greetings[character as keyof typeof characterAvatars],
          id: `welcome-${Date.now()}`
        }
      ]);
      hasWelcomeMessage.current = true;
    }
  }, []);

  const assistantAvatar = characterAvatars[selectedCharacter];

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user' as const,
      content: input.trim(),
      id: `user-${Date.now()}`
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const doubaoApi = new DouBaoApi();
      
      const response = await doubaoApi.chat([
        {
          role: 'user',
          content: userMessage.content
        }
      ], selectedCharacter as string);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        id: `assistant-${Date.now()}`
      }]);
    } catch (error: any) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `抱歉，我遇到了一些问题：${error.message}`,
        id: `error-${Date.now()}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 格式化时间的函数
  const formatMessageTime = (id: string) => {
    const timestamp = id.split('-')[1];
    if (!timestamp) return '';
    return new Date(parseInt(timestamp)).toLocaleTimeString();
  };

  // 添加退出登录函数
  const handleLogout = () => {
    // 清除登录状态
    document.cookie = 'isLoggedIn=false; path=/';
    router.push('/');
  };

  return (
    <Box className={styles.pageContainer}>
      {/* 添加退出按钮 */}
      <IconButton
        onClick={handleLogout}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: 'rgba(255, 107, 107, 0.1)',
          }
        }}
      >
        <Tooltip title="退出登录">
          <LogoutIcon sx={{ color: '#FF6B6B' }} />
        </Tooltip>
      </IconButton>

      {/* 动画背景 */}
      <div className={styles.animatedBg}></div>

      {/* 主聊天区域 */}
      <Box className={styles.mainContent}>
        {/* 消息列表 */}
        <Box className={styles.messageList}>
          {messages.map((message) => (
            <Box
              key={message.id}
              className={`${styles.messageWrapper} ${styles[message.role]}`}
            >
              <Box className={styles.messageContent}>
                <Avatar
                  className={styles.avatar}
                  src={message.role === 'assistant' ? assistantAvatar : undefined}
                  sx={{
                    bgcolor: message.role === 'assistant' ? '#FF6B6B' : '#4ECDC4',
                    width: 32,
                    height: 32
                  }}
                >
                  {message.role === 'assistant' ? <BotIcon /> : <PersonIcon />}
                </Avatar>
                <Paper
                  className={styles.message}
                  elevation={0}
                  sx={{
                    background: message.role === 'assistant' 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : 'rgba(255, 107, 107, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <Typography variant="body1">{message.content}</Typography>
                  {message.id !== 'welcome' && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        mt: 1,
                        color: 'text.secondary'
                      }}
                    >
                      {formatMessageTime(message.id)}
                    </Typography>
                  )}
                </Paper>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* 输入区域 */}
        <Box className={styles.inputAreaContainer}>
          <Paper
            elevation={3}
            className={styles.inputAreaWrapper}
            sx={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
              margin: '0 24px 24px 24px',
              overflow: 'hidden'
            }}
          >
            <Box className={styles.inputArea}>
              <TextField
                fullWidth
                variant="standard"
                placeholder="输入消息..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                multiline
                maxRows={4}
                disabled={isLoading}
                sx={{
                  '& .MuiInputBase-root': {
                    padding: '12px 16px',
                    '&:before, &:after': {
                      display: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '1rem',
                    lineHeight: '1.5',
                  },
                }}
              />
              <span>
                <Tooltip title={isLoading ? "AI正在思考中" : "发送消息"}>
                  <span>
                    <IconButton 
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                      sx={{
                        m: 1,
                        background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FE4A4A 30%, #FF7043 90%)',
                          transform: 'translateY(-2px)',
                          transition: 'transform 0.2s'
                        },
                        '&.Mui-disabled': {
                          background: '#ccc',
                          color: '#666'
                        }
                      }}
                    >
                      {isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                    </IconButton>
                  </span>
                </Tooltip>
              </span>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
} 