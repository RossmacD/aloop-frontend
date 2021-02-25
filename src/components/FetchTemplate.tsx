import { Text, Loader } from "@fluentui/react-northstar";
import React from "react";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../routes/Paths";

interface Props {
    isFetching: boolean,
    error: unknown
}


export const FetchTemplate: React.FC<Props> = ({ isFetching, error, children }) => {
    return isFetching ? (<Loader />) : !error ?
        (<>{children}</>)
        : (

            <><Text error>{typeof error === "string" ? error : "Authentication Error: Timeout"}</Text>
                <Link to={LOGIN_PATH}>Login</Link>
            </>

        )
}