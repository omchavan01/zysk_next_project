import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        if (credentials.isToken) {
          const token = JSON.parse(credentials.data).token;
          try {
            const response = await axios.get("https://dummyjson.com/auth/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            });
            const userData = response.data;
            if (userData) {
              return {
                username: userData.username,
                email: userData.email,
                image: userData.image,
                token: token,
              };
            }
          } catch (err) {
            console.error("Error fetching user data:", err);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token || user.token,
          username: user.username || user.name,
          email: user.email,
          image: user.image,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        username: token.username,
        email: token.email,
        image: token.image,
      };
      return session;
    },
  },
};
