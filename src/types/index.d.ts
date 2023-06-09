export interface GameSession {
    date: string;
    startScore: number;
    currentScore: number;
    rounds: GameRound[];
}

export interface GameSessionConfig {
    background?: { r: number, g: number, b: number, a: number };
    autoCalc: boolean;
}

export interface GameRound {
    index: number;
    hero: string;
    position: string;
    tag: string[];
    score: number;
}