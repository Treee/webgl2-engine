import { VertexShader } from './vertex-shader';
import { FragmentShader } from './fragment-shader';

export class ShaderProgram {

    constructor() { }

    getBasic2dProgram(gl: WebGL2RenderingContext): WebGLProgram {
        return this.createShaderProgram(gl, '2d', '2d');
    }

    private createShaderProgram(gl: WebGL2RenderingContext, vertexShaderType: string, fragmentShaderType: string): WebGLProgram {
        return this.createProgram(gl, this.createVertexShader(gl, vertexShaderType), this.createFragmentShader(gl, fragmentShaderType));
    };

    private createVertexShader(gl: WebGLRenderingContext, vertexShaderType: string): WebGLShader {
        const vertexShader = new VertexShader();
        return this.compileShader(gl, vertexShader.getVertexShaderCode(vertexShaderType), gl.VERTEX_SHADER);
    }

    private createFragmentShader(gl: WebGLRenderingContext, fragmentShaderType: string): WebGLShader {
        const fragmentShader = new FragmentShader();
        return this.compileShader(gl, fragmentShader.getfragmentShaderCode(fragmentShaderType), gl.FRAGMENT_SHADER);
    }

    /**
    * Creates a program from 2 shaders.
    */
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

    /**
     * Creates and compiles a shader.
     *
     * @param {!WebGLRenderingContext} gl The WebGL Context.
     * @param {string} shaderSource The GLSL source code for the shader.
     * @param {number} shaderType The type of shader, VERTEX_SHADER or FRAGMENT_SHADER.
     * @return {!WebGLShader} The shader.
    */
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
