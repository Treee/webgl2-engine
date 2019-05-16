import { KeyboardInput } from "./keyboard-input";
import { MouseInput } from "./mouse-input";
export declare class InputManager {
    keyboard: KeyboardInput;
    mouse: MouseInput;
    constructor(keyboard: KeyboardInput, mouse: MouseInput);
}
