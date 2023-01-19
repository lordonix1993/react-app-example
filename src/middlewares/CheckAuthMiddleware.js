import {useState} from "react";

function CheckAuthMiddleware({ children }) {
    const [ authStatus, setAuthStatus ] = useState(true)
    return (
        <>
            {authStatus && <>{children}</>}
        </>
    )
}

export default CheckAuthMiddleware