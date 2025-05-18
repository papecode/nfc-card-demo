
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { CreditCard, Loader, QrCode, User, Briefcase, Phone, Mail, Link as LinkIcon } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

const CARD_TEMPLATES = [
  { id: "default", name: "Par défaut", color: "bg-primary" },
  { id: "dark", name: "Sombre", color: "bg-gray-900" },
  { id: "light", name: "Clair", color: "bg-gray-100" },
  { id: "gradient", name: "Dégradé", color: "bg-gradient-to-r from-blue-500 to-purple-600" },
  { id: "minimal", name: "Minimaliste", color: "bg-white border border-gray-200" },
];

export default function UserCardCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("default");
  
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      job: "",
      company: "",
      email: "",
      phone: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      website: "",
    },
  });
  
  const watchedValues = form.watch();

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Include the template in the submission data
      const submissionData = {
        ...data,
        template: selectedTemplate,
        userId: user?.id,
      };
      
      console.log("Card submission data:", submissionData);
      
      toast({
        title: "Carte créée",
        description: "Votre nouvelle carte numérique a été créée avec succès.",
      });
      
      navigate("/cards");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la carte.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Créer une nouvelle carte</h1>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card Creation Form */}
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de base</CardTitle>
                    <CardDescription>
                      Entrez les informations principales pour votre carte numérique
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de la carte</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Carte Professionnelle" 
                              {...field} 
                              maxLength={50}
                            />
                          </FormControl>
                          <div className="text-xs text-muted-foreground text-right">
                            {field.value.length}/50
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Description de la carte (optionnel)" 
                              {...field} 
                              maxLength={200}
                              rows={3}
                            />
                          </FormControl>
                          <div className="text-xs text-muted-foreground text-right">
                            {field.value.length}/200
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informations professionnelles</CardTitle>
                    <CardDescription>
                      Complétez vos informations professionnelles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="job"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Poste / Fonction</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Développeur Web" 
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entreprise</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Ma Société SAS" 
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Coordonnées</CardTitle>
                    <CardDescription>
                      Ajoutez vos informations de contact
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="votre@email.com" 
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="+33 6 12 34 56 78" 
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site web</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://www.monsite.com" 
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Réseaux sociaux</CardTitle>
                    <CardDescription>
                      Ajoutez vos liens de réseaux sociaux
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://www.linkedin.com/in/username" 
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://twitter.com/username" 
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://facebook.com/username" 
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://instagram.com/username" 
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Apparence</CardTitle>
                    <CardDescription>
                      Choisissez un template pour votre carte
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {CARD_TEMPLATES.map((template) => (
                        <div 
                          key={template.id}
                          className={`cursor-pointer rounded-md overflow-hidden transition-all ${
                            selectedTemplate === template.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'
                          }`}
                          onClick={() => handleTemplateChange(template.id)}
                        >
                          <div className={`${template.color} h-24 w-full rounded-md flex items-center justify-center`}>
                            <span className="text-white font-medium text-sm">
                              {template.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Création en cours...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Créer ma carte
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>

          {/* Preview Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Aperçu</CardTitle>
                <CardDescription>
                  Voici à quoi ressemblera votre carte numérique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card">Carte</TabsTrigger>
                    <TabsTrigger value="profile">Profil public</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="pt-4">
                    <div className="max-w-sm mx-auto">
                      <div 
                        className={`
                          ${selectedTemplate === 'default' ? 'bg-primary' : ''}
                          ${selectedTemplate === 'dark' ? 'bg-gray-900' : ''}
                          ${selectedTemplate === 'light' ? 'bg-gray-100' : ''}
                          ${selectedTemplate === 'gradient' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
                          ${selectedTemplate === 'minimal' ? 'bg-white border border-gray-200' : ''}
                          rounded-lg overflow-hidden shadow-md p-6
                        `}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-lg font-bold truncate ${selectedTemplate === 'light' || selectedTemplate === 'minimal' ? 'text-gray-900' : 'text-white'}`}>
                            {watchedValues.name || "Nom de la carte"}
                          </h3>
                          <CreditCard className={`h-5 w-5 ${selectedTemplate === 'light' || selectedTemplate === 'minimal' ? 'text-primary' : 'text-white'}`} />
                        </div>
                        <p className={`line-clamp-3 min-h-[3rem] ${selectedTemplate === 'light' || selectedTemplate === 'minimal' ? 'text-gray-700' : 'text-gray-100'}`}>
                          {watchedValues.description || "Description de la carte..."}
                        </p>
                        <div className="mt-4 pt-4 border-t border-opacity-20">
                          <p className={`text-xs ${selectedTemplate === 'light' || selectedTemplate === 'minimal' ? 'text-gray-600' : 'text-gray-100'}`}>
                            Créé par {user?.name || "Utilisateur"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="profile" className="pt-4">
                    <div className="max-w-sm mx-auto overflow-hidden border rounded-lg shadow-sm">
                      <div className="bg-gray-900 h-32 relative"></div>
                      <div className="px-6 pb-6">
                        <div className="flex justify-center">
                          <div className="w-24 h-24 rounded-full bg-gray-200 -mt-12 flex items-center justify-center border-4 border-white">
                            <User className="h-12 w-12 text-gray-500" />
                          </div>
                        </div>
                        
                        <div className="text-center mt-4">
                          <h2 className="text-2xl font-bold">
                            {user?.name || "Votre nom"}
                          </h2>
                          <p className="text-gray-500">
                            {watchedValues.job || "Titre / Fonction"}
                          </p>
                          <p className="text-primary font-medium">
                            {watchedValues.company || "Nom de l'entreprise"}
                          </p>
                        </div>
                        
                        <div className="mt-6 space-y-4">
                          {watchedValues.email && (
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 mr-3 text-gray-400" />
                              <span className="text-sm">{watchedValues.email}</span>
                            </div>
                          )}
                          
                          {watchedValues.phone && (
                            <div className="flex items-center">
                              <Phone className="h-5 w-5 mr-3 text-gray-400" />
                              <span className="text-sm">{watchedValues.phone}</span>
                            </div>
                          )}
                          
                          {watchedValues.website && (
                            <div className="flex items-center">
                              <LinkIcon className="h-5 w-5 mr-3 text-gray-400" />
                              <span className="text-sm text-primary">{watchedValues.website}</span>
                            </div>
                          )}
                        </div>
                        
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
              <CardFooter className="text-sm text-muted-foreground justify-center">
                <p className="text-center">
                  Créez votre carte pour générer un QR code à partager
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
