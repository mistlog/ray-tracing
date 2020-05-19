function GenerateColor(ray: Ray, world: World, depth: number, generateColor: (ray: Ray, world: World, depth: number) => Vector3) {
    if (depth <= 0) {
        return new Vector3(0, 0, 0);
    }

    const record = world.hit(ray, { min: 0.001, max: Number.MAX_SAFE_INTEGER });
    if (record) {
        const { normal, point } = record;
        /**
         * Lambertian distribution, which has a distribution of cos(ϕ):
         */
        const target = point.clone().add(normal).add(randomUnitVector());
        const randomRay = new Ray(point, target.clone().sub(point));

        const color = generateColor(
            randomRay,
            world,
            depth - 1
        ).multiplyScalar(0.5);

        return color;
    }

    const unitDirection = ray.direction.clone().normalize();
    const t = 0.5 * (unitDirection.y + 1);
    const blend = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
    return blend;

}

function RenderImage(canvas: HTMLCanvasElement, generateColor: (ray: Ray, world: World, depth: number) => Vector3) {

    const width = canvas.width;
    const height = canvas.height
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, width, height);

    const world = new World()
        .addObject(new Sphere(new Vector3(0, 0, 1), 0.5))
        .addObject(new Sphere(new Vector3(0, 100.5, 1), 100));

    const camera = new Camera();

    const samples = 50;
    const maxDepth = 50;

    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
            const color = new Vector3(0, 0, 0);
            for (let k = 0; k < samples; ++k) {
                const u = (x + Math.random()) / width;
                const v = (y + Math.random()) / height;
                const ray = camera.getRay(u, v);

                color.add(generateColor(ray, world, maxDepth));
            }
            color.divideScalar(samples);

            //
            const r = Math.sqrt(color.x);
            const g = Math.sqrt(color.y);
            const b = Math.sqrt(color.z);

            //
            const n = (y * width + x) * 4;
            imageData.data[n] = r * 255;
            imageData.data[n + 1] = g * 255;
            imageData.data[n + 2] = b * 255;
            imageData.data[n + 3] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
}

import { onMount } from 'svelte';
import { Vector3, Ray } from 'three';
import { World } from '../common/world.js';
import { Sphere } from '../common/sphere.js';
import { Camera } from '../common/camera.js';
import { randomUnitVector } from '../common/math.js';

export default function Section() {
    let canvas: HTMLCanvasElement;

    onMount(() => {
        function generateColor(ray: Ray, world: World, depth: number) {
            //@ts-ignore
            <GenerateColor />;
        };

        //@ts-ignore
        <RenderImage />;
    });

    let width = 600;
    let height = 300;

    <div class="container">
        <canvas bindRef={canvas} width={width} height={height}></canvas>
    </div>
}