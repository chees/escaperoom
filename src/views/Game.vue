<template>
  <div class="game">
    TODO
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default Vue.extend({
  name: 'game',
  created() {
    const db = firebase.firestore();

    db.doc('games/64IKKloboVcCCPEY1BJ6').collection('players').add({
      'name': 'Playertje'
    });

    /*
    db.collection('games').add({
      code: 'a42xy',
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.log('Error adding document: ', error);
    });
    */
  },
});
</script>
