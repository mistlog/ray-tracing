import { Vector3 } from "three";

export function random(low: number, high: number) {
    return low + Math.random() * (high - low);
}

export function randomPoint(low: number, high: number) {
    return new Vector3(random(low, high), random(low, high), random(low, high));
}

export function randomPointInUnitSphere() {
    for (; ;) {
        const point = randomPoint(-1, 1);
        if (point.length() < 1) {
            return point;
        }
    }
}

export function randomPointInUnitDisk() {
    for (; ;) {
        const point = new Vector3(random(-1, 1), random(-1, 1), 0);
        if (point.lengthSq() < 1) {
            return point;
        }
    }
}

export function randomUnitVector() {
    const α = random(0, 2 * Math.PI);
    const z = random(-1, 1);
    const r = Math.sqrt(1 - z * z);

    return new Vector3(r * Math.cos(α), r * Math.sin(α), z);
}