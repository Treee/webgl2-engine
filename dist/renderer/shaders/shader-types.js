"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VertexShaderType;
(function (VertexShaderType) {
    VertexShaderType[VertexShaderType["TWO_D"] = 0] = "TWO_D";
    VertexShaderType[VertexShaderType["THREE_D"] = 1] = "THREE_D";
    VertexShaderType[VertexShaderType["PARTICLE"] = 2] = "PARTICLE";
    VertexShaderType[VertexShaderType["DEBUG"] = 3] = "DEBUG";
})(VertexShaderType = exports.VertexShaderType || (exports.VertexShaderType = {}));
var FragmentShaderType;
(function (FragmentShaderType) {
    FragmentShaderType[FragmentShaderType["DEBUG"] = 0] = "DEBUG";
    FragmentShaderType[FragmentShaderType["PASS_THROUGH"] = 1] = "PASS_THROUGH";
})(FragmentShaderType = exports.FragmentShaderType || (exports.FragmentShaderType = {}));
//# sourceMappingURL=shader-types.js.map