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
            case shader_types_1.FragmentShaderType.TEXTURE:
                fragmentShaderCode = this.getBasicTextureShaderCode();
                break;
            case shader_types_1.FragmentShaderType.DEBUG:
                //fragmentShaderCode = this.getBasic2dShaderCode();
                break;
        }
        return fragmentShaderCode;
    }
    getBasicTextureShaderCode() {
        return `#version 300 es
        precision mediump float;
    
        // Passed in from the vertex shader.
        in vec4 v_color;
        in vec2 v_texCoord;
    
        uniform vec4 u_colorMult;
        uniform sampler2D u_image;
    
        out vec4 outColor;
    
        void main() {
            outColor = texture(u_image, v_texCoord);
        }
        `;
    }
    getDefaultFragmentShader() {
        return `#version 300 es
        precision mediump float;
        
        in vec4 v_color;

        out vec4 outColor;

        void main() {
          outColor = v_color;
        }
        `;
    }
}
exports.FragmentShader = FragmentShader;
//# sourceMappingURL=fragment-shader.js.map