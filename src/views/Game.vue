<template>
  <div class="game">
    Code: {{code}}<br>
    State: {{state}}<br>
    <div v-if="state === State.Joining">
      <button @click="start" v-if="isPlayer(0)">Start</button>
      <div>
        Players:
        <div v-for="player in players" :key="player.id">
          {{player.name}} {{player.id}}
        </div>
      </div>
    </div>

    <div v-if="state === State.Started">
      <a href="https://www.youtube.com/watch?v=Ct6BUPvE2sM" target="_blank">PIKOTARO</a>
      <button @click="clickPen" v-if="isPlayer(0)">🖊️</button>
      <button @click="setFS({ puz1pineapple: new Date() })" v-if="isPlayer(1)">🍍</button>
      <button @click="setFS({ puz1apple: new Date() })" v-if="isPlayer(2)">🍎</button>
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

interface Player {
  id: string;
  name: string;
}

export default Vue.extend({
  name: 'game',
  data() {
    return {
      game: '',
      code: '',
      state: State.Joining,
      players: [] as Player[],
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
    console.log(playerId);

    db.doc('games/' + this.game).onSnapshot((doc) => {
      const data = doc.data();
      if (data) {
        if (data.state) { this.state = data.state; }
        this.code = data.code;
        this.puz1pen = data.puz1pen;
        this.puz1pineapple = data.puz1pineapple;
        this.puz1apple = data.puz1apple;
      }
    });

    db.doc('games/' + this.game).collection('players').orderBy('created').onSnapshot((querySnapshot) => {
      this.players = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
        };
      });

      // Add the player if it doesn't exist yet:
      if (!this.players.some((p) => p.id === playerId)) {
        db.doc('games/' + this.game).collection('players').doc(playerId as string).set({
          created: new Date(),
          name: 'TODO',
        }).catch((error) => {
          console.log(error); // TODO
        });
      }
    });
  },
  methods: {
    start() {
      if (this.players.length < 3) {
        alert('You need at least 3 players.');
      } else {
        this.setFS({ state: State.Started });
      }
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
    isPlayer(n: number) {
      if (n >= this.players.length) {
        return false;
      }
      return this.players[n].id === localStorage.getItem('playerId');
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
