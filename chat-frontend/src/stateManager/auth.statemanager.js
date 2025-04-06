import {create} from "zustand"
import { axiosRequest } from "../lib/axios";

export const checkForUserAuthentication = create((setAuthenticatedUser) => ({
    authenticatedUser: null,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingForAuthentication: true,

    checkIfUserIsAuthenticated: async () => {
        try {
            const res = await axiosRequest.get("/auth/check");
            setAuthenticatedUser({ authenticatedUser: res.data });
        } catch (error) {
            setAuthenticatedUser({ authenticatedUser: null });
            console.log(`error occurred while checking if user is authenticated: ${error}`);
        } finally {
            setAuthenticatedUser({ isCheckingForAuthentication: false });
        }
    },

signupUser: async (data) => {
    setAuthenticatedUser({isSigningUp: true})
    try{
        const res = await axiosRequest.post("/auth/signup", data);
        setAuthenticatedUser({authenticatedUser: res.data});
        console.log("signup successfully")
    }
    catch{
        console.log(`error occurred while signingup user: ${error}`);
    }
    finally{
        setAuthenticatedUser({isSigningUp: false});
    }
}

}));