import { IUser } from "./mongoModels";

export interface ApiResponseDv {
    data: IUser,
    message: string,
    ok: boolean,
  }