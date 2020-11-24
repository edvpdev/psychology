import React from 'react'

import styles from './googlemapbox.module.scss'

const GoogleMapBox = () => {
    return (
        <div className={styles.map}>
            <div>
                <iframe
                    width="300"
                    height="250"
                    frameBorder="0"
                    title="google-map"
                    src="https://www.bing.com/maps/embed?h=250&w=300&cp=54.691296~25.262043&lvl=17&typ=d&sty=r&src=SHELL&FORM=MBEDV8"
                    scrolling="no"
                >
                </iframe>
                <div
                    style={{
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        width: "300px",
                        padding: "6px 0"
                    }}
                ></div>
            </div>
        </div>
    )
}

export default GoogleMapBox
