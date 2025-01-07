export class AudioPlayer {
    static playSound(soundPath) {
        const sound = new Audio(soundPath);
        sound.play();
    }
}
