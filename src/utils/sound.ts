class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgm: HTMLAudioElement | null = null;
  public volume: number = 0.4; // Default comfortable volume (40%)
  public isMuted: boolean = false;
  public isPlayingBgm: boolean = false;
  private bgmFadeFrame: number | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public startBgm() {
    if (this.isMuted || typeof window === 'undefined') return;

    if (!this.bgm) {
      this.bgm = new Audio('/audio/bgm.mp3');
      this.bgm.loop = true;
      this.bgm.preload = 'auto';
      this.bgm.volume = 0;
    }

    const audio = this.bgm;
    audio.play()
      .then(() => {
        this.isPlayingBgm = true;
        if (!this.isMuted) {
          this.fadeBgm(this.volume, 1400);
        }
      })
      .catch(() => {
        // Autoplay may be blocked until user gesture
      });
  }

  public stopBgm() {
    if (!this.bgm) return;
    this.fadeBgm(0, 700, () => {
      this.bgm?.pause();
      this.isPlayingBgm = false;
    });
  }

  public fadeBgm(targetVol: number, durationMs = 800, onComplete?: () => void) {
    if (!this.bgm) return;
    if (this.bgmFadeFrame !== null) {
      cancelAnimationFrame(this.bgmFadeFrame);
    }

    const audio = this.bgm;
    const startVol = audio.volume;
    const clampedTarget = Math.min(1, Math.max(0, targetVol));
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      audio.volume = startVol + (clampedTarget - startVol) * progress;

      if (progress < 1) {
        this.bgmFadeFrame = requestAnimationFrame(step);
      } else {
        audio.volume = clampedTarget;
        this.bgmFadeFrame = null;
        onComplete?.();
      }
    };

    this.bgmFadeFrame = requestAnimationFrame(step);
  }

  public setVolume(newVol: number) {
    this.volume = Math.min(1, Math.max(0, newVol));
    if (this.bgm && !this.isMuted) {
      this.bgm.volume = this.volume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
    } else {
      this.startBgm();
      this.playInteract();
    }
    return this.isMuted;
  }

  // Alias for backward compatibility
  public startAmbient() {
    this.startBgm();
  }

  public stopAmbient() {
    this.stopBgm();
  }

  // Procedural Sound Effects (SFX)
  public playFootstep() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + Math.random() * 30, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.06);

      const sfxVol = 0.04 * (this.volume / 0.4);
      gain.gain.setValueAtTime(sfxVol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }

  public playInteract() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chime

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        const sfxVol = 0.08 * (this.volume / 0.4);
        gain.gain.setValueAtTime(sfxVol, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.4);
      });
    } catch {
      // ignore
    }
  }

  public playDialogueBlip() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(360 + Math.random() * 80, now);

      const sfxVol = 0.03 * (this.volume / 0.4);
      gain.gain.setValueAtTime(sfxVol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // ignore
    }
  }

  public playTeleport() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

      const sfxVol = 0.08 * (this.volume / 0.4);
      gain.gain.setValueAtTime(sfxVol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();
