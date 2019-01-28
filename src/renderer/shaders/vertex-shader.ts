import { VertexShaderType } from './shader-types'
export class VertexShader {

    constructor() { }

    getVertexShaderCode(vertexShaderType: VertexShaderType): string {
        let vertexShaderCode = '';
        switch (vertexShaderType) {
            case VertexShaderType.TWO_D:
                vertexShaderCode = this.getBasic2dShaderCode();
                break;

            case VertexShaderType.PARTICLE:
                vertexShaderCode = this.getBasicParticleShaderCode();
                break;

            case VertexShaderType.DEBUG:
                vertexShaderCode = this.getDefaultVertexShader();
                break;
        }
        return vertexShaderCode;
    }

    private getBasicParticleShaderCode(): string {
        return `#version 300 es
        in vec2 a_position;
        in vec4 a_color;

        uniform mat3 u_transform;

        out vec4 v_color;

        void main() {
          gl_Position = vec4((u_transform * vec3(a_position, 1)).xy, 0, 1);
          gl_PointSize = 2.0;
          v_color = a_color
        }
        `;
    }

    private getBasic2dShaderCode(): string {
        return `#version 300 es
        in vec2 a_position;
        in vec4 a_color;

        uniform mat3 u_transform;

        out vec4 v_color;

        void main() {
          gl_Position = vec4((u_transform * vec3(a_position, 1)).xy, 0, 1);
          gl_PointSize = 2.0;
          v_color = a_color
        }
        `;
    }

    private getDefaultVertexShader() {
        return `#version 300 es

        in vec4 a_position;
        in vec4 a_color;

        out vec4 v_color;

        void main() {
          gl_Position = a_position;
          gl_PointSize = 2.0;
          v_color = a_color
        }
        `;
    }
}
