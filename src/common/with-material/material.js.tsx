/**
 * # Material
 * 
 * > For our program the material needs to do two things:
 *  > 1. Produce a scattered ray (or say it absorbed the incident ray).
 *  > 2. If scattered, say how much the ray should be attenuated.
 */

export interface IScatteredInfo {
    scattered: Ray | null;
    attenuation: Vector3;
}

export interface IMaterial {
    scatter(ray: Ray, record: IHitRecord): IScatteredInfo;
}

/**
 * ## Lambertian Material
 */
export class Lambertian implements IMaterial {
    albedo: Vector3;

    constructor(albedo: Vector3) {
        this.albedo = albedo;
    }

    scatter(ray: Ray, record: IHitRecord): IScatteredInfo {
        const scatterDirection = record.normal.clone().add(randomUnitVector());
        return {
            attenuation: this.albedo,
            scattered: new Ray(record.point, scatterDirection)
        };
    }
}

/**
 * ## Metal Material
 */
export class Metal implements IMaterial {
    albedo: Vector3;

    constructor(albedo: Vector3) {
        this.albedo = albedo;
    }

    scatter(ray: Ray, record: IHitRecord): IScatteredInfo {
        const reflected = ray.direction.clone().normalize().reflect(record.normal.clone().normalize());
        return {
            attenuation: this.albedo,
            scattered: new Ray(record.point, reflected)
        };
    }
}

/**
 * ## FuzzedMetal Material
 */
export class FuzzedMetal implements IMaterial {
    albedo: Vector3;
    fuzz: number;

    constructor(albedo: Vector3, fuzz: number) {
        this.albedo = albedo;
        this.fuzz = fuzz;
    }

    scatter(ray: Ray, record: IHitRecord): IScatteredInfo {
        const reflected = ray.direction.clone().normalize().reflect(record.normal.clone().normalize());
        const scattered = new Ray(record.point, reflected.add(randomPointInUnitSphere().multiplyScalar(this.fuzz)));
        return {
            attenuation: this.albedo,
            scattered: scattered.direction.dot(record.normal) > 0 ? scattered : null
        };
    }
}

/**
 * ## Dielectric Material
 */
export class Dielectric implements IMaterial {
    /**
     * refractive index = η′ / η
     */
    refractiveIndex: number;

    constructor(refractiveIndex: number) {
        this.refractiveIndex = refractiveIndex;
    }

    scatter(ray: Ray, record: IHitRecord): IScatteredInfo {
        //
        const attenuation = new Vector3(1, 1, 1);

        //
        const refractiveIndex = record.isFrontFace ? 1 / this.refractiveIndex : this.refractiveIndex;
        const R = ray.direction.clone().normalize();
        const N = record.normal.clone().normalize();

        /**
         * handle total internal reflection and use Schlick approximation:
         */
        const cosθ = Math.min(-R.dot(N), 1);
        const sinθ = Math.sqrt(1 - cosθ * cosθ);
        const reflectProbability = this.schlick(cosθ, refractiveIndex);

        if (refractiveIndex * sinθ > 1 || Math.random() < reflectProbability) {
            const reflected = R.clone().reflect(N);
            return {
                attenuation,
                scattered: new Ray(record.point, reflected)
            }
        }

        //
        const refractedX = (R.clone().add(N.clone().multiplyScalar(cosθ))).multiplyScalar(refractiveIndex);
        const refractedY = N.clone().multiplyScalar(-Math.sqrt(1 - refractedX.lengthSq()));
        const refracted = refractedX.add(refractedY);

        return {
            attenuation,
            scattered: new Ray(record.point, refracted)
        };
    }

    schlick(cosθ: number, refractiveIndex: number) {
        const r0 = Math.pow((1 - refractiveIndex) / (1 + refractiveIndex), 2);
        return r0 + (1 - r0) * Math.pow(1 - cosθ, 5);
    }
}

//#region -c material class import

import { Vector3, Ray } from "three";
import { IHitRecord } from "./hit.js";
import { randomUnitVector, randomPointInUnitSphere } from "../math.js";

//#endregion