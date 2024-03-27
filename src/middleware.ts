import { authMiddleware } from '@clerk/nextjs';

// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware

export default authMiddleware({
  publicRoutes: ['/sign-in', '/sign-up'],
  ignoredRoutes: ['/api/clerk', '/api/chatgpt']
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)', '/ask-quesion']
};
