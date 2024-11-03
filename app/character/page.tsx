'use client';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import styles from './character.module.css';
import { useState } from 'react';

const characters = [
  { name: '甘雨', avatar: '/images/gan_yu.png' },
  { name: '刻晴', avatar: '/images/ke_qing.png' },
  { name: '雷电将军', avatar: '/images/raiden_shogun.png' },
];

// 角色简介
const characterDescriptions = {
  '甘雨': '甘雨是一个强大的冰元素角色。',
  '刻晴': '刻晴是一个敏捷的雷元素角色。',
  '雷电将军': '雷电将军是一个威严的雷元素角色。',
};

export default function CharacterSelection() {
  const router = useRouter();

  const handleSelectCharacter = (character: string) => {
    // 将选择的角色存储在 localStorage 中
    localStorage.setItem('selectedCharacter', character);
    // 跳转到聊天页面
    router.push('/chat');
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 5, background: 'linear-gradient(135deg, #f0f4ff, #d9e6ff)', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#4A4A4A', fontFamily: 'Comic Sans MS, cursive', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)' }}>
        选择你的角色
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {characters.map((character) => (
          <Box
            key={character.name}
            sx={{
              position: 'relative',
              width: '200px',
              height: '250px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                transform: 'scale(1.05)',
              },
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={() => handleSelectCharacter(character.name)}
          >
            <img
              src={character.avatar}
              alt={character.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
            />
            <Typography variant="h6" sx={{ mt: 1, color: '#333', fontFamily: 'Comic Sans MS, cursive' }}>
              {character.name}
            </Typography>
            <Typography variant="body2" sx={{ padding: '0 10px', color: '#666', fontStyle: 'italic' }}>
              {characterDescriptions[character.name as keyof typeof characterDescriptions]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 