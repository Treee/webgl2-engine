import { FragmentShaderType } from './shader-types';
export declare class FragmentShader {
    constructor();
    getfragmentShaderCode(fragmentShaderType: FragmentShaderType): string;
    private getBasicTextureShaderCode;
    private getDefaultFragmentShader;
}
