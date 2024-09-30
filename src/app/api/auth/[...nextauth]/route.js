import clientPromise from '@/lib/db';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth, {getServerSession} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const adminEmails = process.env.ADMIN_EMAILS.split(', ');

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

export async function isAdminRequest() {
    const session = await getServerSession(authOptions);
    if (!adminEmails.includes(session?.user?.email)) {
      throw "not an admin";
  }
}