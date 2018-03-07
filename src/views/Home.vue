<template>
  <div class="home">
    <!--
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <router-link to="/about">About</router-link>
    -->
    <h1>The Meme Escape Room!</h1>
    <div class="option">
      <button @click="start">Start a new game</button>
    </div>
    <div>or</div>
    <div class="option">
      <input placeholder="CODE" v-model="code"><br>
      <button @click="join">Join a game</button>
    </div>

    <div class="doge">
      <img src="../assets/doge.jpg">
    </div>
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
  data() {
    return {
      code: '',
    };
  },
  created() {
    db = firebase.firestore();
  },
  methods: {
    start() {
      db.collection('games').add({
        code: getCode(5),
      }).then((doc) => {
        localStorage.setItem('game', doc.id);
        this.$router.push('game');
      }).catch((error) => {
        console.log(error); // TODO
      });
    },
    join() {
      console.log(this.code);

      db.collection('games').where('code', '==', this.code)
        .get()
        .then((querySnapshot) => {
          const game = querySnapshot.docs[0];
          if (!game) {
            console.log('game not found'); // TODO
            return;
          }
          localStorage.setItem('game', game.id);
          this.$router.push('game');
        })
        .catch((error) => {
          console.log(error); // TODO
        });
    },
  },
});

function getCode(length: number) {
  return (Math.random().toString(36) + '00000000000000000').slice(2, length + 2);
}
</script>

<style>
.home {
  max-width: 400px;
  margin: 0 auto;
}
h1 {
  color:darkmagenta;
}
input {
  box-sizing: border-box;
  font-size: 16px;
  padding: 10px;
  width: 180px;
  border: 2px solid darkslategray;
  border-radius: 4px;
}
.option {
  background-color: greenyellow;
  margin: 10px auto;
  padding: 10px;
  max-width: 500px;
  border-radius: 10px;
}
.doge {
  position: relative;
  margin-top: 50px;
}
.doge img {
  position: absolute;
  right: 20px;
  width: 160px;
}
</style>