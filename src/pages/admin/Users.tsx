
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getUserCards, mockUsers } from "@/data/mockData";
import { CreditCard, Eye, Search, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
              <p className="text-muted-foreground">
                Consultez et gérez tous les utilisateurs du système
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher un utilisateur..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
              {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? "s" : ""} trouvé{filteredUsers.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Users List */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Liste des utilisateurs</CardTitle>
              <CardDescription>
                Tous les utilisateurs enregistrés dans le système
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Cartes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => {
                      const userCards = getUserCards(user.id);
                      return (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  Inscrit le {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "admin" ? "secondary" : "outline"}>
                              {user.role === "admin" ? "Admin" : "Utilisateur"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span>{userCards.length}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link to={`/admin/users/${user.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="mr-1 h-4 w-4" />
                                Voir
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <UserRound className="h-10 w-10 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-semibold">Aucun utilisateur trouvé</h3>
                          <p className="text-sm text-muted-foreground">
                            Aucun utilisateur ne correspond à votre recherche.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
