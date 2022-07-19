import { 
    wait,
    magic,
    heal,
    attack,
    playerStats,
    opponentStats,
} from '../shared';
import { useEffect, useState } from "react";

export const useBattleSequence = sequence => {
    const [turn, setTurn] = useState(0);
    const [inSequence, setInSequence] = useState(false);
    const [playerHealth, setplayerHealth] = useState(playerStats.maxHealth);
    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
  
    const [announcerMessage, setAnnoncerMessage] = useState(''); 
    const [playerAnimation, setPlayerAnimation] = useState('static');
    const [opponentAnimation, setOpponentAnimation] = useState('static');

    useEffect(() => {
        const { mode, turn } = sequence;

        if (mode) {

            const attacker = turn === 0 ? playerStats : opponentStats;
            const receiver = turn === 0 ? opponentStats : playerStats;

            switch (mode) {
                case 'attack':
                    const damage = attack({ attacker, receiver });

                    (async () => {
                        setInSequence(true);
                        setAnnoncerMessage(`${attacker.name} has chosen to attack!`);

                        await wait(1000);

                        turn === 0 
                        ? setPlayerAnimation('attack') 
                        : setOpponentAnimation('attack');
                        await wait(100);

                        turn === 0 
                        ? setPlayerAnimation('static') 
                        : setOpponentAnimation('static');
                        await wait(500);

                        turn === 0 
                        ? setOpponentAnimation('damage') 
                        : setPlayerAnimation('damage');
                        await wait(750);

                        turn === 0 
                        ? setOpponentAnimation('static') 
                        : setPlayerAnimation('static');
                        setAnnoncerMessage(`${receiver.name} felt that!`);
                        turn === 0 
                        ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0)) 
                        : setplayerHealth(h => (h - damage > 0 ? h - damage : 0));
                        await wait(2000);

                        setAnnoncerMessage(`Now its ${receiver.name} turn!`);
                        await wait(1500);

                        setTurn(turn === 0 ? 1 : 0);
                        setInSequence = false;
                    })();
                    break;

                default:
                break;
            }
        }
    }, [sequence]);

    return {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation,
    }

};