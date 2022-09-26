<template>
  <div>
    <input
        v-model="pokemon.id"
        type="number"
        min="1"
        max="900"
        @change="pokeModel.fetchPokemon(pokemon.id)"
      />
      <div v-if="pokeModel.loading"><img src="../static/loading.gif" height="200"/></div>
      <div v-else-if="pokeModel.err"><h1> Error </h1></div>
      <div v-else>
        <h1>{{ pokemon.id }} {{ pokemon.name }}</h1>
        <img :src="pokemon.image" height="200" />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import PokemonModel from "./Model";

export default defineComponent({
  name: 'PokeView',

  setup() {
    const pokeModel = ref(new PokemonModel());
    const pokemon = ref({
      id: pokeModel.value.currentPokeId,
      name: pokeModel.value.currentPokeName,
      image: pokeModel.value.currentImage
    });

    watch(pokeModel,
      (newPoke) => {
        pokemon.value.id = newPoke.currentPokeId;
        pokemon.value.image = newPoke.currentImage;
        pokemon.value.name = newPoke.currentPokeName;
      },
      {deep: true}
      );

    pokeModel.value.fetchPokemon(pokemon.value.id);

    return {
      pokemon,
      pokeModel,
    };
    },
});
</script>
