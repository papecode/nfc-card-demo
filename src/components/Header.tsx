
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LogOut, Menu, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Link to="/login">
            <Button variant="ghost">Connexion</Button>
          </Link>
          <Link to="/register">
            <Button>Créer un compte</Button>
          </Link>
        </>
      );
    }

    if (user?.role === 'admin') {
      return (
        <>
          <Link to="/admin">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/admin/cards">
            <Button variant="ghost">Cartes NFC</Button>
          </Link>
          <Link to="/admin/users">
            <Button variant="ghost">Utilisateurs</Button>
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Link to="/cards">
          <Button variant="ghost">Mes cartes</Button>
        </Link>
        <Link to="/cards/create">
          <Button variant="ghost">Créer une carte</Button>
        </Link>
      </>
    );
  };

  const MobileNavLinks = () => {
    const closeMenu = () => setIsMobileMenuOpen(false);
    
    if (!isAuthenticated) {
      return (
        <div className="flex flex-col space-y-4 pt-4">
          <Link to="/login" onClick={closeMenu}>
            <Button variant="ghost" className="w-full justify-start">Connexion</Button>
          </Link>
          <Link to="/register" onClick={closeMenu}>
            <Button className="w-full justify-start">Créer un compte</Button>
          </Link>
        </div>
      );
    }

    if (user?.role === 'admin') {
      return (
        <div className="flex flex-col space-y-4 pt-4">
          <Link to="/admin" onClick={closeMenu}>
            <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
          </Link>
          <Link to="/admin/cards" onClick={closeMenu}>
            <Button variant="ghost" className="w-full justify-start">Cartes NFC</Button>
          </Link>
          <Link to="/admin/users" onClick={closeMenu}>
            <Button variant="ghost" className="w-full justify-start">Utilisateurs</Button>
          </Link>
          <Button 
            variant="destructive" 
            className="w-full justify-start mt-8"
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-4 pt-4">
        <Link to="/dashboard" onClick={closeMenu}>
          <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
        </Link>
        <Link to="/cards" onClick={closeMenu}>
          <Button variant="ghost" className="w-full justify-start">Mes cartes</Button>
        </Link>
        <Link to="/cards/create" onClick={closeMenu}>
          <Button variant="ghost" className="w-full justify-start">Créer une carte</Button>
        </Link>
        <Button 
          variant="destructive" 
          className="w-full justify-start mt-8"
          onClick={() => {
            handleLogout();
            closeMenu();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Se déconnecter
        </Button>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 rounded-full bg-primary">
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary-foreground">
              N
            </span>
          </div>
          <span className="hidden text-lg font-bold sm:inline-block">
            NFC Card Manager
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-4 md:flex">
          <NavLinks />
          
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                  {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(user?.role === 'admin' ? '/admin' : '/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-2">
                <div className="relative h-8 w-8 rounded-full bg-primary">
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary-foreground">
                    N
                  </span>
                </div>
                <span className="text-lg font-bold">NFC Card Manager</span>
              </div>
              
              {isAuthenticated && (
                <div className="mt-6 border-t pt-4">
                  <p className="text-sm font-medium">Connecté en tant que</p>
                  <p className="text-sm text-muted-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              )}
              
              <MobileNavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
