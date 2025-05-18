
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockNfcCards, getUserById } from "@/data/mockData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle, CreditCard, Search, XCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

export default function AdminCards() {
  const [cards, setCards] = useState(mockNfcCards);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardStatusChange = (cardId: string, isActive: boolean) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, isActive } : card
    ));
    
    toast({
      title: isActive ? "Carte activée" : "Carte désactivée",
      description: `La carte a été ${isActive ? "activée" : "désactivée"} avec succès.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gestion des cartes NFC</h1>
              <p className="text-muted-foreground">
                Consultez et gérez toutes les cartes NFC du système
              </p>
            </div>
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
              {filteredCards.length} carte{filteredCards.length !== 1 ? "s" : ""} trouvée{filteredCards.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Cards List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => {
                const user = getUserById(card.userId);
                
                return (
                  <Card key={card.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span className="truncate">{card.name}</span>
                        <Badge variant={card.isActive ? "default" : "secondary"}>
                          {card.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Propriétaire</div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                            {user?.name?.charAt(0) || "?"}
                          </div>
                          <div>
                            <div>{user?.name || "Utilisateur inconnu"}</div>
                            <div className="text-xs text-muted-foreground">{user?.email}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`card-status-${card.id}`}
                            checked={card.isActive}
                            onCheckedChange={(checked) => handleCardStatusChange(card.id, checked)}
                          />
                          <Label htmlFor={`card-status-${card.id}`}>
                            {card.isActive ? (
                              <div className="flex items-center gap-1 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Active</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-sm">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span>Inactive</span>
                              </div>
                            )}
                          </Label>
                        </div>
                        <Link to={`/admin/cards/${card.id}`}>
                          <Button variant="outline" size="sm">
                            <CreditCard className="mr-1 h-4 w-4" />
                            Détails
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                <CreditCard className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold">Aucune carte trouvée</h3>
                <p className="text-sm text-muted-foreground">
                  Aucune carte ne correspond à votre recherche.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
