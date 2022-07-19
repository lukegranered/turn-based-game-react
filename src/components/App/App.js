import styles from './styles.module.css';
import { useState } from 'react';
import { StartMenu } from '../StartMenu/StartMenu';
import { Battle } from '../Battle';
import { EndMenu } from '../EndMenu';

export const App = () => {
  const [mode, setMode] = useState('start');
  const [winner, setWinner] = useState();
  return (
    <div className={styles.main}>
      {mode === 'start' && <StartMenu onStartClick={() => setMode('battle')}/>}

      {mode === 'battle' && <Battle 
      onGameEnd={winner => {
        setWinner(winner);
        setMode('gameOver');
      }}/>}

      {mode === 'gameOver' && <EndMenu winner={winner} onStartClick={() => {
        setWinner(undefined);
        setMode('battle');
      }}/>}
    </div>
  );
}


