function GenerateColor(ray: Ray, world: World, depth: number, generateColor: (ray: Ray, world: World, depth: number) => Vector3) {
    if (depth <= 0) {
        return new Vector3(0, 0, 0);
    }

    const record = world.hit(ray, { min: 0.001, max: Number.MAX_SAFE_INTEGER });
    if (record) {
        const { scattered, attenuation } = record.material.scatter(ray, record);
        if (scattered) {
            const color = generateColor(
                scattered,
                world,
                depth - 1
            );
            return color.multiply(attenuation);
        }
        return new Vector3(0, 0, 0);
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

    const world = SphereOceanWorld();

    /**
     */
    const lookFrom = new Vector3(13, -2, -3);
    const lookAt = new Vector3(0, 0, 0);
    const up = new Vector3(0, -1, 0);
    const fov = Math.PI / 9;
    const aspect = width / height;
    const aperture = 0.1;
    const focusDistance = 10;
    const camera = new DefocusBlurCamera(fov, aspect, lookFrom, lookAt, up, aperture, focusDistance);

    /**
     */
    const samples = 5;
    const maxDepth = 5;

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
import { World } from '../common/with-material/world.js';
import { DefocusBlurCamera } from '../common/defocus-blur-camera.js';
import { SphereOceanWorld } from '../common/with-material/sphere-ocean.js';

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