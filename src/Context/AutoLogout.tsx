    import { useEffect } from "react";
    import { useSOP } from "./ContextProvider";

    const AutoLogout = () => {
    const { logout, getUserSession } = useSOP();

    useEffect(() => {
        const userSession = getUserSession();

        if (userSession) {
        const expirationTime = new Date(userSession.tokenExpiration).getTime();
        const currentTime = new Date().getTime();

        const timeUntilExpiration = expirationTime - currentTime;
        
        if (timeUntilExpiration > 0) {
            const timeoutId = setTimeout(() => {
            logout();
            }, timeUntilExpiration);

            return () => clearTimeout(timeoutId);
        } else {
            logout();
        }
        } else {
        logout();
        }
    }, [getUserSession, logout]);

    return null; 
    };

    export default AutoLogout;
