<template>
  <div class="game">
    State: {{state}}
    <button @click="start" v-if="state == 'joining'">Start</button>

    <div v-if="state == 'started'">
      <button @click="clickPen">🖊️</button>
      <button @click="setFS({ puz1pineapple: new Date() })">🍍</button>
      <button @click="setFS({ puz1apple: new Date() })">🍎</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase';
import 'firebase/firestore';

let db: firebase.firestore.Firestore;

export default Vue.extend({
  name: 'game',
  data() {
    const now = new Date();
    return {
      state: '',
      puz1pen: now,
      puz1pineapple: now,
      puz1apple: now,
    };
  },
  created() {
    db = firebase.firestore();

    let playerId = localStorage.getItem('playerId');
    if (playerId == null) {
      playerId = uuidv4();
      localStorage.setItem('playerId', playerId);
    }

    db.doc('games/64IKKloboVcCCPEY1BJ6').collection('players').doc(playerId).set({
      name: 'TODO',
    }).catch((error) => {
      console.log(error); // TODO
    });

    db.doc('games/64IKKloboVcCCPEY1BJ6').onSnapshot((doc) => {
      const data = doc.data();
      if (data) {
        this.state = data.state;
        this.puz1pen = data.puz1pen;
        this.puz1pineapple = data.puz1pineapple;
        this.puz1apple = data.puz1apple;
      }
    });
  },
  methods: {
    start() {
      this.setFS({ state: 'started' });
    },
    clickPen() {
      if (this.puz1pen < this.puz1pineapple && this.puz1pineapple < this.puz1apple) {
        this.setFS({ state: 'finished' });
      } else {
        this.setFS({ puz1pen: new Date() });
      }
    },
    setFS(obj: object) {
      db.doc('games/64IKKloboVcCCPEY1BJ6').set(obj, { merge: true }).catch((error) => {
        console.log(error); // TODO
      });
    },
  },
});

/* tslint:disable */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
/* tslint:enable */
</script>
