<template>
  <div class="home">
    <!--
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    <div>
      <button @click="start">Start a new game</button>
    </div>
    <div>
      <input placeholder="CODE" v-model="code">
      <button @click="join">Join a game</button>
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
