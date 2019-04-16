import { VertexShaderType } from './shader-types'
export class VertexShader {

    constructor() { }

    getVertexShaderCode(vertexShaderType: VertexShaderType): string {
        let vertexShaderCode = '';
        switch (vertexShaderType) {
            case VertexShaderType.TWO_D:
                vertexShaderCode = this.getBasic2dShaderCode();
                break;

            case VertexShaderType.TEXTURE:
                vertexShaderCode = this.getBasicTextureShaderCode();
                break;

            case VertexShaderType.DEBUG:
                vertexShaderCode = this.getDefaultVertexShader();
                break;
        }
        return vertexShaderCode;
    }

    private getBasicTextureShaderCode(): string {
        return `#version 300 es

        in vec4 a_position;
        in vec4 a_color;
        in vec2 a_texCoord;
    
        uniform mat4 u_matrix;
        uniform vec2 u_resolution;
    
        out vec4 v_color;
        out vec2 v_texCoord;
    
        void main() {
            // Multiply the position by the matrix.
            gl_Position = u_matrix * a_position;
        
            // pass the texCoord to the fragment shader
            // The GPU will interpolate this value between points.
            v_texCoord = a_texCoord;
        }
        `;
    }

    private getBasic2dShaderCode(): string {
        return `#version 300 es
        in vec2 a_position;
        
        uniform vec4 u_color;
        uniform mat3 u_transform;

        out vec4 v_color;

        void main() {
          gl_Position = vec4((u_transform * vec3(a_position, 1)).xy, 0, 1);
          gl_PointSize = 2.0;
          v_color = u_color;
        }
        `;
    }

    private getDefaultVertexShader() {
        return `#version 300 es

        in vec4 a_position;

        uniform vec4 u_color;

        out vec4 v_color;

        void main() {
          gl_Position = a_position;
          gl_PointSize = 2.0;
          v_color = u_color;
        }
        `;
    }
}
