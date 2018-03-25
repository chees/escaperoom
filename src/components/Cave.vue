<template>
  <div class="cave" ref="cave">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as THREE from 'three';

export default Vue.extend({
  name: 'Cave',
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    // TODO

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 100, window.innerWidth - 100);
    (this.$refs.cave as HTMLElement).appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      if (!this.$refs.cave) { return; }
      requestAnimationFrame(animate);

      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;

      renderer.render(scene, camera);
    };

    animate();
  },
});
</script>

<style scoped>

</style>
