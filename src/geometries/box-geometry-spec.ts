import { BoxGeometry } from './box-geometry';
import { Vec3 } from '../math/vec3';
import { Vec4 } from '../math/vec4';

describe('Box Geometry', () => {
    let testBoxGeometry: BoxGeometry;
    let webglRenderSpy, webglProgramSpy;

    beforeEach(() => {
        webglRenderSpy = jasmine.createSpyObj('WebGL2RenderingContext', ['getAttribLocation']);
        webglProgramSpy = jasmine.createSpyObj('WebGLProgram', ['createProgram']);
        testBoxGeometry = new BoxGeometry(webglRenderSpy, webglProgramSpy);
        // default private values
        expect(testBoxGeometry.getPosition()).toEqual(new Vec3());
        expect(testBoxGeometry.getScale()).toEqual(new Vec3(1, 1, 1));
        // rotation is at 90 degrees by default
        expect(testBoxGeometry.getRotation()).toEqual(new Vec3(0, 1, 0));
        expect(testBoxGeometry.getColor()).toEqual(new Vec4());
    });

});