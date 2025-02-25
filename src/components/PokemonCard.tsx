
import { Pokemon } from "@/types/pokemon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/pokemon";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PokemonCardProps {
  pokemon: Pokemon;
  isLoading: boolean;
}

export function PokemonCard({ pokemon, isLoading }: PokemonCardProps) {
  const handleShare = async () => {
    if (!pokemon) return;

    const shareText = `Check out my new friend ${capitalizeFirstLetter(pokemon.name)}!`;
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareText,
          text: "I found this amazing Pokémon using the Pokémon Generator!",
          url: shareUrl,
        });
        toast.success("Thanks for sharing!");
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareText}\n\nFind your own Pokémon at: ${shareUrl}`);
        toast.success("Link copied to clipboard! 📋");
      }
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        // User cancelled share operation - no need to show error
        return;
      }
      toast.error("Oops! Couldn't share your Pokémon friend");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-primary/20 animate-fade-in">
      <div className="relative p-8">
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-blue-50 text-blue-500"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          {isLoading ? (
            <div className="w-48 h-48 bg-gray-200 rounded-full animate-pulse" />
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-full" />
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-48 h-48 animate-bounce"
              />
            </div>
          )}
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-[#FF6B98] bg-clip-text text-transparent">
              {isLoading ? (
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              ) : (
                capitalizeFirstLetter(pokemon.name)
              )}
            </h2>
            
            <div className="flex gap-2 justify-center mb-6">
              {isLoading ? (
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : (
                pokemon.types.map((type) => (
                  <Badge
                    key={type}
                    className="capitalize px-4 py-1 text-sm font-medium"
                    style={{ backgroundColor: `var(--pokemon-${type})`, color: "white" }}
                  >
                    {type}
                  </Badge>
                ))
              )}
            </div>
            
            {!isLoading && (
              <div className="grid grid-cols-2 gap-6 text-base bg-gray-50 p-6 rounded-xl">
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span className="font-semibold text-primary">HP:</span>
                    <span>{pokemon.stats.hp}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold text-primary">Attack:</span>
                    <span>{pokemon.stats.attack}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold text-primary">Defense:</span>
                    <span>{pokemon.stats.defense}</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span className="font-semibold text-primary">Sp. Attack:</span>
                    <span>{pokemon.stats.specialAttack}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold text-primary">Sp. Defense:</span>
                    <span>{pokemon.stats.specialDefense}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold text-primary">Speed:</span>
                    <span>{pokemon.stats.speed}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
