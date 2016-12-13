/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-10-13T17:03:38+02:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-02T10:41:10+01:00
* @License: stijnvanhulle.be
*/

import {MathUtil} from './util/';
import * as THREE from 'three';
import EventEmitter from 'eventemitter2';

export default class Circle extends EventEmitter {

  constructor(position, type = Circle.FIXED) {

    super();

    this.position = position;
    this.type = type;

    if (this.type === Circle.FIXED)
      this._initFixed();
    if (this.type === Circle.MOVING)
      this._initMoving();

    this._create();

    if (this.type === Circle.MOVING)
      this._onFrame();

  }

  _onFrame = () => {

    if (this.isMoving) {

      const {speed} = this;

      this.position.x += (this.target.position.x - this.position.x) / speed;
      this.position.y += (this.target.position.y - this.position.y) / speed;
      this.position.z += (this.target.position.z - this.position.z) / speed;

      this.element.position.x = this.position.x;
      this.element.position.y = this.position.y;
      this.element.position.z = this.position.z;


      if (MathUtil.distanceBetweenPoints(this.position, this.target.position) < 5) {
        this.emit(`done`);
      }

    }

    requestAnimationFrame(this._onFrame);

  }

  _initFixed() {
    this.radius = 30;
    this.fill = `red`;
  }

  _initMoving() {

    this.speed = MathUtil.randomBetween(10, 80);

    this.radius = 15;
    this.fill = `white`;

  }

  _create() {

    const {x, y, z} = this.position;
    const {radius, fill} = this;


    const geometry = new THREE.SphereGeometry(radius, 30, 30);

    const material = new THREE.MeshBasicMaterial({color: fill, wireframe: true});

    const shape = new THREE.Mesh(geometry, material);

    shape.position.x = x;
    shape.position.y = y;
    shape.position.z = z;

    this.element = shape;

    return this.element;

  }

}

Circle.MOVING = `moving`;
Circle.FIXED = `fixed`;
