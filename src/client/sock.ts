// socket.io client
import { Socket, Manager } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { GameSession, GameSessionConfig } from "../types";
import { merge } from "lodash";
import { defaultBackground, formatRgba } from "./utils";

const query = new URLSearchParams(window.location.search);
const admin = query.get('admin');

const manager = new Manager('http://localhost:5000/', {
    query: {
        admin,
    },
});
// 

interface DetailStore {
    getBackground: () => { r: number, g: number, b: number, a: number };
    getBackgroundString: () => string;
}

export const useDetail: () => [boolean, GameSession & GameSessionConfig, (data: GameSession & GameSessionConfig) => void, DetailStore] = () => {
    const socketRef = useRef<Socket>();
    const [initLoading, setInitLoading] = useState(true);
    const [detail, setDetail] = useState<GameSession & GameSessionConfig>({
        date: new Date().toISOString(),
        startScore: 0,
        currentScore: 0,
        rounds: [],
        background: undefined,
        autoCalc: false,
    });

    useEffect(() => {
        const socket = new Socket(manager, '/');
        socket.open();
        socketRef.current = socket;
        const updater = (data: GameSession & GameSessionConfig) => {
            console.log('update', data);
            setDetail(data);
            setInitLoading(false);
        };

        socket.on('update', updater);
        return () => {
            socket.off('update', updater);
            socket.close();
        }
    }, []);

    const updateDetail = (data: GameSession & GameSessionConfig) => {
        socketRef.current!.emit('update', data);
    };

    const getBackground = () => {
        return detail.background || defaultBackground;
}

    return [initLoading, detail, updateDetail, {
        getBackground,
        getBackgroundString: () => {
            return formatRgba(getBackground());
        }
    }];
}

