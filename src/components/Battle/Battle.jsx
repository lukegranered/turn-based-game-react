import React, { useState } from 'react'
import { opponentStats, playerStats } from '../../shared';
import { BattleAnnouncer } from '../BattleAnnouncer/BattleAnnouncer';
import { BattleMenu } from '../BattleMenu';
import { PlayerSummary } from '../PlayerSummary'
import styles from './styles.module.css'

export const Battle = () => {
  const [playerHealth, setplayerHealth] = useState(playerStats.maxHealth);
  const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);

  const [announcerMessage, setAnnoncerMessage] = useState(''); 
  return (
    <>
        <div className={styles.opponent}>
            <div className={styles.summary}>
              <PlayerSummary 
                health={opponentHealth}
                name={opponentStats.name}
                level={opponentStats.level}
                maxHealth={opponentStats.maxHealth}
              />
            </div>
        </div>

        <div className={styles.characters}>
          <div className={styles.gameHeader}>
            {playerStats.name} vs {opponentStats.name}
          </div>

          <div className={styles.gameImages}>
            <div className={styles.playerSprite}>
              <img 
                alt={playerStats.name}
                src={playerStats.img}
                // className={styles.}
              />
            </div>

            <div className={styles.opponentSprite}>
            <img 
                alt={opponentStats.name}
                src={opponentStats.img}
                // className={styles.}
              />
            </div>
          </div>
        </div>

        <div className={styles.user}>
          <div className={styles.summary}>
            <PlayerSummary 
            main
            health={playerHealth}
            name={playerStats.name}
            level={playerStats.level}
            maxHealth={playerStats.maxHealth}
            />
          </div>

          <div className={styles.hud}>

            <div className={styles.hudChild}>
              <BattleAnnouncer 
                message={
                  announcerMessage || `What will ${playerStats.name} do?`
                }
              />
            </div>
            <div className={styles.hudChild}>
              <BattleMenu 
                onAttack={() => console.log('Attack!')}
                onMagic={() => console.log('Magic!')}
                onHeal={() => console.log('Heal!')}
              />
            </div>
          </div>

        </div>

    </>
  )
}
