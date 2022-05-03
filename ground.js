import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
} from "./updateCustomProperty.js";


const SPEED = 0.05;
const groundElems = document.querySelectorAll("[data-ground]");

export function setupGround () {
    setCustomProperty(groundElems[0], "--left", 0);
    setCustomProperty(groundElems[1], "--left", 300); //300 is the widht of the game
}


export function updateGround(delta, speedScale) {
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", -SPEED * delta * speedScale); //moving backwards

        if (getCustomProperty(ground, "--left") <= -300) {
            incrementCustomProperty(ground, "--left", 600);
        }
    })
}