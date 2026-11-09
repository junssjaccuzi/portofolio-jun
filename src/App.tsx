import { useState, useCallback, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { GameWorld } from './components/GameWorld';
import { HeaderNav } from './components/HeaderNav';
import { Minimap } from './components/Minimap';
import { MobileControls } from './components/MobileControls';
import { StationModal } from './components/StationModal';
import { DialogueModal } from './components/DialogueModal';
import { NPC } from './types/portfolio';
import { stations, npcs } from './data/portfolioData';
import { sound } from './utils/sound';
import { PlayerAction } from './components/Player';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [playerX, setPlayerX] = useState(480);
  const [playerAction, setPlayerAction] = useState<PlayerAction>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStationId, setActiveStationId] = useState<string | null>(null);
  const [activeNPC, setActiveNPC] = useState<NPC | null>(null);

  // Mobile movement states
  const [mobileMovingLeft, setMobileMovingLeft] = useState(false);
  const [mobileMovingRight, setMobileMovingRight] = useState(false);

  const isModalOpen = activeStationId !== null || activeNPC !== null;

  const handleOpenStation = useCallback((stationId: string) => {
    setActiveNPC(null);
    setActiveStationId(stationId);
  }, []);

  const handleCloseStation = useCallback(() => {
    setActiveStationId(null);
  }, []);

  const handleTalkNPC = useCallback((npc: NPC) => {
    setActiveStationId(null);
    setActiveNPC(npc);
  }, []);

  const handleCloseNPC = useCallback(() => {
    setActiveNPC(null);
  }, []);

  const handleTeleport = useCallback((positionX: number) => {
    setPlayerX(positionX);
  }, []);

  // Global ESC key listener to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeStationId) handleCloseStation();
        if (activeNPC) handleCloseNPC();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStationId, activeNPC, handleCloseStation, handleCloseNPC]);

  // Check if player is near any station or NPC for interact button
  const canInteract = stations.some(s => Math.abs(playerX - s.positionX) < 260) ||
                      npcs.some(n => Math.abs(playerX - n.positionX) < 220);

  const handleMobileInteract = () => {
    const closestStation = stations.find(s => Math.abs(playerX - s.positionX) < 260);
    if (closestStation) {
      sound.playInteract();
      handleOpenStation(closestStation.id);
      return;
    }
    const closestNPC = npcs.find(n => Math.abs(playerX - n.positionX) < 220);
    if (closestNPC) {
      sound.playDialogueBlip();
      handleTalkNPC(closestNPC);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070a13] font-sans">
      {/* 1. Authentic Loading / Splash Screen */}
      {isLoading && (
        <LoadingScreen onStart={() => setIsLoading(false)} />
      )}

      {/* 2. Top Header & Fast Travel Bar */}
      <HeaderNav
        playerX={playerX}
        onTeleport={handleTeleport}
        onOpenStation={handleOpenStation}
      />

      {/* 3. Main 2D Side-scrolling Interactive Game World */}
      <GameWorld
        playerX={playerX}
        setPlayerX={setPlayerX}
        onOpenStation={handleOpenStation}
        onTalkNPC={handleTalkNPC}
        isModalOpen={isModalOpen}
        mobileMovingLeft={mobileMovingLeft}
        mobileMovingRight={mobileMovingRight}
        playerAction={playerAction}
        setPlayerAction={setPlayerAction}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />

      {/* 4. Bottom Minimap Radar */}
      <Minimap
        playerX={playerX}
        worldWidth={10800}
        onNavigate={handleTeleport}
      />

      {/* 5. Mobile & Desktop Touch Controls */}
      <MobileControls
        onMoveLeftStart={() => setMobileMovingLeft(true)}
        onMoveLeftEnd={() => setMobileMovingLeft(false)}
        onMoveRightStart={() => setMobileMovingRight(true)}
        onMoveRightEnd={() => setMobileMovingRight(false)}
        onInteract={handleMobileInteract}
        canInteract={canInteract}
        playerAction={playerAction}
        setPlayerAction={setPlayerAction}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />

      {/* 6. Station Detail Modal */}
      {activeStationId && (
        <StationModal
          stationId={activeStationId}
          onClose={handleCloseStation}
          onNavigateStation={handleOpenStation}
        />
      )}

      {/* 7. NPC Dialogue Modal */}
      {activeNPC && (
        <DialogueModal
          npc={activeNPC}
          onClose={handleCloseNPC}
        />
      )}
    </div>
  );
}

export default App;
