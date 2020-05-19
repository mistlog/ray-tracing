/**
 * # Sphere
 */
export class Sphere {
    center: Vector3;
    radius: number;
    material?: IMaterial;

    constructor(center: Vector3, radius: number, material?: IMaterial) {
        this.center = center;
        this.radius = radius;
        this.material = material;
    }
}

/**
 * ## Hit
 */
//@ts-ignore
<Sphere /> + function hit(this: Sphere, ray: Ray, range: IRange) {
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
                /**
                 * Use a negative radius, the geometry is unaffected, but the surface normal points inward. This can be used as a bubble to make a hollow glass sphere.
                 */
                const normal = intersection.clone().sub(this.center).divideScalar(this.radius);
                const isFrontFace = normal.dot(ray.direction) < 0;
                const record: IHitRecord = {
                    distance,
                    point: intersection,
                    normal: isFrontFace ? normal : normal.negate(),
                    isFrontFace,
                    material: this.material,
                };
                return record;
            }
        }
    }

    return null;
}

//#region -c material-sphere import
import { IRange, IHitRecord } from "./hit.js";
import { Ray, Vector3 } from "three";
import { IMaterial } from "./material.js";
//#endregion