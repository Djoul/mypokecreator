import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pokemon } from "@/types/pokemon";
import { getRandomPokemon } from "@/lib/pokemon";
import { PokemonCard } from "@/components/PokemonCard";
import { Sparkles, Star, Wand2 } from "lucide-react";

const BUBBLE_IMAGES = [
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif",  // Pikachu
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",   // Bulbasaur
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif",   // Charmander
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif",   // Squirtle
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif", // Eevee
];

type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  image: string;
};

const Index = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 60 + Math.random() * 20, // Slightly larger size for better visibility
      delay: Math.random() * 5,
      image: BUBBLE_IMAGES[Math.floor(Math.random() * BUBBLE_IMAGES.length)],
    }));
    setBubbles(newBubbles);
  }, []);

  const generatePokemon = async () => {
    setIsLoading(true);
    try {
      const newPokemon = await getRandomPokemon();
      setPokemon(newPokemon);
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5F1] via-[#FFF5E1] to-[#E5F1FF] py-12 px-4 relative overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute animate-float pointer-events-none"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animation: `float 10s ease-in-out infinite`,
            animationDelay: `${bubble.delay}s`,
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white/50 rounded-full backdrop-blur-sm border-2 border-white/50" />
            <img
              src={bubble.image}
              alt="Pokemon"
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          </div>
        </div>
      ))}

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-[#FF6B98] to-primary bg-clip-text text-transparent">
              Pokémon Generator
            </h1>
            <Star className="absolute -top-4 -right-8 w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
          
          <p className="text-xl text-gray-700 max-w-md mx-auto leading-relaxed">
            Ready for an adventure? Click the magical button to discover your next Pokémon friend! ✨
          </p>
          
          <Button
            size="lg"
            onClick={generatePokemon}
            className="bg-gradient-to-r from-primary via-[#FF6B98] to-primary hover:opacity-90 text-white text-lg rounded-full px-8 py-6 shadow-lg transform hover:scale-105 transition-transform"
            disabled={isLoading}
          >
            <Sparkles className="mr-2 h-6 w-6" />
            Discover a Pokémon!
          </Button>
        </div>

        {(pokemon || isLoading) ? (
          <div className="mt-12 transform hover:scale-[1.02] transition-transform">
            <PokemonCard pokemon={pokemon!} isLoading={isLoading} />
          </div>
        ) : (
          <div className="mt-16 text-center">
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-full animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wand2 className="w-24 h-24 text-primary/50 animate-bounce" />
              </div>
            </div>
            <div className="space-y-4 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your Pokémon Journey Awaits!
              </h2>
              <p className="text-gray-600">
                Click the button above to start your magical adventure and meet your first Pokémon friend. Each discovery brings a new surprise! 🌟
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
