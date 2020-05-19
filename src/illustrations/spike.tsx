import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, SphereGeometry, MeshNormalMaterial, Color, AxesHelper, MeshPhongMaterial, ShadowMaterial, MeshStandardMaterial, Vector2, Raycaster, Vector3, Geometry, LineBasicMaterial, Line, BufferGeometry, sRGBEncoding, TextureLoader, BoxBufferGeometry, DirectionalLight, HemisphereLight, Material, CameraHelper } from "three";

//@ts-ignore
import { OrbitControls } from 'three';

export default function App() {

    // these need to be accessed inside more than one function so we'll declare them first
    let container;
    let camera;
    let controls;
    let renderer;
    let scene;
    let mouse;
    let mouseMoved: boolean = false;
    let raycaster: Raycaster;
    let normal: Vector3;
    let line: Line;

    // ref: https://discoverthreejs.com/book/first-steps/camera-controls/
    function init() {

        container = document.querySelector('body');

        scene = new Scene();
        scene.background = new Color(0x8FBCD4);

        createMouse();
        createRayCaster();
        createCamera();
        createControls();
        createLights();
        createMeshes();
        createRenderer();

        // start the animation loop
        renderer.setAnimationLoop(() => {

            update();
            render();

        });

    }

    function createRayCaster() {
        raycaster = new Raycaster();
    }

    function createMouse() {
        mouse = new Vector2()
    }

    function createCamera() {

        camera = new PerspectiveCamera(
            35, // FOV
            container.clientWidth / container.clientHeight, // aspect
            0.1, // near clipping plane
            1000, // far clipping plane
        );

        camera.position.set(40, 40, 40);

        const helper = new CameraHelper( camera );
        scene.add( helper );
    }

    function createControls() {

        controls = new OrbitControls(camera, container);

    }

    function createLights() {

        const ambientLight = new HemisphereLight(
            0xddeeff, // sky color
            0x202020, // ground color
            5, // intensity
        );

        // const mainLight = new DirectionalLight(0xffffff, 5);
        // mainLight.position.set(10, 10, 10);

        scene.add(ambientLight, null);

    }

    function createMeshes() {

        //
        {
            const material = new MeshNormalMaterial();
            const geometry = new SphereGeometry(5, 32, 32);
            const sphere = new Mesh(geometry, material);
            sphere.name = "sphere";
            // scene.add(sphere);
        }

        //
        {

            const points = [];
            points.push(new Vector3(0, 0, 0));
            points.push(new Vector3(10, 10, 10));

            const geometry = new Geometry().setFromPoints(points);
            const material = new LineBasicMaterial({ color: 0x0000ff, linewidth: 1 });

            line = new Line(geometry, material);
            scene.add(line);

        }

        //
        {
            const axesHelper = new AxesHelper(25);
            scene.add(axesHelper);
        }

    }

    function createRenderer() {

        renderer = new WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);

        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.gammaFactor = 2.2;
        renderer.gammaOutput = true;

        renderer.physicallyCorrectLights = true;

        container.appendChild(renderer.domElement);

    }

    // perform any updates to the scene, called once per frame
    // avoid heavy computation here
    function update() {

        // Don't delete this function!

        controls.update();

        // if (mouseMoved) {

            // update the picking ray with the camera and mouse position
            raycaster.setFromCamera(mouse, camera);

            // calculate objects intersecting the picking ray
            // const [intersection] = raycaster.intersectObjects(scene.children);
            // if (intersection && intersection.object.name === "sphere") {
            // normal = raycaster.ray.at(intersection.distance, new Vector3()).normalize();
            // console.log(camera.position);
            // console.log(line.geometry.vertices);
            {

                const points = [];
                points.push(new Vector3(0, 0, 0));
                points.push(camera.position);
    
                const geometry = new Geometry().setFromPoints(points);
                const material = new LineBasicMaterial({ color: 0x0000ff, linewidth: 1 });
    
                // scene.remove(line);
                line = new Line(geometry, material);
                scene.add(line);
    
                // console.log(scene);
            }
            //@ts-ignore    
            // line.geometry.dynamic = true;
            // line.geometry.vertices = [new Vector3(), camera.position];
            // line.geometry.setFromPoints([new Vector3(), camera.position]);
            // (line.geometry as Geometry).verticesNeedUpdate = true;
            // line.geometry = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), normal.clone().multiplyScalar(30)]);
            // (line.material as LineBasicMaterial).color = new Color(0.5,0.5,0.5);
            // }
            //@ts-ignore
            // line.geometry.verticesNeedUpdate = true;
            // line.geometry.colorsNeedUpdate = true;
            // mouseMoved = false;
        // }

    }

    // render, or 'draw a still image', of the scene
    function render() {

        renderer.render(scene, camera);

    }

    // a function that will be called every time the window gets resized.
    // It can get called a lot, so don't put any heavy computation in here!
    function onWindowResize() {

        // set the aspect ratio to match the new browser window aspect ratio
        camera.aspect = container.clientWidth / container.clientHeight;

        // update the camera's frustum
        camera.updateProjectionMatrix();

        // update the size of the renderer AND the canvas
        renderer.setSize(container.clientWidth, container.clientHeight);

    }

    function onMouseMove(event) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        mouseMoved = true;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        // console.log(`mouse pos:${mouse.x} ${mouse.y}`)

    }

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove, false);

    // call the init function to set everything up
    init();

}