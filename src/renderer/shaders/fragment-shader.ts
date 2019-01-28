import { FragmentShaderType } from './shader-types'

export class FragmentShader {
    constructor() { }

    getfragmentShaderCode(fragmentShaderType: FragmentShaderType): string {
        let fragmentShaderCode = '';
        switch (fragmentShaderType) {
            case FragmentShaderType.PASS_THROUGH:
                fragmentShaderCode = this.getDefaultFragmentShader();
                break;
            case FragmentShaderType.DEBUG:
                //fragmentShaderCode = this.getBasic2dShaderCode();
                break;
        }
        return fragmentShaderCode;
    }

    private getDefaultFragmentShader() {
        return `#version 300 es
        precision mediump float;
        
        in vec4 v_color;

        out vec4 outColor;

        void main() {
          outColor = v_color;
        }`;
    }
}
