/**
 * # Camera
 */
export class Camera {
    topLeftCorner: Vector3;
    horizontal: Vector3;
    vertical: Vector3;
    origin: Vector3;

    /**
     * Convention of the coordinate system: [Section: Ray](../sections/ray/section.html#render-image).
     */
    constructor() {
        this.topLeftCorner = new Vector3(-2, -1, 1);
        this.horizontal = new Vector3(4, 0, 0);
        this.vertical = new Vector3(0, 2, 0);
        this.origin = new Vector3(0, 0, 0);
    }
}

/**
 * ## Get Ray
 */
//@ts-ignore
<Camera /> + function getRay(u: number, v: number) {
    const direction = this.topLeftCorner.clone()
        .addScaledVector(this.horizontal, u)
        .addScaledVector(this.vertical, v)
        .sub(this.origin);

    return new Ray(this.origin, direction);
};

//#region -c camera import
import { Vector3, Ray } from "three";
//#endregion