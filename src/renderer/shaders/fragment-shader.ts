import { FragmentShaderType } from './shader-types'

export class FragmentShader {
    constructor() { }

    getfragmentShaderCode(fragmentShaderType: FragmentShaderType): string {
        let fragmentShaderCode = '';
        switch (fragmentShaderType) {
            case FragmentShaderType.PASS_THROUGH:
                fragmentShaderCode = this.getDefaultFragmentShader();
                break;
            case FragmentShaderType.TEXTURE:
                fragmentShaderCode = this.getBasicTextureShaderCode();
                break;
            case FragmentShaderType.DEBUG:
                //fragmentShaderCode = this.getBasic2dShaderCode();
                break;
        }
        return fragmentShaderCode;
    }

    private getBasicTextureShaderCode(): string {
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

    private getDefaultFragmentShader() {
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
