import {create} from "zustand"
import { axiosRequest } from "../lib/axios";

export const checkForUserAuthentication = create((setAuthenticatedUser) => ({
    authenticatedUser: null,
    isSigningUp: false,
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
    }
}));