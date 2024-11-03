# LearnSage AI - 智能学习助手 🤖

LearnSage AI 是一个基于豆包大模型的智能学习助手，旨在为用户提供个性化的学习体验。通过自然语言交互，帮助用户解答问题、提供学习建议、进行知识探索。

## 主要特性 ✨

- 🎯 智能问答：基于豆包大模型的智能对话系统
- 🎨 优雅界面：采用 Material-UI 设计的现代化界面
- 🔐 用户认证：安全的登录系统
- 💬 实时响应：流畅的对话体验
- 📱 响应式设计：完美支持各种设备

## 技术栈 🛠️

- **前端框架**: Next.js 13
- **UI 框架**: Material-UI (MUI)
- **编程语言**: TypeScript
- **状态管理**: React Hooks
- **样式方案**: CSS Modules
- **AI 模型**: 豆包大模型

## 快速开始 🚀

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装步骤

1. 克隆项目
   ```bash
   git clone https://github.com/yourusername/learnsage-ai.git
   cd learnsage-ai
   ```

2. 安装依赖
   ```bash
   npm install
   # 或
   yarn install
   ```

3. 配置环境变量
   ```bash
   cp .env.example .env.local
   ```
   编辑 `.env.local` 文件，添加必要的环境变量：
   ```
   DOUBAO_API_KEY=your_api_key
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

访问 `http://localhost:3000` 查看应用。

## 项目结构 📁
```
learnsage-ai/
├── app/ # Next.js 13 应用目录
│ ├── api/ # API 路由
│ ├── chat/ # 聊天页面
│ ├── login/ # 登录页面
│ └── page.tsx # 首页
├── components/ # React 组件
├── public/ # 静态资源
├── styles/ # 全局样式
├── utils/ # 工具函数
└── types/ # TypeScript 类型定义
```

## 功能特点 💡

1. 智能对话
   - 基于豆包大模型的自然语言处理
   - 上下文理解和连续对话支持
   - 实时响应和流式输出

2. 用户界面
   - 现代化的 Material Design 设计
   - 响应式布局，支持移动端
   - 优雅的动画和过渡效果

3. 用户体验
   - 简洁的登录界面
   - 实时消息状态反馈
   - 消息时间戳显示

## 开发计划 📅

- [ ] 添加对话历史记录保存功能
- [ ] 实现多主题切换
- [ ] 添加语音输入支持
- [ ] 优化移动端体验
- [ ] 添加导出对话记录功能

## 贡献指南 🤝

欢迎提交 Pull Request 或创建 Issue！

1. Fork 项目
2. 创建特性分支 (git checkout -b feature/AmazingFeature)
3. 提交更改 (git commit -m 'Add some AmazingFeature')
4. 推送到分支 (git push origin feature/AmazingFeature)
5. 创建 Pull Request

## 开源协议 📄

本项目采用 MIT 协议

## 联系方式 📧

项目作者 - [@FuHao1994](https://github.com/FuHao1994)

## 致谢 🙏

- [Next.js](https://nextjs.org/)
- [Material-UI](https://mui.com/)
- [豆包大模型](https://doubao.com/)

---

Made with ❤️ by FuHao