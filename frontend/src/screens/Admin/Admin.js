import React from 'react'
import { Title } from '../../atoms/index'
import { AdminMenuList } from '../../components/index'

import styles from  './admin.module.scss'

const Admin = () => {
    return ( 
        <section className={styles.adminSection}>
            <Title text="Panel" size="large" />
            <AdminMenuList type="staff" />
            <AdminMenuList type="article" />
            <AdminMenuList type="session" />
        </section>
    )
}

export default Admin
