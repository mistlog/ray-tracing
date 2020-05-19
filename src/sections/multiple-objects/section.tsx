/**
 * ---
 * {
 *  "useMath": true,
 *  "visualizers": [
 *      {"path": "./src/visualizers/visualizer.ts"}
 *  ]
 * }
 * ---
 * # Multiple Objects
 * 
 * > Now, how about several spheres?
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: Surface Normals and Multiple Objects](https://raytracing.github.io/books/RayTracingInOneWeekend.html#surfacenormalsandmultipleobjects).
 * 
 * To add multiple objects, we need some abstractions, see:
 * 
 * * [hit](../../common/hit.js.html): abstraction of object we use
 * * [sphere](../../common/sphere.js.html): sphere is a hittable object
 * * [world](../../common/world.js.html): a list of hittable objects
 * 
 * ### Generate color
 */

function GenerateColor(ray: Ray, world: World) {
    const record = world.hit(ray, { min: 0, max: Number.MAX_SAFE_INTEGER });
    if (record) {
        const { normal } = record;
        return new Vector3(
            0.5 * (normal.x + 1),
            0.5 * (-normal.y + 1),
            0.5 * (-normal.z + 1)
        );
    }

    //#region -c multiple-objects default blend color
    const unitDirection = ray.direction.clone().normalize();
    const t = 0.5 * (unitDirection.y + 1);
    const blend = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
    return blend;
}

//#endregion

/**
 * ### Render image
 */
function RenderImage(canvas: HTMLCanvasElement, generateColor: (ray: Ray, world: World) => Vector3) {
    
    //#region -c multiple-objects render image setup
    const topLeftCorner = new Vector3(-2, -1, 1);
    const horizontal = new Vector3(4, 0, 0);
    const vertical = new Vector3(0, 2, 0);
    const origin = new Vector3(0, 0, 0);

    const width = canvas.width;
    const height = canvas.height
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, width, height);

    //#endregion

    const world = new World()
        .addObject(new Sphere(new Vector3(0, 0, 1), 0.5))
        .addObject(new Sphere(new Vector3(0, 100.5, 1), 100));

    //#region -c multiple-objects loop

    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
            const u = x / width;
            const v = y / height;
            const direction = topLeftCorner.clone()
                .addScaledVector(horizontal, u)
                .addScaledVector(vertical, v);

            const ray = new Ray(origin, direction);

            //#endregion

            const color: Vector3 = generateColor(ray, world);


            //#region -c multiple-objects paint

            const n = (y * width + x) * 4;
            imageData.data[n] = color.x * 255;
            imageData.data[n + 1] = color.y * 255;
            imageData.data[n + 2] = color.z * 255;
            imageData.data[n + 3] = 255;
        }
    }
    context.putImageData(imageData, 0, 0);
}
    //#endregion

/**
 * ## Result
 * 
 * <<v:illustrator multiple-objects 100% 400px>>
 * 
 */

//#region -c multiple-objects trivial setup

//#region -c multiple-objects imports
import { onMount } from 'svelte';
import { Vector3, Ray } from 'three';
import { World } from '../../common/world.js';
import { Sphere } from '../../common/sphere.js';
//#endregion

export default function Section() {
    let canvas: HTMLCanvasElement;

    onMount(() => {
        function generateColor(ray: Ray, world: World) {
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