// socket.io client
import { Socket, Manager } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { GameSession } from "../types";
import { merge } from "lodash";

const query = new URLSearchParams(window.location.search);
const admin = query.get('admin');

const manager = new Manager('http://localhost:5000/', {
    query: {
        admin,
    },
});
// 


export const useDetail: () => [boolean, GameSession, (data: GameSession) => void] = () => {
    const socketRef = useRef<Socket>();
    const [initLoading, setInitLoading] = useState(true);
    const [detail, setDetail] = useState<GameSession>({
        date: new Date().toISOString(),
        startScore: 0,
        currentScore: 0,
        rounds: [],
    });

    useEffect(() => {
        const socket = new Socket(manager, '/');
        socket.open();
        socketRef.current = socket;
        const updater = (data: GameSession) => {
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

    const updateDetail = (data: GameSession) => {
        socketRef.current!.emit('update', data);
    };

    return [initLoading, detail, updateDetail];
}

