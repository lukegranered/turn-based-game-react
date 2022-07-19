import React, { useEffect, useState } from 'react'
import { useAIOpponent } from '../../hooks';
import { useBattleSequence } from '../../hooks/useBattleSequence';
import { opponentStats, playerStats } from '../../shared';
import { BattleAnnouncer } from '../BattleAnnouncer/BattleAnnouncer';
import { BattleMenu } from '../BattleMenu';
import { PlayerSummary } from '../PlayerSummary'
import styles from './styles.module.css'

export const Battle = () => {
  const [sequence, setSequence] = useState({});

  const {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice });
    }
  }, [turn, aiChoice, inSequence]);

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
                className={styles[playerAnimation]}
              />
            </div>

            <div className={styles.opponentSprite}>
            <img 
                alt={opponentStats.name}
                src={opponentStats.img}
                className={styles[opponentAnimation]}
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
            {!inSequence && turn === 0 && (
            <div className={styles.hudChild}>
              <BattleMenu
                onHeal={() => setSequence({ mode: 'heal', turn })}
                onMagic={() => setSequence({ mode: 'magic', turn })}
                onAttack={() => setSequence({ mode: 'attack', turn })}
              />
            </div>
          )}
          </div>

        </div>

    </>
  )
}
