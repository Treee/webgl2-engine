import { VertexShaderType } from './shader-types';
export declare class VertexShader {
    constructor();
    getVertexShaderCode(vertexShaderType: VertexShaderType): string;
    private getBasic3dShaderCode;
    private getBasicTextureShaderCode;
    private getBasic2dShaderCode;
    private getDefaultVertexShader;
}
