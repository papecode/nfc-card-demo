import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { QrCode } from "@/components/ui/qr-code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CreditCard, Pencil, Trash2, User, Mail, Phone, Link as LinkIcon, Briefcase, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { getCardById, getUserById } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function UserCardDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [card, setCard] = useState(getCardById(id || ""));
  const cardOwner = getUserById(card?.userId || "");
  const [isActive, setIsActive] = useState(card?.isActive || false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedCard, setEditedCard] = useState(card);
  const [editedUser, setEditedUser] = useState(cardOwner);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!card) {
      toast({
        title: "Carte introuvable",
        description: "La carte que vous recherchez n'existe pas.",
        variant: "destructive",
      });
      navigate("/cards");
      return;
    }

    // Check if the card belongs to the current user
    /*
    if (card.userId !== user?.id) {
      toast({
        title: "Accès refusé",
        description: "Vous n'êtes pas autorisé à accéder à cette carte.",
        variant: "destructive",
      });
      navigate("/cards");
    }
    */
  }, [card, user, navigate]);

  if (!card) return null;

  // Check if card has any social media links
  const hasSocialLinks = card.linkedin || card.twitter || card.facebook || card.instagram;

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
    navigate("/cards");
  };

  // Format the URL to use the new NFC Card Demo domain
  const cardUrl = `https://nfc-card-demo.vercel.app/cards/${card.id}/view`;

  // Function to determine template classes
  const getTemplateClasses = () => {
    switch (card.template) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'light':
        return 'bg-gray-100 text-gray-900';
      case 'gradient':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white';
      case 'minimal':
        return 'bg-white text-gray-900 border border-gray-200';
      default:
        return 'bg-primary text-white';
    }
  };

  const handleEdit = () => {
    setEditedCard(card);
    setEditedUser(cardOwner);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("user_")) {
      setEditedUser({ ...editedUser, [name.replace("user_", "")]: value });
    } else {
      setEditedCard({ ...editedCard, [name]: value });
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setEditedUser({ ...editedUser, profileImage: url });
    }
  };

  const handleEditSave = () => {
    setCard(editedCard);
    // Ici, tu pourrais aussi mettre à jour les données mockées globales si besoin
    setEditDialogOpen(false);
    toast({
      title: "Modifications enregistrées",
      description: "Les informations ont été mises à jour.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="mb-6">
          <Link to="/cards" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à mes cartes
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Card Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title section */}
            <div className="flex items-center gap-4">
              {cardOwner?.profileImage ? (
                <img
                  src={cardOwner.profileImage}
                  alt={cardOwner.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-primary text-2xl font-bold text-primary">
                  {cardOwner?.name?.substring(0, 2).toUpperCase() || "US"}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{card.name}</h1>
                <p className="text-muted-foreground">
                  Détails et partage de votre carte numérique
                </p>
              </div>
            </div>

            {/* Card information */}
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Card info details */}
                <div>
                  <Label className="text-sm">Nom de la carte</Label>
                  <div className="font-medium mt-1">{card.name}</div>
                </div>
                {card.description && (
                  <div>
                    <Label className="text-sm">Description</Label>
                    <div className="font-medium mt-1">{card.description}</div>
                  </div>
                )}
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
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Modifier
                  </Button>
                  <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
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
                </div>
              </CardFooter>
            </Card>

            {/* Card Preview */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Aperçu de la carte</CardTitle>
                <CardDescription>
                  Voici à quoi ressemble votre carte numérique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">Carte</TabsTrigger>
                    <TabsTrigger value="profile">Profil public</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="pt-4">
                    <div className="max-w-md mx-auto">
                      <div className={`rounded-lg overflow-hidden shadow-md p-6 ${getTemplateClasses()}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold truncate">
                            {card.name}
                          </h3>
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <p className="line-clamp-3 min-h-[3rem] opacity-90">
                          {card.description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-opacity-20">
                          <p className="text-xs opacity-80">
                            Créé par {user?.name || "Utilisateur"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="profile" className="pt-4">
                    <div className="max-w-md mx-auto border rounded-lg shadow-sm overflow-hidden">
                      <div className={`h-32 ${getTemplateClasses()}`}></div>
                      <div className="px-6 pb-6">
                        <div className="flex justify-center">
                          {cardOwner?.profileImage ? (
                            <img
                              src={cardOwner.profileImage}
                              alt={cardOwner.name}
                              className="w-24 h-24 rounded-full object-cover -mt-12 border-4 border-white"
                            />
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-200 -mt-12 flex items-center justify-center border-4 border-white text-gray-500 text-2xl font-bold">
                              {cardOwner?.name?.substring(0, 2).toUpperCase() || "US"}
                            </div>
                          )}
                        </div>
                        <div className="text-center mt-4">
                          <h2 className="text-2xl font-bold">
                            {cardOwner?.name || "Votre nom"}
                          </h2>
                          <p className="text-gray-500">
                            {card.job || ""}
                          </p>
                          {card.company && (
                            <p className="text-primary font-medium">
                              {card.company}
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-6 space-y-4">
                          {card.email && (
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 mr-3 text-gray-400" />
                              <span className="text-sm">{card.email}</span>
                            </div>
                          )}
                          
                          {card.phone && (
                            <div className="flex items-center">
                              <Phone className="h-5 w-5 mr-3 text-gray-400" />
                              <span className="text-sm">{card.phone}</span>
                            </div>
                          )}
                          
                          {card.website && (
                            <div className="flex items-center">
                              <LinkIcon className="h-5 w-5 mr-3 text-gray-400" />
                              <span className="text-sm text-primary">{card.website}</span>
                            </div>
                          )}
                        </div>
                        
                        {hasSocialLinks && (
                          <div className="mt-6 flex justify-center gap-4">
                            {card.linkedin && (
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <Linkedin className="h-5 w-5 text-gray-700" />
                              </div>
                            )}
                            {card.twitter && (
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <Twitter className="h-5 w-5 text-gray-700" />
                              </div>
                            )}
                            {card.facebook && (
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <Facebook className="h-5 w-5 text-gray-700" />
                              </div>
                            )}
                            {card.instagram && (
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <Instagram className="h-5 w-5 text-gray-700" />
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="mt-6">
                          <Button className="w-full">
                            Ajouter aux contacts
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* QR Code */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  QR Code
                </CardTitle>
                <CardDescription>
                  Partagez facilement votre carte avec ce QR Code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QrCode 
                  data={cardUrl}
                  title={card.name}
                  description="Scanner pour accéder à la carte"
                  showShareButton={true}
                />
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground text-center block">
                <p>Lorsque quelqu'un scannera ce QR code, il accédera à votre carte numérique</p>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Guide de partage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-medium">Par email</h3>
                  <p className="text-sm text-muted-foreground">
                    Copiez le lien de votre carte et partagez-le par email avec vos contacts.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Via les réseaux sociaux</h3>
                  <p className="text-sm text-muted-foreground">
                    Utilisez le bouton de partage pour partager directement sur vos réseaux.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">En personne</h3>
                  <p className="text-sm text-muted-foreground">
                    Montrez le QR code à la personne pour qu'elle puisse le scanner.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Modifier le profil et la carte</DialogTitle>
            <DialogDescription>
              Modifiez les informations du profil utilisateur et de la carte NFC.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              {editedUser?.profileImage ? (
                <img src={editedUser.profileImage} alt="Profil" className="w-20 h-20 rounded-full object-cover border-2 border-primary" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-primary text-2xl font-bold text-primary">
                  {editedUser?.name?.substring(0, 2).toUpperCase() || "US"}
                </div>
              )}
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                Changer la photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </div>
            <Input
              name="user_name"
              value={editedUser?.name || ""}
              onChange={handleEditChange}
              placeholder="Nom complet"
              className="mb-2"
            />
            <Input
              name="user_email"
              value={editedUser?.email || ""}
              onChange={handleEditChange}
              placeholder="Email"
              className="mb-2"
            />
            <Input
              name="name"
              value={editedCard?.name || ""}
              onChange={handleEditChange}
              placeholder="Titre de la carte"
              className="mb-2"
            />
            <Input
              name="description"
              value={editedCard?.description || ""}
              onChange={handleEditChange}
              placeholder="Description"
              className="mb-2"
            />
            <Input
              name="linkedin"
              value={editedCard?.linkedin || ""}
              onChange={handleEditChange}
              placeholder="Lien LinkedIn"
              className="mb-2"
            />
            <Input
              name="facebook"
              value={editedCard?.facebook || ""}
              onChange={handleEditChange}
              placeholder="Lien Facebook"
              className="mb-2"
            />
            <Input
              name="instagram"
              value={editedCard?.instagram || ""}
              onChange={handleEditChange}
              placeholder="Lien Instagram"
              className="mb-2"
            />
            <Input
              name="phone"
              value={editedCard?.phone || ""}
              onChange={handleEditChange}
              placeholder="Téléphone"
              className="mb-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditSave}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
