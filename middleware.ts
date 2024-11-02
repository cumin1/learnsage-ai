import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 获取当前路径
  const path = request.nextUrl.pathname
  
  // 定义需要保护的路径
  const isProtectedRoute = path.startsWith('/chat')
  
  // 检查是否已登录（从 cookies 中获取登录状态）
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'

  // 如果是受保护的路由且未登录，重定向到登录页
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 如果已登录且访问登录页，重定向到聊天页
  if (path === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/chat', request.url))
  }

  return NextResponse.next()
}

// 配置需要进行中间件检查的路径
export const config = {
  matcher: ['/chat/:path*', '/login']
} 