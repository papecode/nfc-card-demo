
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  label?: string;
  variant?: "outline" | "ghost" | "default" | "secondary" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onCopy?: () => void;
  notification?: boolean;
}

export function CopyButton({
  value,
  className,
  variant = "outline",
  size = "icon",
  label = "Copier",
  onCopy,
  notification = true,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  async function copyToClipboard() {
    if (!value) {
      toast({
        title: "Échec de copie",
        description: "Aucun texte à copier",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await navigator.clipboard.writeText(value);
      setHasCopied(true);
      
      if (notification) {
        toast({
          description: "Copié dans le presse-papier",
        });
      }
      
      if (onCopy) {
        onCopy();
      }
      
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
      toast({
        title: "Échec de copie",
        description: "Impossible de copier le texte",
        variant: "destructive",
      });
    }
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={cn("transition-all", className)}
      onClick={copyToClipboard}
      {...props}
    >
      {hasCopied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {size !== "icon" && (hasCopied ? "Copié" : label)}
    </Button>
  );
}
