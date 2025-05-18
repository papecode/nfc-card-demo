
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { generateStats } from "@/data/mockData";
import { CreditCard, PieChart, User, Users } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const stats = generateStats();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tableau de bord Admin</h1>
            <p className="text-muted-foreground">
              Bienvenue, {user?.name}. Voici un aperçu de votre système.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Cards */}
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total des cartes
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCards}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.activeCardPercentage}% sont actives
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
                <div className="text-2xl font-bold">{stats.activeCards}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.inactiveCards} cartes inactives
                </p>
              </CardContent>
            </Card>

            {/* Total Users */}
            <Card className="animate-fade-in delay-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Utilisateurs
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Utilisateurs inscrits
                </p>
              </CardContent>
            </Card>

            {/* Cards per User */}
            <Card className="animate-fade-in delay-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Moyenne de cartes
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalUsers > 0 
                    ? (stats.totalCards / stats.totalUsers).toFixed(1) 
                    : "0"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Cartes par utilisateur
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Cards */}
            <Card className="col-span-2 animate-fade-in delay-400">
              <CardHeader>
                <CardTitle>Cartes par utilisateur</CardTitle>
                <CardDescription>
                  Distribution des cartes NFC entre les utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.cardsPerUser.map((item) => (
                    <div key={item.userId} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                        <User className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium leading-none">{item.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.cardCount} carte{item.cardCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-fade-in delay-500">
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>
                  Accédez rapidement aux fonctions principales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link
                  to="/admin/cards"
                  className="flex items-center justify-between rounded-md border p-3 transition-all hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Gérer les cartes NFC</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stats.totalCards} cartes
                  </span>
                </Link>
                <Link
                  to="/admin/users"
                  className="flex items-center justify-between rounded-md border p-3 transition-all hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Gérer les utilisateurs</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stats.totalUsers} utilisateurs
                  </span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
