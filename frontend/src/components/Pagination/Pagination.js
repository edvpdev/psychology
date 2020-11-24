import React from 'react'

import { Button } from '../../atoms/index'

import styles from './pagination.module.scss'

const Pagination = ({page, pages, handler, size}) => {
    let surroundingPages= [];
    page = parseInt(page);
    let buttons = [];

    if (pages >= 3) {
        surroundingPages = page === 1 ? [1, 2, 3] : page === pages ? [pages-2, pages-1, pages] : [page-1, page, page+1];
        buttons.push(
            <Button onClick={() => handler(surroundingPages[0])} to={null} key={1} className="btnPrimary" text={surroundingPages[0]} size={size}/>
        )
        buttons.push(
            <Button onClick={() => handler(surroundingPages[1])} to={null} key={2} className="btnPrimary" text={surroundingPages[1]} size={size}/>
        )
        buttons.push(
            <Button onClick={() => handler(surroundingPages[2])} to={null} key={3} className="btnPrimary" text={surroundingPages[2]} size={size}/>
        )
    } else {
        for (let i = 1; i <= pages; i++) {
            buttons[i] = <Button onClick={() => handler(i)} key={i} className="btnPrimary" text={i} size={size}/>
        }
    }

    return (
        <div className={styles.pagination}>
            <Button onClick={() => handler(page-1)} to={null} className={page === 1 ? 'btnDisabled' : 'btnPrimary'} text={`Previous`} size={size}/>
            {buttons.map((btn) => btn)}
            <Button onClick={() => handler(page+1)} to={null} className={page === pages ? `btnDisabled` : 'btnPrimary'} text={`Next`} size={size}/>
        </div>
    )
}

export default Pagination
