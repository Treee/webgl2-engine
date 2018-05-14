export class FragmentShader {
    constructor() { }

    getfragmentShaderCode(fragmentShaderType: string): string {
        let fragmentShaderCode = '';
        switch (fragmentShaderType) {
            case '2d':
                //fragmentShaderCode = this.getBasic2dShaderCode();
                break;
            default:
                fragmentShaderCode = this.getDefaultFragmentShader();
                break;
        }
        return fragmentShaderCode;
    }

    private getDefaultFragmentShader() {
        return `#version 300 es

        precision mediump float;

        uniform vec4 u_color;

        out vec4 outColor;

        void main() {
          outColor = u_color;
        }`;
    }
}
