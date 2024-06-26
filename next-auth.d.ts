import { Account, DefaultUser, Profile, DefaultSession, DefaultUser  } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
//   interface Session {
//     user: {
//       /** The user's postal address. */
//       address: string;
//     } & DefaultSession["user"];
//   }
interface DefaultUser {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
  interface User extends DefaultUser{
    _id: string | null
    username: string;
    mail: string;
    password: string;
    name?: string;
    lastName?: string;
    phone?: number;
    avatar?: string;
    zodiac?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
  }
  

  interface Session {
    user?: DefaultSession["user"] & {
      fullUser?: User | null;
    };
  }

  

  
//   interface Email {
//     verificationRequest?: boolean
//   }
//   type Credentials = Record<string, CredentialInput>
//   interface NAProfile extends Profile{
//     email_verified? : true
//     fullUser? : User
//   }
//   /** If Credentials provider is used, it contains the user credentials */
//   type IsignIn = (params: {
//     user: User | AdapterUser
//     account: A | null | Account
//     profile?: P | NAProfile 
//     /**
//      * If Email provider is used, on the first call, it contains a
//      * `verificationRequest: true` property to indicate it is being triggered in the verification request flow.
//      * When the callback is invoked after a user has clicked on a sign in link,
//      * this property will not be present. You can check for the `verificationRequest` property
//      * to avoid sending emails to addresses or domains on a blocklist or to only explicitly generate them
//      * for email address in an allow list.
//      */
//     email?: Email
//     credentials?: Credentials
//   }) => Awaitable<string | boolean>
//   interface signInParams extends signIn {

//   }
}
