import {useState} from "react";

//Middleware which check token

function CheckAuthMiddleware({ children }) {
    const [ authStatus ] = useState(true)

    return (
        <>
            {authStatus && <>{children}</>}
        </>
    )
}

export default CheckAuthMiddleware