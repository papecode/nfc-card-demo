
import { useEffect, useState } from "react";
import { CopyButton } from "./copy-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Download, Share, QrCode as QrCodeIcon, Link as LinkIcon } from "lucide-react";
import { toast } from "./use-toast";

interface QrCodeProps {
  data: string;
  title: string;
  description?: string;
  showShareButton?: boolean;
  showDownloadButton?: boolean;
  showLinkButton?: boolean;
  className?: string;
}

export function QrCode({ 
  data, 
  title, 
  description, 
  showShareButton = true, 
  showDownloadButton = true,
  showLinkButton = true,
  className 
}: QrCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Format the URL to use the Lovable preview domain
  const formatPublicUrl = (url: string) => {
    // Extract the ID if it's in a specific format, or use the original URL
    const idMatch = url.match(/\/cards\/([^\/]+)/);
    if (idMatch && idMatch[1]) {
      return `https://preview--cardly-admin-portal.lovable.app/cards/${idMatch[1]}/view`;
    }
    return url;
  };
  
  const formattedUrl = formatPublicUrl(data);
  
  useEffect(() => {
    // Generate QR code URL using a free service
    const encodedData = encodeURIComponent(formattedUrl);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
    
    // Check if the QR code loads correctly
    const img = new Image();
    img.onload = () => {
      setQrCodeUrl(qrUrl);
      setIsLoading(false);
    };
    img.onerror = () => {
      // Fallback to another QR code service if the first one fails
      const fallbackUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodedData}&chs=200x200&choe=UTF-8&chld=L|2`;
      setQrCodeUrl(fallbackUrl);
      setIsLoading(false);
    };
    img.src = qrUrl;
  }, [formattedUrl]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: formattedUrl,
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

  const handleDownload = () => {
    // Create a link to download the QR code image
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-qrcode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        description: "QR Code téléchargé avec succès",
      });
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <QrCodeIcon className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        {isLoading ? (
          <div className="h-[200px] w-[200px] animate-pulse rounded-md bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Chargement...</span>
          </div>
        ) : qrCodeUrl ? (
          <img
            src={qrCodeUrl}
            alt={`QR Code pour ${title}`}
            width={200}
            height={200}
            className="rounded-md border"
            onError={(e) => {
              // Fallback if the image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(formattedUrl)}&chs=200x200&choe=UTF-8&chld=L|2`;
            }}
          />
        ) : (
          <div className="h-[200px] w-[200px] flex items-center justify-center rounded-md bg-muted text-muted-foreground">
            Impossible de générer le QR code
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <CopyButton 
          value={formattedUrl} 
          size="default" 
          variant="outline"
          className="flex-1"
        />
        {showShareButton && (
          <Button 
            onClick={handleShare} 
            variant="default" 
            className="flex-1"
          >
            <Share className="mr-2 h-4 w-4" />
            Partager
          </Button>
        )}
        {showDownloadButton && qrCodeUrl && (
          <Button 
            onClick={handleDownload} 
            variant="outline" 
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        )}
        {showLinkButton && (
          <Button 
            onClick={() => window.open(formattedUrl, "_blank", "noopener,noreferrer")}
            variant="secondary" 
            className="flex-1"
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            Ouvrir le lien
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
