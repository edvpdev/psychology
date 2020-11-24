import React from 'react'
import { Button, Title, Lead } from '../../atoms/index'

import styles from './maincta.module.scss'

const MainCTA = () => {
  return (
    <section className={styles.landing}>
      <div className={styles.darkOverlay}>
        <div className={styles.landingInner}>
          <Title size="xLarge" text="Modern Psychology and Psychotherapy centre"/>
          <Lead />
          <div className={`${styles.methods} ${styles.bgGlass}`}>
            <ul className={styles.methods__list}>
              <li className={styles.methods__list__listItem}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                adipisci reprehenderit possimus quo esse culpa.
              </li>
              <li className={styles.methods__list__listItem}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                adipisci reprehenderit possimus quo esse culpa.
              </li>
              <li className={styles.methods__list__listItem}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                adipisci reprehenderit possimus quo esse culpa.
              </li>
            </ul>
          </div>
          <Button to="/contact" className="btnPrimary" text="Contact" />
        </div>
      </div>
    </section>
  )
}

export default MainCTA
