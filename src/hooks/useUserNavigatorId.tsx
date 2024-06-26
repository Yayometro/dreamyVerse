import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IUserDocument } from "../../dreamyVerse";


const useUserNavigator = () => {
    const {data:session} = useSession()
    const [userId, setUserId] = useState<string | null>(null);
    const [user, setUser] = useState<IUserDocument | null>(null);
  
    useEffect(() => {
        if (session?.user?.fullUser?._id) {
          setUser(session.user.fullUser as IUserDocument);
          setUserId(session.user.fullUser._id);
        } else {
          setUser(null);
          setUserId(null);
        }
      }, [session?.user?.fullUser]);

    console.log("first")

    return {
        user,
        userId
    }
}

export default useUserNavigator