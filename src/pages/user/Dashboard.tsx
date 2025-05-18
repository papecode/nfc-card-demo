
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { getUserCards } from "@/data/mockData";
import { CreditCard, QrCode, Share, Sparkles } from "lucide-react";

export default function UserDashboard() {
  const { user } = useAuth();
  const userCards = getUserCards(user?.id || "");
  const activeCards = userCards.filter(card => card.isActive);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="flex flex-col space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bienvenue, {user?.name}</h1>
            <p className="text-muted-foreground">
              Gérez vos cartes NFC et partagez facilement vos coordonnées
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Cards */}
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Mes cartes
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userCards.length}</div>
                <p className="text-xs text-muted-foreground">
                  {userCards.length === 0 ? "Aucune carte créée" : 
                   userCards.length === 1 ? "Carte créée" : 
                   "Cartes créées"}
                </p>
              </CardContent>
            </Card>

            {/* Active Cards */}
            <Card className="animate-fade-in delay-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cartes actives
                </CardTitle>
                <div className="rounded bg-green-100 p-1 dark:bg-green-900">
                  <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCards.length}</div>
                <p className="text-xs text-muted-foreground">
                  sur {userCards.length} cartes
                </p>
              </CardContent>
            </Card>

            {/* Create New Card */}
            <Card className="animate-fade-in delay-200 bg-primary text-primary-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Nouvelle carte
                </CardTitle>
                <Sparkles className="h-4 w-4" />
              </CardHeader>
              <CardContent className="mt-3">
                <p className="text-sm">
                  Créez une nouvelle carte NFC pour partager vos coordonnées
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/cards/create" className="w-full">
                  <Button variant="secondary" className="w-full">
                    Créer une carte
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Recent Cards */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Mes cartes récentes</h2>
            {userCards.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userCards.slice(0, 3).map((card) => (
                  <Card key={card.id}>
                    <CardHeader>
                      <CardTitle>{card.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <div className="rounded-lg overflow-hidden border w-32 h-32 flex items-center justify-center bg-accent/50">
                        <QrCode className="h-12 w-12 text-primary" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link to={`/cards/${card.id}`}>
                          Voir détails
                        </Link>
                      </Button>
                      <Button variant="default" size="sm" className="ml-2" asChild>
                        <Link to={`/cards/${card.id}`}>
                          <Share className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-accent/20 border-dashed">
                <CardHeader>
                  <CardTitle>Aucune carte créée</CardTitle>
                  <CardDescription>
                    Vous n'avez pas encore créé de carte NFC. Commencez par créer votre première carte !
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-6">
                  <CreditCard className="h-16 w-16 text-muted-foreground" />
                </CardContent>
                <CardFooter>
                  <Link to="/cards/create" className="w-full">
                    <Button className="w-full">
                      Créer ma première carte
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
            {userCards.length > 0 && (
              <div className="mt-4 flex justify-center">
                <Link to="/cards">
                  <Button variant="outline">
                    Voir toutes mes cartes
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <Card className="bg-accent/30 animate-fade-in delay-300">
            <CardHeader>
              <CardTitle>Conseils d'utilisation</CardTitle>
              <CardDescription>
                Comment tirer le meilleur parti de vos cartes NFC
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <QrCode className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Partagez vos QR codes</p>
                  <p className="text-sm text-muted-foreground">
                    Chaque carte dispose d'un QR code unique que vous pouvez partager facilement.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Créez plusieurs cartes</p>
                  <p className="text-sm text-muted-foreground">
                    Créez différentes cartes pour différents contextes : professionnel, personnel, événements.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Share className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Partagez facilement</p>
                  <p className="text-sm text-muted-foreground">
                    Utilisez les boutons de partage pour envoyer vos cartes par email, SMS ou réseaux sociaux.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
