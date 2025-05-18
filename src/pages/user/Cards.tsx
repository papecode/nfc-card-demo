import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { mockNfcCards } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { CreditCard, QrCode, Search, Share } from "lucide-react";

export default function UserCards() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const networkingCards = mockNfcCards.filter(card => card.name === "Carte Networking");
  const filteredCards = networkingCards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mes cartes</h1>
              <p className="text-muted-foreground">
                Gérez toutes vos cartes NFC personnalisées
              </p>
            </div>
            <Link to="/cards/create">
              <Button>
                <CreditCard className="mr-2 h-4 w-4" />
                Nouvelle carte
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une carte..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
              {filteredCards.length} carte{filteredCards.length !== 1 ? "s" : ""} Networking trouvée{filteredCards.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <Card key={card.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="truncate pr-2">{card.name}</CardTitle>
                      <Badge variant={card.isActive ? "default" : "secondary"}>
                        {card.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-6">
                    <div className="rounded-lg overflow-hidden border w-32 h-32 flex items-center justify-center bg-accent/50">
                      <QrCode className="h-12 w-12 text-primary" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to={`/cards/${card.id}`}>
                        Voir détails
                      </Link>
                    </Button>
                    <Button 
                      variant="default"
                      className="flex-1"
                      asChild
                    >
                      <Link to={`/cards/${card.id}`}>
                        <Share className="mr-2 h-4 w-4" />
                        Partager
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                <CreditCard className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold">Aucune carte trouvée</h3>
                {networkingCards.length === 0 ? (
                  <>
                    <p className="mb-4 text-sm text-muted-foreground text-center">
                      Vous n'avez pas encore créé de carte NFC.
                    </p>
                    <Link to="/cards/create">
                      <Button>Créer ma première carte</Button>
                    </Link>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center">
                    Aucune carte ne correspond à votre recherche.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
