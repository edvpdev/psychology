import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'


export const PrivateRoute = ({ component: Component, ...rest }) => {

    let [loggedIn, setLoggedIn] = useState(false)

    const adminLogin = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminLogin

    useEffect(() => {
        if (adminInfo) {
            setLoggedIn(true) 
        }
    }, [adminInfo])

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                    ) : (
                    <Redirect
                        to={{pathname: "/"}}
                    />
                )
            }
        />
    )
}