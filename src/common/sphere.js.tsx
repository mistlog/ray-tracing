/**
 * # Sphere
 */
export class Sphere {
    center: Vector3;
    radius: number;

    constructor(center: Vector3, radius: number) {
        this.center = center;
        this.radius = radius;
    }
}

/**
 * ## Hit
 */
//@ts-ignore
<Sphere /> + function hit(ray: Ray, range: IRange) {
    /**
     * For document of math, see [Surface Normals](../sections/normal/section.html#hit-sphere).
     */
    const oc = ray.origin.clone().sub(this.center);

    const a = ray.direction.dot(ray.direction);
    const b = 2.0 * oc.dot(ray.direction);
    const c = oc.dot(oc) - this.radius * this.radius;
    const Δ = b * b - 4 * a * c;
    
    if (Δ >= 0) {
        /**
         * Return closest:
         */
        const roots = [(-b - Math.sqrt(Δ)) / (2.0 * a), (-b + Math.sqrt(Δ)) / (2.0 * a)];
        for (const distance of roots) {
            if (distance > range.min && distance < range.max) {
                const intersection = ray.at(distance, new Vector3());
                const record: IHitRecord = {
                    distance,
                    point: intersection,
                    normal: intersection.clone().sub(this.center).normalize()
                }
                return record;
            }
        }
    }

    return null;
}

//#region -c sphere import
import { IRange, IHitRecord } from "./hit.js";
import { Ray, Vector3 } from "three";
//#endregion