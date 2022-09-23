<template>
  <div>
    <input
        v-model="pokemon.id"
        type="number"
        min="1"
        max="900"
        @change="fetchPokemon()"
      />
      <div v-if="loading"><img src="../static/loading.gif" height="200"/></div>
      <div v-else-if="err"><h1> Error </h1></div>
      <div v-else>
        <h1>{{ pokemon.id }} {{ pokemon.name }}</h1>
        <img :src="pokemon.image" height="200" />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import axios from "axios";
import PokemonModel from "./Model";

export default defineComponent({
  name: 'PokeView',

  setup() {
    const pokeModel = ref(new PokemonModel());
    const loading = ref(true);
    const err = ref(false);

    const pokemon = ref({
      id: pokeModel.value.currentPokeId,
      name: pokeModel.value.currentPokeName,
      image: pokeModel.value.currentImage
    });

    const fetchPokemon = async () => {
      loading.value = true;
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.value.id}`)
        .then((response) => {
          pokeModel.value.setPokeState(response.data.id);
          pokeModel.value.setPokeName(response.data.name);
          pokeModel.value.setPokeImage(
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.value.id}.png`
          );
          loading.value = false;
          err.value = false;
        })
        .catch((error) => {
          loading.value = false;
          err.value = true;
          console.log(error)});
    };

    watch(pokeModel,
      (newPoke) => {
        pokemon.value.id = newPoke.currentPokeId;
        pokemon.value.image = newPoke.currentImage;
        pokemon.value.name = newPoke.currentPokeName;
      },
      {deep: true}
      );

    fetchPokemon()

    return {
      fetchPokemon,
      pokemon,
      loading,
      err,
    };
    },
});
</script>
