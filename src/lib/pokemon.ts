
import { Pokemon } from "@/types/pokemon";

export async function getRandomPokemon(): Promise<Pokemon> {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    types: data.types.map((type: any) => type.type.name),
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    },
    sprites: {
      front_default: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
    },
  };
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
