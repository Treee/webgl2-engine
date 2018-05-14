export class VertexShader {

    constructor() { }

    // getBasic2dShader(gl: WebGLRenderingContext): WebGLShader | null {
    //     // console.log('vertex shader', this.getBasicShaderCode());
    //     return this.shaderService.compileShader(gl, this.getBasic2dShaderCode(), gl.VERTEX_SHADER);
    // }

    // getBasicShader(gl: WebGLRenderingContext): WebGLShader | null {
    //     // console.log('vertex shader', this.getBasicShaderCode());
    //     return this.shaderService.compileShader(gl, this.getBasicShaderCode(), gl.VERTEX_SHADER);
    // }

    getVertexShaderCode(vertexShaderType: string): string {
        let vertexShaderCode = '';
        switch (vertexShaderType) {
            case '2d':
                vertexShaderCode = this.getBasic2dShaderCode();
                break;
            default:
                vertexShaderCode = this.getDefaultVertexShader();
                break;
        }
        return vertexShaderCode;
    }

    private getBasic2dShaderCode(): string {
        return `#version 300 es
        in vec2 a_position;

        uniform mat3 u_transform;

        void main() {
          gl_Position = vec4((u_transform * vec3(a_position, 1)).xy, 0, 1);
        }
        `;
    }

    private getDefaultVertexShader() {
        return `#version 300 es

        in vec4 a_position;

        void main() {
          gl_Position = a_position;
        }
        `;
    }
}
