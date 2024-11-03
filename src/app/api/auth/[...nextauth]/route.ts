import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'OTP Login',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your@example.com' },
        otp: { label: 'OTP', type: 'text', placeholder: '123456' },
      },
      async authorize(credentials) {
        try {
          if (!credentials.otp) {
            // Step 1: Request OTP
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/request-otp`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: credentials.email }),
            });
            if (!response.ok) {
              throw new Error('Failed to send OTP. Please try again.');
            }
            return { email: credentials.email };
          } else {
            // Step 2: Verify OTP
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: credentials.email, enteredOtp: credentials.otp }),
            });

            const user = await response.json();
            
            if (response.ok && user.token) {
              return user;
            } else {
              throw new Error('Invalid OTP or OTP has expired.');
            }
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.isVerified = user.isVerified;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        isVerified: token.isVerified,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
