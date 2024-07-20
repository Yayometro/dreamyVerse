import notificationSoundFile from "../../public/sounds/notification.mp3";
import messageSoundFile from "../../public/sounds/newMessage.mp3";
import newDreamSoundFile from "../../public/sounds/newDream.mp3";

let notificationSound: AudioBuffer | null = null;
let messageSound: AudioBuffer | null = null;
let newDreamSound: AudioBuffer | null = null;

function getAudioContext(): AudioContext {
  // Type guard to handle older versions of Safari
  if (window.AudioContext) {
    return new window.AudioContext();
  } else if ((window as any).webkitAudioContext) {
    return new (window as any).webkitAudioContext();
  } else {
    throw new Error('AudioContext is not supported in this browser');
  }
}

export async function loadSound(url: string): Promise<AudioBuffer> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioContext = getAudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

export function playSound(audioBuffer: AudioBuffer) {
  const audioContext = getAudioContext();
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
}

// Load sounds and store them in variables
export async function initializeSounds() {
  notificationSound = await loadSound(notificationSoundFile);
  messageSound = await loadSound(messageSoundFile);
  newDreamSound = await loadSound(newDreamSoundFile);
}

export function playNotificationSound() {
  if (notificationSound) {
    playSound(notificationSound);
  }
}

export function playMessageSound() {
  if (messageSound) {
    playSound(messageSound);
  }
}
export function playNewDreamSound() {
  if (newDreamSound) {
    playSound(newDreamSound);
  }
}
