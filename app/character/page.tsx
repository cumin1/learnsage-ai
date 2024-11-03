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

// 角色背景
const characterDescriptions = {
  '甘雨': '甘雨是璃月的七神之一，拥有强大的冰元素能力。她是一个半人半仙的角色，常常在璃月的山林中游荡，守护着自然与人类的和谐。她的冷静与智慧使她成为了许多冒险者的向导。',
  '刻晴': '刻晴是璃月的执法者，以其敏捷的身手和雷元素能力而闻名。她在战斗中展现出无与伦比的速度和精准，常常在危机时刻保护璃月的人民。她的坚定与勇气使她成为了众人心中的英雄。',
  '雷电将军': '雷电将军是稻妻的统治者，拥有强大的雷元素力量。她以严厉和果断著称，致力于实现永恒的理想。她的存在在稻妻引发了许多争议，但她的力量和决心无疑使她成为了一个传奇人物。',
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
    <Box sx={{ textAlign: 'center', mt: 0, background: 'linear-gradient(135deg, #f0f4ff, #d9e6ff)', padding: '20px', borderRadius: '10px', height: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#4A4A4A', fontFamily: 'Comic Sans MS, cursive', textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)' }}>
        选择你的角色
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        {characters.map((character) => (
          <Box
            key={character.name}
            sx={{
              position: 'relative',
              width: '30%', // 修改为30%以使角色框更美观
              height: 'auto', // 高度自适应
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
              style={{ width: '100%', height: '50vh', objectFit: 'cover' }} // 高度自适应
            />
            <Typography variant="h6" sx={{ position: 'absolute', bottom: '60px', left: '10px', color: '#ffffff', fontFamily: 'Comic Sans MS, cursive' }}>
              {character.name}
            </Typography>
            <Typography variant="body2" sx={{ position: 'absolute', bottom: '10px', left: '10px', color: '#ffffff', fontStyle: 'italic', padding: '0 10px' }}>
              {characterDescriptions[character.name as keyof typeof characterDescriptions]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 