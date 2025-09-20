import { axiosGet, axiosPost } from "../axios/axios-config";
import { SignInFormValues, SignupFormValues } from "./AuthType";


// ========== Register ==================
export const signupRequest = async (user: SignupFormValues) => {
    return await axiosPost("/api/auth/register", user);
};


// ========== Login ==================
export const signInRequest = async (user: SignInFormValues) => {
    return await axiosPost("/api/auth/login", user);
};

export interface GetUserData {
    user_id: number | null;
  }


export const getUserAllData = async (data: GetUserData) => {
    return await axiosGet(`/api/auth/getuseralldata/${data['user_id']}/`);
};



export const getEventDataRequest = async (data :{event_id: string}) => {
    return await axiosGet(`/api/events/${data['event_id']}/`);
};