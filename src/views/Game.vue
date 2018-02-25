<template>
  <div class="game">
    Game: {{game}}<br>
    State: {{state}}<br>
    <button @click="start" v-if="state === State.Joining">Start</button>

    <div v-if="state === State.Started">
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

enum State {
  Joining,
  Started,
  Finished,
}

export default Vue.extend({
  name: 'game',
  data() {
    return {
      game: '',
      state: State.Joining,
      puz1pen: null,
      puz1pineapple: null,
      puz1apple: null,
    };
  },
  created() {
    (this as any).State = State; // To make it accessible in templates

    db = firebase.firestore();

    const game = localStorage.getItem('game');
    if (game === null) {
      this.$router.replace('/');
    }
    this.game = game as string;

    let playerId = localStorage.getItem('playerId');
    if (playerId == null) {
      playerId = uuidv4();
      localStorage.setItem('playerId', playerId);
    }

    db.doc('games/' + this.game).onSnapshot((doc) => {
      const data = doc.data();
      if (data) {
        if (data.state) { this.state = data.state; }
        this.puz1pen = data.puz1pen;
        this.puz1pineapple = data.puz1pineapple;
        this.puz1apple = data.puz1apple;
      }
    });

    db.doc('games/' + this.game).collection('players').doc(playerId).set({
      name: 'TODO',
    }).catch((error) => {
      console.log(error); // TODO
    });
  },
  methods: {
    start() {
      this.setFS({ state: State.Started });
    },
    clickPen() {
      if (this.puz1pen && this.puz1pineapple && this.puz1apple &&
          this.puz1pen! < this.puz1pineapple! &&
          this.puz1pineapple! < this.puz1apple!) {
        this.setFS({ state: State.Finished });
      } else {
        this.setFS({ puz1pen: new Date() });
      }
    },
    setFS(obj: object) {
      db.doc('games/' + this.game).set(obj, { merge: true }).catch((error) => {
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
