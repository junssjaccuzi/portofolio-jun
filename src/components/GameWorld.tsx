import React, { useState, useEffect, useRef, useCallback } from 'react';
import { portfolioData, stations, npcs } from '../data/portfolioData';
import { NPC } from '../types/portfolio';
import { ParallaxBackground } from './ParallaxBackground';
import { Player, PlayerAction } from './Player';
import { StationMarker } from './StationMarker';
import { NPCCharacter } from './NPCCharacter';
import { sound } from '../utils/sound';

interface GameWorldProps {
  playerX: number;
  setPlayerX: React.Dispatch<React.SetStateAction<number>>;
  onOpenStation: (stationId: string) => void;
  onTalkNPC: (npc: NPC) => void;
  isModalOpen: boolean;
  mobileMovingLeft: boolean;
  mobileMovingRight: boolean;
  playerAction: PlayerAction;
  setPlayerAction: React.Dispatch<React.SetStateAction<PlayerAction>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const WORLD_WIDTH = 10800;

export const GameWorld: React.FC<GameWorldProps> = ({
  playerX,
  setPlayerX,
  onOpenStation,
  onTalkNPC,
  isModalOpen,
  mobileMovingLeft,
  mobileMovingRight,
  playerAction,
  setPlayerAction,
  isRunning,
  setIsRunning
}) => {
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [targetX, setTargetX] = useState<number | null>(null);
  const [clickRipple, setClickRipple] = useState<{ x: number; y: number } | null>(null);

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const lastFootstepTime = useRef<number>(0);
  const worldContainerRef = useRef<HTMLDivElement | null>(null);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;

      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;

      // Shift toggles run
      if (e.key === 'Shift') {
        setIsRunning(true);
      }

      // Hotkey H: Wave Hi
      if (key === 'h' && playerAction !== 'hi') {
        setPlayerAction('hi');
        sound.playInteract();
        return;
      }

      // Hotkey S / Down: Sit / Stand
      if ((key === 's' || key === 'arrowdown') && playerAction !== 'walk') {
        if (playerAction === 'sit') {
          setPlayerAction('sit-to-stand');
        } else {
          setPlayerAction('sit');
        }
        sound.playInteract();
        return;
      }

      // Hotkey K: Relax
      if (key === 'k') {
        setPlayerAction('smoke');
        sound.playInteract();
        return;
      }

      // Hotkey E: Open closest station
      if (key === 'e') {
        const closestStation = stations.find(s => Math.abs(playerX - s.positionX) < 260);
        if (closestStation) {
          sound.playInteract();
          onOpenStation(closestStation.id);
        }
      }

      // Hotkey F: Talk to closest NPC
      if (key === 'f') {
        const closestNPC = npcs.find(n => Math.abs(playerX - n.positionX) < 220);
        if (closestNPC) {
          sound.playDialogueBlip();
          onTalkNPC(closestNPC);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      if (e.key === 'Shift') {
        setIsRunning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerX, isModalOpen, playerAction, onOpenStation, onTalkNPC, setIsRunning, setPlayerAction]);

  // Main Movement Loop
  useEffect(() => {
    let animId: number;

    const updateGame = () => {
      if (!isModalOpen) {
        let moving = false;
        let dx = 0;
        const currentSpeed = isRunning ? 12 : 7.5;

        // Check Left
        if (
          keysPressed.current['arrowleft'] ||
          keysPressed.current['a'] ||
          mobileMovingLeft
        ) {
          dx -= currentSpeed;
          setFacing('left');
          moving = true;
          setTargetX(null);
        }

        // Check Right
        if (
          keysPressed.current['arrowright'] ||
          keysPressed.current['d'] ||
          mobileMovingRight
        ) {
          dx += currentSpeed;
          setFacing('right');
          moving = true;
          setTargetX(null);
        }

        // Handle Click-to-move
        if (targetX !== null && !moving) {
          const diff = targetX - playerX;
          if (Math.abs(diff) > currentSpeed) {
            dx = diff > 0 ? currentSpeed : -currentSpeed;
            setFacing(diff > 0 ? 'right' : 'left');
            moving = true;
          } else {
            setTargetX(null);
          }
        }

        if (moving) {
          // If was sitting or hi, reset to walk
          if (playerAction !== 'walk') {
            setPlayerAction('walk');
          }

          setPlayerX(prev => Math.min(WORLD_WIDTH - 200, Math.max(150, prev + dx)));

          // Footstep Audio
          const now = Date.now();
          const stepInterval = isRunning ? 190 : 280;
          if (now - lastFootstepTime.current > stepInterval) {
            sound.playFootstep();
            lastFootstepTime.current = now;
          }
        } else {
          // If not moving and action is walk, switch to idle
          if (playerAction === 'walk') {
            setPlayerAction('idle');
          }
        }
      } else {
        if (playerAction === 'walk') {
          setPlayerAction('idle');
        }
      }

      animId = requestAnimationFrame(updateGame);
    };

    animId = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animId);
  }, [playerX, targetX, isModalOpen, mobileMovingLeft, mobileMovingRight, isRunning, playerAction, setPlayerAction, setPlayerX]);

  // Click on Game World to Move Player
  const handleWorldClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isModalOpen) return;
    const container = worldContainerRef.current;
    if (!container) return;

    const viewportWidth = window.innerWidth;
    const cameraOffset = playerX - viewportWidth / 2;
    const clickWorldX = e.clientX + cameraOffset;

    const clampedX = Math.min(WORLD_WIDTH - 200, Math.max(150, clickWorldX));
    setTargetX(clampedX);

    // If sitting or hi, stand up and walk
    if (playerAction === 'sit') {
      setPlayerAction('sit-to-stand');
    }

    setClickRipple({ x: clickWorldX, y: e.clientY });
    setTimeout(() => setClickRipple(null), 600);
  }, [playerX, isModalOpen, playerAction, setPlayerAction]);

  const handleActionComplete = (completedAction: PlayerAction) => {
    if (completedAction === 'hi' || completedAction === 'sit-to-stand' || completedAction === 'smoke') {
      setPlayerAction('idle');
    }
  };

  // Smooth Camera following player
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const cameraX = Math.min(
    Math.max(0, playerX - viewportWidth / 2),
    WORLD_WIDTH - viewportWidth
  );

  return (
    <div 
      ref={worldContainerRef}
      className="game-world relative w-screen h-screen overflow-hidden bg-slate-950 select-none cursor-pointer"
      onClick={handleWorldClick}
    >
      {/* Dynamic Seamless Panorama Backgrounds */}
      <ParallaxBackground cameraX={cameraX} />

      {/* World Interactive Plane (10800px wide, translated by cameraX) */}
      <div
        className="absolute top-0 left-0 h-full w-[10800px] will-change-transform"
        style={{ transform: `translateX(${-cameraX}px)` }}
      >
        {/* Click Target Ripple Effect */}
        {clickRipple && (
          <div
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${clickRipple.x}px`, top: `${clickRipple.y}px` }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-amber-400 animate-ping" />
            <div className="w-4 h-4 rounded-full bg-amber-400 -mt-7 ml-3 shadow-[0_0_10px_#f59e0b]" />
          </div>
        )}

        {/* 6 Stations (Halte / Pos Portofolio) */}
        {stations.map(station => (
          <StationMarker
            key={station.id}
            station={station}
            playerX={playerX}
            onOpen={onOpenStation}
          />
        ))}

        {/* 6 Interactive NPCs with Authentic Sprite Sheets */}
        {npcs.map(npc => (
          <NPCCharacter
            key={npc.id}
            npc={npc}
            playerX={playerX}
            onTalk={onTalkNPC}
          />
        ))}

        {/* Authentic Canvas Player Character */}
        <Player
          x={playerX}
          action={playerAction}
          facing={facing}
          isRunning={isRunning}
          nickname={portfolioData.nickname}
          onActionComplete={handleActionComplete}
        />
      </div>
    </div>
  );
};
