
/**
 * # Hit
 * 
 * ## Hittable
 * 
 * Hittable is an abstraciton of object in this implementation, we don't use `abstract class` in C++ world, instead we use `interface` in typescript:
 *  
 * > While it is tempting to have an array of spheres, a very clean solution is the make an “abstract class” for anything a ray might hit and make both a sphere and a list of spheres just something you can hit. What that class should be called is something of a quandary — calling it an “object” would be good if not for “object oriented” programming. “Surface” is often used, with the weakness being maybe we will want volumes. “hittable” emphasizes the member function that unites them. I don’t love any of these but I will go with “hittable”.
 * >
 * > [6. Surface Normals and Multiple Objects](https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects)
 */ 

export interface IHittable {
    hit: (ray: Ray, range: IRange) => IHitRecord | null;
}

export interface IRange {
    min: number;
    max: number;
}

/**
 * ## Hit Record
 * 
 * Data of an intersection point.
 */
export interface IHitRecord {
    point: Vector3;
    normal: Vector3;

    /**
     * Distance form ray origin to this point:
     */
    distance: number;
}

//#region -c hit import
import { Vector3, Ray } from "three";
//#endregion