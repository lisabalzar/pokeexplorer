export default class PokemonModel {
  currentPokeId: number;
  currentPokeName: string;
  currentImage: string;

  constructor() {
    this.currentPokeId = 1;
    this.currentPokeName = "";
    this.currentImage = "";
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
};
