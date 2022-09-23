<template>
  <div>
    <input
        v-model="pokeId"
        type="number"
        min="1"
        max="900"
        @change="fetchPokemon()"
    />
    <div v-if="loading"><img src="../static/loading.gif" height="200"/></div>
    <div v-else-if="err">error</div>
    <PokeView v-else :pokemon-id="pokeId" :pokemon-image="pokeImage" :pokemon-name="pokeName"></PokeView>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import PokeView from "./PokeView.vue";
import PokemonModel from "./Model";

export default defineComponent({
  name: 'PokePresenter',

  components: {PokeView},

  setup() {

  const pokeModel = new PokemonModel();
  const loading = ref(true);
  const err = ref(false);

  const pokeId = ref(pokeModel.currentPokeId);
  const pokeName = ref(pokeModel.currentPokeName);
  const pokeImage = ref(pokeModel.currentImage);
  // const pokemon = ref({
  //   name: pokeModel.currentPokeId,
  //   id: pokeModel.currentPokeName,
  //   image: pokeModel.currentImage,
  // });

  const fetchPokemon = async () => {
    loading.value = true;
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeId.value}`)
      .then((response) => {

        pokeModel.setPokeState(response.data.id);
        pokeModel.setPokeName(response.data.name);
        pokeId.value = response.data.id;
        pokeName.value = response.data.name;

        pokeModel.setPokeImage(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId.value}.png`
        );
        pokeImage.value = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId.value}.png`;
        loading.value = false;
      })
      .catch((error) => {
        err.value = true;
        console.log(error)});
  };

  // single ref
  // watch(pokeId, (newId) => {
  //   console.log(`x is ${newId}`)
  //   pokeId.value = pokeModel.currentPokeId
  // })
  // watch(pokeName, (newName) => {
  //   console.log(`x is ${newName}`)
  //   pokeName.value = pokeModel.currentPokeName
  // })

  // onMounted(() => fetchPokemon());
  fetchPokemon()

  return {
    pokeId,
    fetchPokemon,
    pokeName,
    pokeImage,
    loading,
    err,
  };
  },
});


</script>
