import React, { useState, useEffect, useCallback } from 'react';
import styled from "@emotion/styled";
import gifBack from "../../assets/user/gifBack.gif"
import plant3 from "../../assets/user/plant3.png"
import pet1 from "../../assets/pets/pet1.png"

const Wrapper = styled.div`
    box-sizing: border-box;
    border: 5px solid black;
    border-radius: 20px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    color: black;
`

const Container = styled.div`
    position: relative;
    background-image: url(${gifBack});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    /* padding: 40px; */
`

const Ground = styled.div`
    position: absolute;
    bottom: 0;
    height: 80px;
    background-color: black;
    width: 100%;
    border-bottom: 5px solid black;
    `

const Dino = styled.div`
    position: absolute;
    background-image: url(${pet1});
    background-size: cover;    
    transform: scaleX(-1);     
    width: 120px;
    height: 120px;
`
const Obstacle = styled.div`
    position: absolute;
    bottom: 0;
    width: 80px;
    height: 130px;
    background-image: url(${plant3});
    background-size: cover;
    /* background-color: var(--yellow); */
`
const Score = styled.div`
    display: flex;
    justify-content: center;
    backdrop-filter: blur(8px);
    padding: 15px 20px;    
    font-size: 20px;
    background-color: rgba(0,0,0,0.2);
    font-weight: 700;
`

const GameOver = styled.div`
    margin: 20px 0 0 20px;
`

interface GameState {
    isPlaying: boolean;
    score: number;
    gameOver: boolean;
    dinoY: number;
    obstacleX: number;
    isJumping: boolean;
    jumpStartTime: number | null;
    spacePressed: boolean;
}

const DinoGame = () => {
    const JUMP_HEIGHT = 120;
    const MAX_JUMP_DURATION = 600;
    const JUMP_SPEED = 5;
    const OBSTACLE_SPEED = 6;
    const OBSTACLE_SPAWN_DISTANCE = 500;

    const [gameState, setGameState] = useState<GameState>({
        isPlaying: false,
        score: 0,
        gameOver: false,
        dinoY: 0,
        obstacleX: OBSTACLE_SPAWN_DISTANCE,
        isJumping: false,
        jumpStartTime: null,
        spacePressed: false
    });

    const startGame = useCallback(() => {
        if (!gameState.spacePressed) {
            setGameState({
                isPlaying: true,
                score: 0,
                gameOver: false,
                dinoY: 0,
                obstacleX: OBSTACLE_SPAWN_DISTANCE,
                isJumping: false,
                jumpStartTime: null,
                spacePressed: true
            });
        }
    }, [gameState.spacePressed]);

    const handleJumpStart = useCallback(() => {
        if (!gameState.isJumping && !gameState.gameOver && gameState.isPlaying) {
            setGameState(prev => ({
                ...prev,
                isJumping: true,
                jumpStartTime: Date.now()
            }));
        }
    }, [gameState.isJumping, gameState.gameOver, gameState.isPlaying]);

    const handleJumpEnd = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            isJumping: false,
            spacePressed: false
        }));
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
                if (!gameState.isPlaying || gameState.gameOver) {
                    startGame();
                } else {
                    handleJumpStart();
                }
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                handleJumpEnd();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameState.isPlaying, gameState.gameOver, handleJumpStart, handleJumpEnd, startGame]);

    useEffect(() => {
        if (gameState.isPlaying && !gameState.gameOver) {
            const gameLoop = setInterval(() => {
                setGameState(prev => {
                    const currentTime = Date.now();
                    let newY = prev.dinoY;

                    if (prev.isJumping && prev.jumpStartTime) {
                        const jumpDuration = currentTime - prev.jumpStartTime;

                        if (jumpDuration > MAX_JUMP_DURATION) {
                            newY = Math.max(0, newY - JUMP_SPEED);
                        } else {
                            newY = Math.min(JUMP_HEIGHT, newY + JUMP_SPEED);
                        }
                    } else {
                        newY = Math.max(0, newY - JUMP_SPEED);
                    }

                    const newObstacleX = prev.obstacleX <= -50 ? OBSTACLE_SPAWN_DISTANCE : prev.obstacleX - OBSTACLE_SPEED;
                    const newScore = prev.score + 1;

                    const collision =
                        prev.obstacleX < 100 &&
                        prev.obstacleX > 20 &&
                        newY < 40;

                    if (collision) {
                        clearInterval(gameLoop);
                        return {
                            ...prev,
                            gameOver: true,
                            isPlaying: false,
                            spacePressed: true
                        };
                    }

                    return {
                        ...prev,
                        dinoY: newY,
                        obstacleX: newObstacleX,
                        score: newScore
                    };
                });
            }, 20);

            return () => clearInterval(gameLoop);
        }
    }, [gameState.isPlaying, gameState.gameOver]);

    return (
        <Wrapper>
            <Container className="bg-white border-2 border-gray-200 rounded-lg p-4 relative h-64">
                {/* Ground */}
                <Ground className="absolute bottom-0 w-full border-b-2 border-gray-400" />

                {/* Dino */}
                <Dino
                    className="absolute left-10 w-12 h-12 bg-gray-800"
                    style={{
                        left: 100,
                        bottom: gameState.dinoY + 80,
                        transition: 'bottom 0.05s linear'
                    }}
                />

                {/* Obstacle */}
                <Obstacle
                    className="absolute bottom-0 w-8 h-16 bg-gray-600"
                    style={{
                        left: gameState.obstacleX + 110,
                        bottom: 80,
                    }}
                />

                {/* Score */}
                <Score className="absolute top-4 right-4 text-xl font-bold">
                    SCORE: {gameState.score}
                </Score>

                {/* Game Over Screen */}
                {gameState.gameOver && (
                    <GameOver className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                            <p className="mb-4">Final Score: {gameState.score}</p>
                            <p className="mb-4">Press Space to Play Again</p>
                        </div>
                    </GameOver>
                )}

                {/* Start Screen */}
                {!gameState.isPlaying && !gameState.gameOver && (
                    <GameOver className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-xl mb-4">Press Space to Start</p>
                        </div>
                    </GameOver>
                )}
            </Container>
        </Wrapper>
    );
};

export default DinoGame;