import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getCardById, getUserById } from "@/data/mockData";
import { Mail, Phone, Link as LinkIcon, Briefcase, Linkedin, Twitter, Facebook, Instagram, UserPlus, Share, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function PublicCardView() {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<any>(null);
  const [cardOwner, setCardOwner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch the card data from an API
    const fetchCard = async () => {
      try {
        const cardData = getCardById(id || "");
        setCard(cardData);
        if (cardData) {
          setCardOwner(getUserById(cardData.userId));
        }
      } catch (error) {
        console.error("Error fetching card:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const handleAddContact = async () => {
    // Check if the Contact API is available (only in secure contexts and with user permission)
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        // Create a new contact
        const props = ['name', 'email', 'tel', 'address', 'icon', 'url'];
        const contacts = await (navigator as any).contacts.select(props, { multiple: false });
        
        if (contacts.length > 0) {
          toast({
            title: "Contact ajouté",
            description: "Le contact a été ajouté à votre carnet d'adresses.",
          });
        }
      } catch (error) {
        console.error("Error adding contact:", error);
        // Fallback for browsers that don't support the Contact Picker API
        createVCardDownload();
      }
    } else {
      // Fallback for browsers that don't support the Contact Picker API
      createVCardDownload();
    }
  };

  const createVCardDownload = () => {
    if (!card) return;

    // Create a vCard format string
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${card.userName || 'Contact'}`,
      card.email ? `EMAIL:${card.email}` : '',
      card.phone ? `TEL:${card.phone}` : '',
      card.company ? `ORG:${card.company}` : '',
      card.job ? `TITLE:${card.job}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\n');

    // Create a Blob and download link
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${card.userName || 'contact'}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Téléchargement de contact",
      description: "Le fichier VCF a été téléchargé, importez-le dans vos contacts.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card?.name || "Carte de contact",
          text: `Carte de contact de ${card?.userName || "Contact"}`,
          url: window.location.href,
        });
      } catch (error) {
        toast({
          title: "Échec du partage",
          description: "Une erreur est survenue lors du partage",
        });
      }
    } else {
      toast({
        title: "Partage non supporté",
        description: "Votre navigateur ne prend pas en charge cette fonctionnalité",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-pulse h-32 w-32 rounded-full bg-gray-200"></div>
        <h2 className="mt-4 text-2xl font-semibold">Chargement...</h2>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Carte introuvable</h2>
          <p className="text-gray-500 mb-6">
            La carte que vous recherchez n'existe pas ou a été supprimée.
          </p>
          <a href="/">
            <Button>Retourner à l'accueil</Button>
          </a>
        </div>
      </div>
    );
  }

  // Helper function to determine the background class based on template
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
        return 'bg-primary/90 text-white';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Banner */}
      <div className={`h-48 ${getTemplateClasses()}`}>
        <div className="container h-full flex items-end pb-4">
          {/* Header content is empty to make space for the avatar */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="container py-8 px-4">
          <Card className="max-w-md mx-auto shadow-lg overflow-hidden relative -mt-20">
            {/* Profile Section */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-center mb-6">
                {cardOwner?.profileImage ? (
                  <img
                    src={cardOwner.profileImage}
                    alt={cardOwner.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
                  />
                ) : (
                  <Avatar className="w-32 h-32 border-4 border-white shadow-sm">
                    <AvatarFallback className="text-4xl bg-primary/20 text-primary">
                      {cardOwner?.name?.substring(0, 2).toUpperCase() || "US"}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className="mt-4 text-center">
                  <h1 className="text-3xl font-bold mb-1">{cardOwner?.name || "Nom utilisateur"}</h1>
                  <p className="text-gray-500 text-xl">{card.job || ""}</p>
                  {card.company && (
                    <div className="flex items-center justify-center mt-2">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-primary font-medium">{card.company}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mt-8">
                {cardOwner?.email && (
                  <a href={`mailto:${cardOwner.email}`} className="flex items-center p-3 hover:bg-gray-50 rounded-md border">
                    <Mail className="h-5 w-5 mr-4 text-primary" />
                    <span className="flex-1">{cardOwner.email}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                )}
                
                {cardOwner?.phone && (
                  <a href={`tel:${cardOwner.phone}`} className="flex items-center p-3 hover:bg-gray-50 rounded-md border">
                    <Phone className="h-5 w-5 mr-4 text-primary" />
                    <span className="flex-1">{cardOwner.phone}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                )}
                
                {card.website && (
                  <a href={card.website} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 hover:bg-gray-50 rounded-md border">
                    <LinkIcon className="h-5 w-5 mr-4 text-primary" />
                    <span className="flex-1 text-primary">{card.website}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                )}
              </div>

              {/* Social Links */}
              {(card.linkedin || card.twitter || card.facebook || card.instagram) && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Réseaux sociaux</h3>
                  <div className="flex justify-center gap-4">
                    {card.linkedin && (
                      <a href={card.linkedin} target="_blank" rel="noopener noreferrer" 
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shadow-sm">
                        <Linkedin className="h-6 w-6 text-gray-700" />
                      </a>
                    )}
                    
                    {card.twitter && (
                      <a href={card.twitter} target="_blank" rel="noopener noreferrer" 
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shadow-sm">
                        <Twitter className="h-6 w-6 text-gray-700" />
                      </a>
                    )}
                    
                    {card.facebook && (
                      <a href={card.facebook} target="_blank" rel="noopener noreferrer" 
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shadow-sm">
                        <Facebook className="h-6 w-6 text-gray-700" />
                      </a>
                    )}
                    
                    {card.instagram && (
                      <a href={card.instagram} target="_blank" rel="noopener noreferrer" 
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center shadow-sm">
                        <Instagram className="h-6 w-6 text-gray-700" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {card.description && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAddContact} className="flex-1">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter aux contacts
                </Button>
                <Button variant="outline" onClick={handleShare} className="flex-1">
                  <Share className="mr-2 h-4 w-4" />
                  Partager
                </Button>
              </div>
              
              <div className="mt-8 pt-4 border-t text-center">
                <p className="text-xs text-gray-400">
                  Créé avec NFC Card Manager
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
