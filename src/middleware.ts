// middleware.js
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
});

// Set up protected routes with the matcher
export const config = {
  matcher: ['/protected', '/dashboard'],
};
