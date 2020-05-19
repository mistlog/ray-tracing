import { Camera } from "./camera.js";
import { Vector3 } from "three";

export class PositionableCamera extends Camera {
    constructor(fov: number, aspect: number, lookFrom: Vector3, lookAt: Vector3, up: Vector3) {
        super();

        //
        this.origin = lookFrom.clone();

        //
        const halfHeight = Math.tan(fov / 2);
        const halfWidth = aspect * halfHeight;

        //
        const w = lookFrom.clone().sub(lookAt).normalize();
        const u = up.clone().cross(w).normalize();
        const v = u.clone().cross(w);

        //
        this.topLeftCorner = this.origin.clone()
            .sub(u.clone().multiplyScalar(halfWidth))
            .sub(v.clone().multiplyScalar(halfHeight))
            .sub(w);

        this.horizontal = u.clone().multiplyScalar(2 * halfWidth);
        this.vertical = v.clone().multiplyScalar(2 * halfHeight);
    }
}