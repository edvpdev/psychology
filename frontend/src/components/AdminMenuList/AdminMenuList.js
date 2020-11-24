import React, { useEffect, useState, useMemo } from 'react'
import { Button, Message, Loader } from '../../atoms/index'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from '../../components/index'

import styles from './admin-menu.module.scss'

import {
    listArticlesTitles,
} from '../../actions/articlesActions'
import {
    listSpecialistNames,
} from '../../actions/specialistsActions'
import {
    listSessionsTitles,
} from '../../actions/sessionsActions'

const AdminMenuList = ({type}) => {

    const config = useMemo(() => {
        return {
            "staff": {
                "stateEntry":"specialistNames",
                "editIcon":faUserEdit,
                "editPage":"/admin/specialistedit/",
                "title":"Staff Members",
                "action":listSpecialistNames,
                "returnDataEntry":"specialists"
            },
            "article": {
                "stateEntry":"articleTitles",
                "deleteIcon":faTrash,
                "editIcon":faEdit,
                "editPage":"/admin/articleedit/",
                "title":"Articles",
                "action":listArticlesTitles,
                "returnDataEntry":"articles"
            },
            "session": {
                "stateEntry":"sessionsTitles",
                "deleteIcon":faTrash,
                "editIcon":faEdit,
                "editPage":"/admin/sessionedit/",
                "title":"Group Sessions",
                "action":listSessionsTitles,
                "returnDataEntry":"sessions"
            }
        }
    }, [])

    const [currentPage, setPage] = useState(1)
    const dispatch = useDispatch()
    const data = useSelector((state) => state[config[type].stateEntry])
    const {loading, error, pages } = data
    
    const entries = data[config[type].returnDataEntry]

    const history = useHistory()

    useEffect(() => {
        dispatch(config[type].action(currentPage))
    },[
        dispatch,
        type,
        currentPage,
        config
    ])

    const paginationHandler = (page) => {
        setPage(page)
    }



    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>{config[type].title}</h3>
            {
                loading ? (
                    <Loader />
                ): error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <ul className={styles.list}>
                        {entries.map(({entry, _id}) => (
                            <li key={_id} className={styles.listItem}>
                                {entry}
                                <span className={styles.icons}>
                                    <FontAwesomeIcon onClick={() => history.push(`${config[type].editPage}${_id}`)} className={styles.icon} icon={config[type].editIcon} size="lg" />
                                    {config[type].deleteIcon && <FontAwesomeIcon className={styles.icon} icon={config[type].deleteIcon} size="lg" />}
                                </span>
                        </li>
                        ))}
                    </ul>
                )
            }
            <div className={styles.buttons}>
                <Button to={config[type].editPage} className={`btnPrimary`} text="New" size={`small`}/>
                {pages > 1 ? <Pagination page={currentPage} pages={pages} handler={paginationHandler} size={`small`}/> : null}
            </div>
        </div>
    )
}

export default AdminMenuList
