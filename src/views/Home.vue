<template>
  <div class="home">
    <!--
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    <button @click="start">Start a new game</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase';
import 'firebase/firestore';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

let db: firebase.firestore.Firestore;

export default Vue.extend({
  name: 'home',
  components: {
    // HelloWorld,
  },
  created() {
    db = firebase.firestore();
  },
  methods: {
    start() {
      db.collection('games').add({}).then((doc) => {
        localStorage.setItem('game', doc.id);
        this.$router.push('game');
      }).catch((error) => {
        console.log(error); // TODO
      });
    },
  },
});
</script>
