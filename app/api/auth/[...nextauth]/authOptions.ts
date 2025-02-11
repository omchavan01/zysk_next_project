import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

interface User {
  id: number;
  username: string;
  email: string;
  image: string;
  token: string;
}

interface Session {
  accessToken?: string;
  user: {
    id: number;
    username: string;
    email: string;
    image: string | null;
  };
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const { isToken, data } = credentials as {
            isToken: boolean;
            data: string;
          };

          if (isToken) {
            const token = JSON.parse(data).token;

            const response = await axios.get("https://dummyjson.com/auth/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            });

            const userData: User = response.data;
            if (userData) {
              return {
                id: userData.id.toString(),
                username: userData.username,
                email: userData.email,
                image: userData.image || null,
                token: token,
              };
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
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
          accessToken: account.access_token || (user as unknown as User).token,
          id: user.id,
          username: (user as unknown as User).username || user.name,
          email: user.email,
          image: user.image || null,
        };
      }
      return token;
    },

    async session({ session, token }) {
      const userSession: Session = {
        accessToken: token.accessToken as string | undefined,
        user: {
          id: token.id as number,
          username: token.username as string,
          email: token.email as string,
          image: token.image as string | null,
        },
      };
      return { ...session, ...userSession };
    },
  },
};
