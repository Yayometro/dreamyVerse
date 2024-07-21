import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
//TYPES
import { IUser } from "@/types/mongoModels";
import { User } from "next-auth";
import fetcherFetch from "@/helpers/fetcher";


//

const routeApiBase: string | undefined = process.env.API_ROUTE;

const fetcher = fetcherFetch();

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mail: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"mail" | "password", string> | undefined,
        _req
      ): Promise<User | null> {
        try {
          if (!credentials) {
            throw new Error("No credentials to access in Credentials Provider");
          }
          const { mail, password } = credentials;
          const loginRoute: string = `${routeApiBase}user/login`;
          const res = await fetcher.post("user/login", { mail, password });
          console.log(res)
          if(!res.ok){
            throw new Error(res.message)
          }
          const user: IUser = res.data;
          console.log(user)
          return user;
        } catch (e: unknown) {
          console.error("Error:", e);
          if (e instanceof Error) {
            throw new Error(e.message);
          } else {
            throw new Error("An unexpected error has occurred.");
          }
        }
      },
    }),
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    //Once authorize return the obj, the obj will be saved in the token  here in a new variable.user
    async signIn({ account, profile, user }: any): Promise<any> {
      if (account.provider === "credentials") {
        // console.log(account, profile, user)
        if (!user) return null;
        return true;
      }
      if (account.provider === "google") {
        if (user) {
          const resUserGoogleFound = await fetcher.get(
            `user/getUser?mail=${user.email}`
          );
          const userGoogleFound = resUserGoogleFound.data;
          if (!userGoogleFound) {
            const res = await fetcher.post("user/register", {
              username: `${user.name}${user.email}`,
              name: user.name || "",
              mail: user.email,
              password: user.id,
              avatar: user.image,
            });
            const dataFromRegister = res.data;
            if (dataFromRegister) {
              profile.fullUser = userGoogleFound;
              user.fullUser = userGoogleFound;
              account.fullUser = userGoogleFound
              return (
                profile.email_verified && profile.email.endsWith("@gmail.com")
              );
            }
          }
          profile.fullUser = userGoogleFound;
          user.fullUser = userGoogleFound;
          account.fullUser = userGoogleFound
          return profile.email_verified && profile.email.endsWith("@gmail.com");
        }
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
    },
    async jwt({ token, user, account }: any) {
      // console.log(token, user, account)
      if (user) {
        if (account.type === "credentials") {
          console.log(token, user, account)
          token.name = user.fullName;
          token.email = user.mail;
          token.picture = user.image ? user.image : "";
          token.fullUser = user;
        }
        if (account.provider === "google") {
          // console.log(token, user, account)
          token.fullUser = user.fullUser || account.fullUser;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      // console.log(token, session)
      if (token?.fullUser) {
        // console.log(token, session)
        session.user.fullUser = token.fullUser;
      } else if (session.user) {
        // console.log(token, session)
        const getUser = await fetcher.get(
          `user/getUser?mail=${session.user.email}`
        );
        session.user.fullUser = getUser.data;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    CredentialsProvider(message: any) {
      // console.log(message);
      // console.log(typeof message);
      // console.log("CredentialsProvider message", message);
    },
    signIn(message: any) {
      // console.log(message);
      // console.log(typeof message);
      // console.log("Sign message", message);
    },
    signOut(message: any) {
      // console.log(message);
      // console.log(typeof message);
      // console.log(message);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
