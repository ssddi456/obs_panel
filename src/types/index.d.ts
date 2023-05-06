export interface GameSession {
    date: string;
    startScore: number;
    currentScore: number;
    rounds: GameRound[];
}

export interface GameRound {
    index: number;
    hero: string;
    position: string;
    tag: string[];
    score: number;
}