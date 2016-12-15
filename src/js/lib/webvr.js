/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-10-13T17:02:53+02:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-05T12:33:14+01:00
* @License: stijnvanhulle.be
*/
/*
import * as THREE from 'three';
const StereoEffect = require(`three-stereo-effect`)(THREE);
import Circle from './modules/Circle';
import {MathUtil} from './modules/util';
import threeOrbitControls from 'three-orbit-controls';
const OrbitControls = threeOrbitControls(THREE);

const settings = [
  {
    amount: 2
  }
];

let context;
let bounds;

let scene,
  camera,
  renderer,
  effect,
  controls;

const setOrientationControls = e => {
  if (!e.alpha) {
    return;
  }
};

const init = () => {
  let element;
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  bounds = {
    width: 1200,
    height: 1600,
    depth: 1200
  };

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
  camera.position.set(0, 15, 0);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  element = renderer.domElement;

  //new OrbitControls(camera);

  context = new AudioContext();
  //loader = new BufferLoader(context);

  effect = new StereoEffect(renderer);
  controls = new OrbitControls(camera, element);
  controls.target.set(camera.position.x + 0.15, camera.position.y, camera.position.z);
  controls.noPan = true;
  controls.noZoom = true;

  loadSetting();

  //events:
  window.addEventListener(`deviceorientation`, setOrientationControls, true);

  controls = new THREE.DeviceOrientationControls(camera, true);
  controls.connect();
  controls.update();

  //element.addEventListener('click', fullscreen, false);

  window.removeEventListener(`deviceorientation`, setOrientationControls, true);



  const light = new THREE.PointLight(0x999999, 2, 100);
  light.position.set(50, 50, 50);
  scene.add(light);

  const lightScene = new THREE.PointLight(0x999999, 2, 100);
  lightScene.position.set(0, 5, 0);
  scene.add(lightScene);

  return element;

};

const v = new THREE.Vector3(0, 0, 0);
const move = camera => {

  const timer = Date.now() * 0.001;
  camera.position.x = Math.cos(timer) * 0.001;
  camera.position.z = Math.sin(timer) * 0.001;

  camera.lookAt(v);
};

const render = () => {
  renderer.render(scene, camera);
  move(camera);
  requestAnimationFrame(render);
};

const createFixed = (setting, data) => {

  const amount = data
    ? data.length
    : setting.amount;
  const fixed = [];

  for (let i = 0;i < amount;i ++) {

    const circle = new Circle(MathUtil.randomPoint(bounds));

    //circle.sample = data[i];

    scene.add(circle.element);

    fixed.push(circle);

  }

  render();

};

const loadSetting = (setting = settings[0]) => {
  createFixed(setting);
};


export default init;
*/
