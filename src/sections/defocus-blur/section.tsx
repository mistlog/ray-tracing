
/**
 * ---
 * {
 *  "useMath": true,
 *  "visualizers": [
 *      {"path": "./src/visualizers/visualizer.ts"}
 *  ]
 * }
 * ---
 * # Defocus Blur
 * 
 * > defocus blur == depth of field
 * 
 * This part is corresponding to [Ray Tracing In One Weekend: Defocus Blur](https://raytracing.github.io/books/RayTracingInOneWeekend.html#defocusblur).
 *
 * <<v:custom-image fig-cam-film-plane.jpg https://raytracing.github.io/images/fig.cam-film-plane.jpg>>
 * 
 * ### Render image
 */
function RenderImage(canvas: HTMLCanvasElement, generateColor: (ray: Ray, world: World, depth: number) => Vector3) {

    //#region -c defocus-blur render image setup
    const width = canvas.width;
    const height = canvas.height
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, width, height);

    const world = new World()
        .addObject(new Sphere(new Vector3(0, 0, 1), 0.5, new Lambertian(new Vector3(0.1, 0.2, 0.5))))
        .addObject(new Sphere(new Vector3(0, 100.5, 1), 100, new Lambertian(new Vector3(0.8, 0.8, 0))))
        .addObject(new Sphere(new Vector3(1, 0, 1), 0.5, new Metal(new Vector3(0.8, 0.6, 0.2))))
        .addObject(new Sphere(new Vector3(-1, 0, 1), 0.5, new Dielectric(1.5)));

    //#endregion
    
/**
 */

    const lookFrom = new Vector3(3, -3, -2);
    const lookAt = new Vector3(0, 0, 1);
    const up = new Vector3(0, -1, 0);
    const fov = Math.PI / 9;
    const aspect = width / height;

    /**
     * > The “aperture” is a hole to control how big the lens is effectively. For a real camera, if you need more light you make the aperture bigger, and will get more defocus blur.
     */
    const aperture = 2;
    const focusDistance = lookFrom.clone().sub(lookAt).length();

    /**
     * Just use another camera: [DefocusBlurCamera](../../common/defocus-blur-camera.js.html):
     */
    const camera = new DefocusBlurCamera(fov, aspect, lookFrom, lookAt, up, aperture, focusDistance);

    //#region -c defocus-blur paint

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
 * <<v:illustrator defocus-blur 100% 400px>>
 * 
 */

//#region -c defocus-blur trivial setup

//#region -c defocus-blur imports
import { onMount } from 'svelte';
import { Vector3, Ray } from 'three';
import { World } from '../../common/with-material/world.js';
import { Sphere } from '../../common/with-material/sphere.js';
import { Lambertian, Dielectric, Metal } from '../../common/with-material/material.js';
import { DefocusBlurCamera } from '../../common/defocus-blur-camera.js';
//#endregion

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