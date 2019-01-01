import { VertexShader } from './vertex-shader';
import { FragmentShader } from './fragment-shader';
import { VertexShaderType, FragmentShaderType } from './shader-types';

export class ShaderProgram {

    constructor() { }

    public getBasic2dProgram(gl: WebGL2RenderingContext): WebGLProgram {
        return this.createShaderProgram(gl, VertexShaderType.TWO_D, FragmentShaderType.PASS_THROUGH);
    }

    public getBasicParticleProgram(gl: WebGL2RenderingContext): WebGLProgram {
        return this.createShaderProgram(gl, VertexShaderType.PARTICLE, FragmentShaderType.PASS_THROUGH);
    }

    private createShaderProgram(gl: WebGL2RenderingContext, vertexShaderType: VertexShaderType, fragmentShaderType: FragmentShaderType): WebGLProgram {
        return this.createProgram(gl, this.createVertexShader(gl, vertexShaderType), this.createFragmentShader(gl, fragmentShaderType));
    };

    private createVertexShader(gl: WebGLRenderingContext, vertexShaderType: VertexShaderType): WebGLShader {
        const vertexShader = new VertexShader();
        return this.compileShader(gl, vertexShader.getVertexShaderCode(vertexShaderType), gl.VERTEX_SHADER);
    }

    private createFragmentShader(gl: WebGLRenderingContext, fragmentShaderType: FragmentShaderType): WebGLShader {
        const fragmentShader = new FragmentShader();
        return this.compileShader(gl, fragmentShader.getfragmentShaderCode(fragmentShaderType), gl.FRAGMENT_SHADER);
    }

    private createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        // create a program.
        const program = gl.createProgram();

        if (!program) {
            throw new Error('Program failed to create.');
        }

        // attach the shaders.
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // link the program.
        gl.linkProgram(program);

        // Check if it linked.
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            throw new Error('Program failed to link:' + gl.getProgramInfoLog(program));
        }
        return program;
    }

    private compileShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader {
        // Create the shader object
        const shader = gl.createShader(shaderType);
        if (!shader) {
            throw new Error('Shader failed to create.');
        }
        // Set the shader source code.
        gl.shaderSource(shader, shaderSource);

        // Compile the shader
        gl.compileShader(shader);

        // Check if it compiled
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw new Error('Failed to compile shader:' + gl.getShaderInfoLog(shader));
        }
        return shader;
    }


}
