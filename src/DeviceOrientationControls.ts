import * as THREE from 'three';

const zee = new THREE.Vector3(0, 0, 1);
const euler = new THREE.Euler();
const q0 = new THREE.Quaternion();
const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis

export class DeviceOrientationControls {
  private object: THREE.Object3D;
  private enabled: boolean;
  private deviceOrientation: DeviceOrientationEvent | null;
  private screenOrientation: number;
  private alphaOffset: number;

  constructor(object: THREE.Object3D) {
    this.object = object;
    this.object.rotation.reorder('YXZ');

    this.enabled = true;

    this.deviceOrientation = null;
    this.screenOrientation = 0;

    this.alphaOffset = 0; // radians

    this.connect();
  }

  public update() {
    if (!this.enabled) {
      return;
    }
    const device = this.deviceOrientation;
    if (device) {
      const alpha = device.alpha ? THREE.Math.degToRad(device.alpha) + this.alphaOffset : 0; // Z
      const beta = device.beta ? THREE.Math.degToRad(device.beta) : 0; // X'
      const gamma = device.gamma ? THREE.Math.degToRad(device.gamma) : 0; // Y''
      const orient = this.screenOrientation ? THREE.Math.degToRad(this.screenOrientation) : 0; // O
      this.setObjectQuaternion(this.object.quaternion, alpha, beta, gamma, orient);
    }
  }

  public dispose() {
    this.disconnect();
  }

  private onDeviceOrientationChangeEvent(event: DeviceOrientationEvent) {
    this.deviceOrientation = event;
  }

  private onScreenOrientationChangeEvent() {
    this.screenOrientation = window.orientation as number || 0;
  }

  // The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''
  private setObjectQuaternion(
      quaternion: THREE.Quaternion, alpha: number, beta: number, gamma: number, orient: number) {

    euler.set(beta, alpha, - gamma, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us
    quaternion.setFromEuler(euler); // orient the device
    quaternion.multiply(q1); // camera looks out the back of the device, not the top
    quaternion.multiply(q0.setFromAxisAngle(zee, -orient)); // adjust for screen orientation
  }

  private connect() {
    this.onScreenOrientationChangeEvent(); // run once on load

    window.addEventListener('orientationchange', this.onScreenOrientationChangeEvent.bind(this), false);
    window.addEventListener('deviceorientation', this.onDeviceOrientationChangeEvent.bind(this), false);

    this.enabled = true;
  }

  private disconnect() {
    window.removeEventListener('orientationchange', this.onScreenOrientationChangeEvent.bind(this), false);
    window.removeEventListener('deviceorientation', this.onDeviceOrientationChangeEvent.bind(this), false);

    this.enabled = false;
  }
}
