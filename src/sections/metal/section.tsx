
/**
 * ---
 * {
 *  "useMath": true,
 *  "visualizers": [
 *      {"path": "./src/visualizers/visualizer.ts"}
 *  ]
 * }
 * ---
 * # Metal
 * 
 * > For smooth metals the ray won’t be randomly scattered. The key math is: how does a ray get reflected from a metal mirror? 
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: Metal](https://raytracing.github.io/books/RayTracingInOneWeekend.html#metal).
 *
 * <<v:custom-image fig-ray-reflect.jpg https://raytracing.github.io/images/fig.ray-reflect.jpg>>
 * 
 * ### Generate color
 */
function GenerateColor(ray: Ray, world: World, depth: number, generateColor: (ray: Ray, world: World, depth: number) => Vector3) {
    //#region -c metal hit
    if (depth <= 0) {
        return new Vector3(0, 0, 0);
    }

    const record = world.hit(ray, { min: 0.001, max: Number.MAX_SAFE_INTEGER });
    if (record) {
    //#endregion

/**
 */

    /**
     * Instead of generating a bounce ray directly, we will encapsulate this behavior into [Material](../../common/with-material/material.js.html):
     */
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

    //#region -c metal surrounding color

    }

    const unitDirection = ray.direction.clone().normalize();
    const t = 0.5 * (unitDirection.y + 1);
    const blend = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
    return blend;
}
    //#endregion

/**
 * ### Render image
 */
function RenderImage(canvas: HTMLCanvasElement, generateColor: (ray: Ray, world: World, depth: number) => Vector3) {

    //#region -c metal render image setup
    const width = canvas.width;
    const height = canvas.height
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, width, height);

    //#endregion

/**
 */

    /**
     * Use [Lambertian Material](../../common/with-material/material.js.html#lambertian-material) and [Metal Material](../../common/with-material/material.js.html#metal-material):
     */
    const world = new World()
        .addObject(new Sphere(new Vector3(0, 0, 1), 0.5, new Lambertian(new Vector3(0.7, 0.3, 0.3))))
        .addObject(new Sphere(new Vector3(0, 100.5, 1), 100, new Lambertian(new Vector3(0.8, 0.8, 0))))
        .addObject(new Sphere(new Vector3(1, 0, 1), 0.5, new Metal(new Vector3(0.8, 0.6, 0.2))))
        .addObject(new Sphere(new Vector3(-1, 0, 1), 0.5, new Metal(new Vector3(0.8, 0.8, 0.8))));

    //#region -c metal paint

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

//#endregion

/**
 * ## Result
 *
 * <<v:illustrator metal 100% 400px>>
 * 
 * Fuzzed metal:
 * 
 * <<v:custom-image fuzzed-metal.png ../../illustrations/fuzzed-metal.html>>
 * 
 */

//#region -c metal trivial setup

//#region -c metal imports
import { onMount } from 'svelte';
import { Vector3, Ray } from 'three';
import { World } from '../../common/with-material/world.js';
import { Sphere } from '../../common/with-material/sphere.js';
import { Camera } from '../../common/camera.js';
import { Lambertian, Metal } from '../../common/with-material/material.js';
//#endregion

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
//#endregion