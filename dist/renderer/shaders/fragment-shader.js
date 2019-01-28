"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shader_types_1 = require("./shader-types");
class FragmentShader {
    constructor() { }
    getfragmentShaderCode(fragmentShaderType) {
        let fragmentShaderCode = '';
        switch (fragmentShaderType) {
            case shader_types_1.FragmentShaderType.PASS_THROUGH:
                fragmentShaderCode = this.getDefaultFragmentShader();
                break;
            case shader_types_1.FragmentShaderType.DEBUG:
                //fragmentShaderCode = this.getBasic2dShaderCode();
                break;
        }
        return fragmentShaderCode;
    }
    getDefaultFragmentShader() {
        return `#version 300 es
        precision mediump float;
        
        in vec4 u_color;

        out vec4 outColor;

        void main() {
          outColor = u_color;
        }`;
    }
}
exports.FragmentShader = FragmentShader;
//# sourceMappingURL=fragment-shader.js.map