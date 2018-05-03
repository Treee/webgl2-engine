export class ShaderProgramService {

    constructor() { }

    /**
     * Creates a program from 2 shaders.
     */
    createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
        // create a program.
        const program = gl.createProgram();

        // attach the shaders.
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // link the program.
        gl.linkProgram(program);

        // Check if it linked.
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            // something went wrong with the link
            throw new Error('program filed to link:' + gl.getProgramInfoLog(program));
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
    compileShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader | null {
        // Create the shader object
        const shader = gl.createShader(shaderType);
        // Set the shader source code.
        gl.shaderSource(shader, shaderSource);

        // Compile the shader
        gl.compileShader(shader);

        // Check if it compiled
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw new Error('could not compile shader:' + gl.getShaderInfoLog(shader));
        }
        return shader;
    }

}
