import { IShader } from './i-shader';
import { ShaderProgramService } from './shader-program';

export class VertexShader implements IShader {

    constructor(private shaderService: ShaderProgramService) {

    }

    getBasic2dShader(gl: WebGLRenderingContext): WebGLShader {
        // console.log('vertex shader', this.getBasicShaderCode());
        return this.shaderService.compileShader(gl, this.getBasic2dShaderCode(), gl.VERTEX_SHADER);
    }

    getBasicShader(gl: WebGLRenderingContext): WebGLShader {
        // console.log('vertex shader', this.getBasicShaderCode());
        return this.shaderService.compileShader(gl, this.getBasicShaderCode(), gl.VERTEX_SHADER);
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

    private getBasicShaderCode(): string {
        return `#version 300 es

        in vec4 a_position;

        void main() {
          gl_Position = a_position;
        }
        `;
    }
}
