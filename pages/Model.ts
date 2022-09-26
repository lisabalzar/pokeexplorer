import axios from "axios";

export default class PokemonModel {
  currentPokeId: number;
  currentPokeName: string;
  currentImage: string;
  loading: boolean;
  err: boolean;

  constructor() {
    this.currentPokeId = 1;
    this.currentPokeName = "";
    this.currentImage = "";
    this.loading = false;
    this.err = false;
  }

  setPokeState(id: number) {
    this.currentPokeId = id;
  }

  setPokeName(name: string) {
    this.currentPokeName = name;
  }

  setPokeImage(url: string) {
    this.currentImage = url;
  }

  async fetchPokemon(pokeId: number) {
    this.loading = true;
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then((response) => {
        this.setPokeState(response.data.id);
        this.setPokeName(response.data.name);
        this.setPokeImage(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
        );
        this.loading = false;
        this.err = false;
      })
      .catch((error) => {
        this.loading = false;
        this.err = true;
        console.log(error)});
  };
};
