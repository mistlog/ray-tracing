import { World } from "./world.js";
import { Sphere } from "./sphere.js";
import { Lambertian, Dielectric, Metal, FuzzedMetal } from "./material.js";
import { randomPoint, random } from "../math.js";
import { Vector3 } from "three";

export function SphereOceanWorld() {
    const world = new World();

    // main scene
    const plane = new Sphere(new Vector3(0, 1000, 0), 1000, new Lambertian(new Vector3(0.5, 0.5, 0.5)));
    world.addObject(plane)
        .addObject(new Sphere(new Vector3(0, -1, 0), 1, new Dielectric(1.5)))
        .addObject(new Sphere(new Vector3(-4, -1, 0), 1, new Lambertian(new Vector3(0.4, 0.2, 0.1))))
        .addObject(new Sphere(new Vector3(4, -1, 0), 1, new Metal(new Vector3(0.7, 0.6, 0.5))));

    // random spheres
    const count = 5;
    for (let i = -count; i < count; i += 2) {
        for (let j = -count; j < count; j += 2) {
            const randomForMaterial = Math.random();
            const center = new Vector3(i + 0.9 * Math.random(), -0.2, -(j + 0.9 * Math.random()));
            if (center.clone().sub(new Vector3(4, -0.2, 0)).length() > 0.9) {
                if (randomForMaterial < 0.8) {
                    // diffuse
                    const albedo = randomPoint(0, 1);
                    world.addObject(new Sphere(center, 0.2, new Lambertian(albedo)));
                }
                else if (randomForMaterial < 0.95) {
                    // metal
                    const albedo = randomPoint(0.5, 1);
                    const fuzz = random(0, 0.5);
                    world.addObject(new Sphere(center, 0.2, new FuzzedMetal(albedo, fuzz)));
                }
                else {
                    // glass
                    world.addObject(new Sphere(center, 0.2, new Dielectric(1.5)));
                }
            }
        }
    }
    return world;
}