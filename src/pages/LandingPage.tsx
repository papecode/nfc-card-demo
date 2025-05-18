
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { CheckCircle, CreditCard, QrCode, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-accent/20 px-4 py-20 md:py-32 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="mb-6 animate-fade-in text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Simplifiez vos échanges professionnels avec des cartes NFC intelligentes
          </h1>
          <p className="mx-auto mb-10 max-w-2xl animate-fade-in delay-100 text-balance text-lg text-muted-foreground md:text-xl">
            Créez, partagez et gérez vos cartes NFC personnalisées en quelques clics. Un moyen moderne et élégant de partager vos coordonnées.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in delay-200">
            <Link to="/register">
              <Button size="lg" className="h-12 px-8">
                Commencer maintenant
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="h-12 px-8">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Fonctionnalités principales
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="nfc-card card-gradient">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Gestion de cartes NFC</h3>
            <p className="text-muted-foreground">
              Créez et gérez facilement vos cartes NFC personnalisées avec votre profil professionnel.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="nfc-card card-gradient">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <QrCode className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">QR codes partagés</h3>
            <p className="text-muted-foreground">
              Partagez rapidement vos informations via QR codes générés automatiquement pour chaque carte.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="nfc-card card-gradient">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Gestion de contacts</h3>
            <p className="text-muted-foreground">
              Organisez vos contacts et gérez facilement qui a accès à vos informations professionnelles.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-accent/30 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Comment ça fonctionne
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Créez votre compte</h3>
              <p className="text-muted-foreground">
                Inscrivez-vous gratuitement et configurez votre profil en quelques minutes.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Créez vos cartes NFC</h3>
              <p className="text-muted-foreground">
                Personnalisez vos cartes avec vos informations professionnelles et votre branding.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Partagez facilement</h3>
              <p className="text-muted-foreground">
                Utilisez les QR codes ou vos cartes NFC physiques pour partager vos coordonnées instantanément.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-20">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Pourquoi choisir notre solution
        </h2>
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="flex items-start gap-3 rounded-lg border p-4 transition-all hover:bg-accent/50">
            <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Écologique</h3>
              <p className="text-muted-foreground">
                Réduisez votre empreinte carbone en éliminant les cartes de visite papier.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-4 transition-all hover:bg-accent/50">
            <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Moderne et professionnel</h3>
              <p className="text-muted-foreground">
                Démarquez-vous avec une solution technologique de pointe qui impressionne vos contacts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-4 transition-all hover:bg-accent/50">
            <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Données toujours à jour</h3>
              <p className="text-muted-foreground">
                Mettez à jour vos informations à tout moment, sans avoir à réimprimer de nouvelles cartes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-4 transition-all hover:bg-accent/50">
            <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Suivi des interactions</h3>
              <p className="text-muted-foreground">
                Obtenez des statistiques sur la façon dont vos cartes sont utilisées et partagées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="mb-6 text-3xl font-bold">Prêt à moderniser votre networking ?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/90">
            Rejoignez les professionnels qui ont déjà adopté notre solution de cartes NFC pour simplifier leurs échanges professionnels.
          </p>
          <Link to="/register">
            <Button 
              variant="secondary" 
              size="lg" 
              className="h-12 px-8 text-primary"
            >
              Commencer gratuitement
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-accent/10 py-10">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8 rounded-full bg-primary">
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary-foreground">
                  N
                </span>
              </div>
              <span className="text-lg font-bold">
                NFC Card Manager
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 NFC Card Manager. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
