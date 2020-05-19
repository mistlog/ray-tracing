/**
 * ---
 * {
 *  "useMath": true,
 *  "visualizers": [
 *      {"path": "./src/visualizers/visualizer.ts"}
 *  ]
 * }
 * ---
 * # Diffuse Materials
 * 
 * > Diffuse objects that don’t emit light merely take on the color of their surroundings, but they modulate that with their own intrinsic color. Really any algorithm that randomizes direction will produce surfaces that look matte.
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: Diffuse Materials](https://raytracing.github.io/books/RayTracingInOneWeekend.html#diffusematerials).
 *
 * <<v:custom-image fig-light-bounce.jpg https://raytracing.github.io/images/fig.light-bounce.jpg>>
 * 
 * ### Generate color
 */
function GenerateColor(ray: Ray, world: World, depth: number, generateColor: (ray: Ray, world: World, depth: number) => Vector3) {
    /**
     * Limit the maximum recursion depth, returning no light contribution at the maximum depth:
     */
    if (depth <= 0) {
        return new Vector3(0, 0, 0);
    }
    
    const record = world.hit(ray, { min: 0, max: Number.MAX_SAFE_INTEGER });
    if (record) {
        const { normal, point } = record;

        /**
         * Generating a random diffuse bounce ray:
         * 
         * [![](../../../images/fig-rand-vector.jpg)][RandomRay]
         * 
         * [RandomRay]: https://raytracing.github.io/images/fig.rand-vector.jpg
         */
        const target = point.clone().add(normal).add(randomPointInUnitSphere());
        const randomRay = new Ray(point, target.clone().sub(point));

        const color = generateColor(
            randomRay,
            world,
            depth - 1
        ).multiplyScalar(0.5);

        return color;
    }

    /**
     * The surrounding color of a point is the color "blend".
     */
    const unitDirection = ray.direction.clone().normalize();
    const t = 0.5 * (unitDirection.y + 1);
    const blend = new Vector3(0.5, 0.7, 1.0).lerp(new Vector3(1, 1, 1), t);
    return blend;

}

/**
 * ### Render image
 */
function RenderImage(canvas: HTMLCanvasElement, generateColor: (ray: Ray, world: World, depth: number) => Vector3) {

    //#region -c diffuse render image setup
    const width = canvas.width;
    const height = canvas.height
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, width, height);

    const world = new World()
        .addObject(new Sphere(new Vector3(0, 0, 1), 0.5))
        .addObject(new Sphere(new Vector3(0, 100.5, 1), 100));

    const camera = new Camera();

    //#endregion

    /**
     */
    const samples = 50;
    const maxDepth = 50;

    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
            const color = new Vector3(0, 0, 0);
            for (let k = 0; k < samples; ++k) {
                const u = (x + Math.random()) / width;
                const v = (y + Math.random()) / height;
                const ray = camera.getRay(u, v);

                /**
                 * with depth limiting:
                 */
                color.add(generateColor(ray, world, maxDepth));
            }
            color.divideScalar(samples);

            //#region -c diffuse paint

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
 * <<v:illustrator diffuse 100% 400px>>
 * 
 * The light gray/blue color of sphere can be seen in this demo:
 * 
 * <<v:illustrator depth-limit 100% 425px>>
 * 
 * With gamma correction:
 * 
 * <<v:custom-image gamma-correction.png ../../illustrations/gamma-correction.html>>
 * 
 * Fix shadow acne:
 * 
 * <<v:custom-image fix-shadow-acne.png ../../illustrations/fix-shadow-acne.html>>
 * 
 * Lambertian, the shadows are less pronounced:
 * 
 * <<v:custom-image lambertian-diffuse.png ../../illustrations/lambertian-diffuse.html>>
 * 
 */

//#region -c diffuse trivial setup

//#region -c diffuse imports
import { onMount } from 'svelte';
import { Vector3, Ray } from 'three';
import { World } from '../../common/world.js';
import { Sphere } from '../../common/sphere.js';
import { Camera } from '../../common/camera.js';
import { randomPointInUnitSphere } from '../../common/math.js';
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