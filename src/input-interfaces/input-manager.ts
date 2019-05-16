import { KeyboardInput } from "./keyboard-input";
import { MouseInput } from "./mouse-input";

export class InputManager {
    keyboard: KeyboardInput;
    mouse: MouseInput;
    constructor(keyboard: KeyboardInput = new KeyboardInput(), mouse: MouseInput = new MouseInput()) {
        this.keyboard = keyboard;
        this.mouse = mouse;
    }
}