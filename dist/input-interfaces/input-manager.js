"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_input_1 = require("./keyboard-input");
const mouse_input_1 = require("./mouse-input");
class InputManager {
    constructor(keyboard = new keyboard_input_1.KeyboardInput(), mouse = new mouse_input_1.MouseInput()) {
        this.keyboard = keyboard;
        this.mouse = mouse;
    }
}
exports.InputManager = InputManager;
//# sourceMappingURL=input-manager.js.map