import React from 'react'
import styles from './styles.module.css'

const red = '#821200';
const blue = '#1953CB';

export const PlayerSummary = ({ main = false }) => {
  return (
    <div 
    style={{ backgroundColor: main ? red : blue }} 
    className={styles.main}>PlayerSummary</div>
  )
}
