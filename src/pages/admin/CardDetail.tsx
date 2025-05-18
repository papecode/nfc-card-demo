
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { QrCode } from "@/components/ui/qr-code";
import { ArrowLeft, CreditCard, Trash2, User } from "lucide-react";
import { getCardById, getUserById } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function AdminCardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState(getCardById(id || ""));
  const [isActive, setIsActive] = useState(card?.isActive || false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const cardOwner = getUserById(card?.userId || "");

  useEffect(() => {
    if (!card) {
      toast({
        title: "Carte introuvable",
        description: "La carte que vous recherchez n'existe pas.",
        variant: "destructive",
      });
      navigate("/admin/cards");
    }
  }, [card, navigate]);

  if (!card) return null;

  const handleStatusChange = (checked: boolean) => {
    setIsActive(checked);
    toast({
      title: checked ? "Carte activée" : "Carte désactivée",
      description: `La carte ${card.name} a été ${checked ? "activée" : "désactivée"}.`,
    });
  };

  const handleDeleteCard = () => {
    // In a real app, this would call an API to delete the card
    toast({
      title: "Carte supprimée",
      description: `La carte ${card.name} a été supprimée avec succès.`,
    });
    navigate("/admin/cards");
  };

  const cardUrl = `https://nfcmanager.com/cards/${card.id}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="mb-6">
          <Link to="/admin/cards" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux cartes
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Card Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{card.name}</h1>
              <p className="text-muted-foreground">
                Détails de la carte NFC
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm">Nom de la carte</Label>
                  <div className="font-medium mt-1">{card.name}</div>
                </div>
                <div>
                  <Label className="text-sm">Description</Label>
                  <div className="font-medium mt-1">{card.description}</div>
                </div>
                <div>
                  <Label className="text-sm">Date de création</Label>
                  <div className="font-medium mt-1">
                    {new Date(card.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div>
                  <Label className="text-sm">URL publique</Label>
                  <div className="font-medium mt-1 text-primary">
                    {cardUrl}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="card-status"
                    checked={isActive}
                    onCheckedChange={handleStatusChange}
                  />
                  <Label htmlFor="card-status" className={isActive ? "text-primary" : "text-muted-foreground"}>
                    {isActive ? "Carte active" : "Carte inactive"}
                  </Label>
                </div>
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer la carte
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmer la suppression</DialogTitle>
                      <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer la carte "{card.name}" ? Cette action est irréversible.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteCard}>
                        Supprimer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            {/* Card Owner */}
            <Card>
              <CardHeader>
                <CardTitle>Propriétaire de la carte</CardTitle>
                <CardDescription>
                  Informations sur l'utilisateur propriétaire de cette carte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{cardOwner?.name || "Utilisateur inconnu"}</p>
                    <p className="text-sm text-muted-foreground">{cardOwner?.email || "Email inconnu"}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {cardOwner ? (
                  <Link to={`/admin/users/${cardOwner.id}`}>
                    <Button variant="outline" size="sm">
                      Voir le profil
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Utilisateur non disponible
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* QR Code */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  QR Code
                </CardTitle>
                <CardDescription>
                  QR Code de la carte pour partage facile
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <QrCode 
                  data={cardUrl}
                  title={card.name}
                  description="Scanner pour accéder à la carte"
                  showShareButton={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
