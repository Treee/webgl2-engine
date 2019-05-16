"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MouseInput {
    constructor() {
        this.leftMouseButtonInfo = {
            x: 0,
            y: 0,
            isButtonClicked: false,
            isMouseMoving: false
        };
        this.middleMouseButtonInfo = {
            x: 0,
            y: 0,
            isButtonClicked: false,
            isMouseMoving: false
        };
        this.rightMouseButtonInfo = {
            x: 0,
            y: 0,
            isButtonClicked: false,
            isMouseMoving: false
        };
    }
}
exports.MouseInput = MouseInput;
//# sourceMappingURL=mouse-input.js.map