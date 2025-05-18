
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Trash2, UserRound } from "lucide-react";
import { getUserById, getUserCards } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminUserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserById(id || ""));
  const [userCards, setUserCards] = useState(getUserCards(id || ""));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Utilisateur introuvable",
        description: "L'utilisateur que vous recherchez n'existe pas.",
        variant: "destructive",
      });
      navigate("/admin/users");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleDeleteUser = () => {
    // In a real app, this would call an API to delete the user
    toast({
      title: "Utilisateur supprimé",
      description: `L'utilisateur ${user.name} a été supprimé avec succès.`,
    });
    navigate("/admin/users");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="mb-6">
          <Link to="/admin/users" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux utilisateurs
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* User Profile */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profil utilisateur</CardTitle>
              <CardDescription>
                Informations de l'utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
                <UserRound className="h-12 w-12 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Badge variant={user.role === "admin" ? "secondary" : "outline"}>
                {user.role === "admin" ? "Administrateur" : "Utilisateur"}
              </Badge>
              <div className="text-sm text-muted-foreground">
                Inscrit le{" "}
                {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  // In a real app, this would be implemented
                  toast({
                    description: "Cette fonctionnalité sera implémentée prochainement",
                  });
                }}
              >
                Modifier
              </Button>
              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir supprimer l'utilisateur "{user.name}" ? Cette action est irréversible et supprimera toutes ses cartes NFC.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteUser}>
                      Supprimer
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* User Cards */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Cartes NFC
              </CardTitle>
              <CardDescription>
                Toutes les cartes créées par cet utilisateur
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userCards.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date de création</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{card.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">
                              {card.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={card.isActive ? "default" : "secondary"}>
                            {card.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(card.createdAt).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to={`/admin/cards/${card.id}`}>
                            <Button variant="ghost" size="sm">
                              Voir détails
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                  <CreditCard className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">Aucune carte</h3>
                  <p className="text-sm text-muted-foreground">
                    Cet utilisateur n'a pas encore créé de carte NFC.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                {userCards.length} carte{userCards.length !== 1 ? "s" : ""} trouvée{userCards.length !== 1 ? "s" : ""}
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
