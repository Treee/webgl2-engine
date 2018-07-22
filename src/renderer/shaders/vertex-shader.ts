import { VertexShaderType } from './shader-types'
export class VertexShader {

    constructor() { }

    getVertexShaderCode(vertexShaderType: VertexShaderType): string {
        let vertexShaderCode = '';
        switch (vertexShaderType) {
            case VertexShaderType.TWO_D:
                vertexShaderCode = this.getBasic2dShaderCode();
                break;
            case VertexShaderType.DEBUG:
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
          gl_PointSize = 2.0;
        }
        `;
    }

    private getDefaultVertexShader() {
        return `#version 300 es

        in vec4 a_position;

        void main() {
          gl_Position = a_position;
          gl_PointSize = 2.0;
        }
        `;
    }
}
