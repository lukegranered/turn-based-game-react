import React from 'react'
import { PlayerSummary } from '../PlayerSummary'
import styles from './styles.module.css'

export const Battle = () => {
  return (
    <div className={styles.main}>
        <div className={styles.opponent}>
            <div className={styles.summary}>
              <PlayerSummary main={false}/>
            </div>
        </div>
        <div className={styles.user}>
          <div className={styles.summary}>
            <PlayerSummary main/>
          </div>
        </div>
    </div>
  )
}
