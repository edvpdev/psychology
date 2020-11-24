import React, { useEffect } from 'react'
import { GroupSessionItem } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { Message, Loader } from '../../atoms/index'

import styles from './groupsession.module.scss'

import {
    listSessions,
} from '../../actions/sessionsActions'

const GroupSessions = () => {

    const dispatch = useDispatch()
    const sessionsList = useSelector((state) => state.sessionsList)
    const { loading, error, sessions } = sessionsList

    useEffect(() => {
        dispatch(listSessions())
    }, [
        dispatch,
    ])

    return loading ? (
        <div className={styles.group}>
            <Loader />
        </div>
    ): error ? (
        <div className={styles.group}>
            <Message variant='danger'>{error}</Message>
        </div>
    ) : (
        <div className={styles.group}>
            {sessions && sessions.map((session) => (
                 <GroupSessionItem key={session._id} session={session}/>
            ))}
        </div>
    )
}

export default GroupSessions
