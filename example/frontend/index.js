import SolidComment from 'solid-comment';
import { solidComment } from 'solid-comment';
import { helloWorld } from 'solid-comment';
import {helloWorldNPM} from 'solid-comment';



(() => {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Frontend JavaScript loaded")

    console.log(SolidComment)
    console.log(solidComment)
    console.log(helloWorld())
    console.log(helloWorldNPM());
  })
})()
