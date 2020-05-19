import { Camera } from "./camera.js";
import { Vector3, Ray } from "three";
import { randomPointInUnitDisk } from "./math.js";

export class DefocusBlurCamera extends Camera {
    u: Vector3;
    v: Vector3;
    w: Vector3;
    lensRadius: number;

    constructor(fov: number, aspect: number, lookFrom: Vector3, lookAt: Vector3, up: Vector3, aperture: number, focusDistance: number) {
        super();

        //
        this.origin = lookFrom.clone();
        this.lensRadius = aperture / 2;

        //
        const halfHeight = Math.tan(fov / 2) * focusDistance;
        const halfWidth = aspect * halfHeight;

        //
        this.w = lookFrom.clone().sub(lookAt).normalize();
        this.u = up.clone().cross(this.w).normalize();
        this.v = this.u.clone().cross(this.w);

        //
        this.topLeftCorner = this.origin.clone()
            .sub(this.u.clone().multiplyScalar(halfWidth))
            .sub(this.v.clone().multiplyScalar(halfHeight))
            .sub(this.w.clone().multiplyScalar(focusDistance));

        this.horizontal = this.u.clone().multiplyScalar(2 * halfWidth);
        this.vertical = this.v.clone().multiplyScalar(2 * halfHeight);
    }

    getRay(u: number, v: number) {
        const randomPoint = randomPointInUnitDisk().multiplyScalar(this.lensRadius);
        const offset = this.u.clone().multiplyScalar(randomPoint.x).addScaledVector(this.v, randomPoint.y);
        const randomOrigin = this.origin.clone().add(offset);

        const direction = this.topLeftCorner.clone()
            .addScaledVector(this.horizontal, u)
            .addScaledVector(this.vertical, v)
            .sub(randomOrigin);

        return new Ray(randomOrigin, direction);
    }
}