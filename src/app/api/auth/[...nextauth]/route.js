import clientPromise from '@/app/lib/db';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET ?? "",
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: ({session,token,user}) => {
          if (adminEmails.includes(session?.user?.email)) {
            return session;
          } else {
            return false;
          }
        },
      },
}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};

export async function isAdminRequest(req,res) {
    const session = await getServerSession(req,res,authOptions);
    if (!adminEmails.includes(session?.user?.email)) {
      res.status(401);
      res.end();
      throw 'not an admin';
    }
  }