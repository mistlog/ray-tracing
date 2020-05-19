/**
 * # Wolrd
 * 
 * A list of hittable objects.
 */
export class World {
    objects: Array<IHittable>;

    constructor() {
        this.objects = [];
    }
}

/**
 * ## Hit
 */
//@ts-ignore
<World /> + function hit(this: World, ray: Ray, range: IRange) {
    /**
     * Closest distance and object:
     */
    let closestSoFar = range.max;
    let closest: IHitRecord = null;

    this.objects.forEach(object => {
        /**
         * Use `closestSoFar` as `range.max` to narrow the range and find the closest object: 
         */
        const record = object.hit(ray, { min: range.min, max: closestSoFar });
        if (record) {
            closestSoFar = record.distance;
            closest = record;
        }
    })

    return closest;
};

/**
 * ## Add Object
 */
//@ts-ignore
<World /> + function addObject(this: World, object: IHittable) {
    this.objects.push(object);
    return this;
}

//#region -c mateial-world import 
import { IHittable, IRange, IHitRecord } from "./hit.js";
import { Ray } from "three";
//#endregion