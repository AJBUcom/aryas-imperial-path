import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Sword, Crown, Shield } from "lucide-react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Welcome to the Kingdom!",
        description: "Check your email to confirm your account and enter your royal domain.",
      });
    } catch (error: any) {
      toast({
        title: "Quest Failed",
        description: error.message || "Failed to create your royal account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back, Your Majesty!",
        description: "You have returned to your kingdom.",
      });
    } catch (error: any) {
      toast({
        title: "Access Denied",
        description: error.message || "Failed to access your kingdom",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-royal-deep via-royal-midnight to-royal-abyss flex items-center justify-center p-4">
      {/* Floating embers animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-royal-gold rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md bg-royal-deep/80 border-royal-gold/30 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Crown className="h-8 w-8 text-royal-gold" />
            <CardTitle className="text-2xl font-bold text-royal-gold">
              {isSignUp ? "Join the Kingdom" : "Enter Your Realm"}
            </CardTitle>
            <Crown className="h-8 w-8 text-royal-gold" />
          </div>
          <CardDescription className="text-royal-silver">
            {isSignUp 
              ? "Create your royal account and begin your quest for productivity mastery"
              : "Return to your kingdom and continue your legendary journey"
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-royal-gold flex items-center gap-2">
                  <Sword className="h-4 w-4" />
                  Royal Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="bg-royal-midnight/50 border-royal-gold/30 text-royal-silver placeholder:text-royal-silver/60 focus:border-royal-gold"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-royal-gold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-royal-midnight/50 border-royal-gold/30 text-royal-silver placeholder:text-royal-silver/60 focus:border-royal-gold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-royal-gold flex items-center gap-2">
                <Sword className="h-4 w-4" />
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-royal-midnight/50 border-royal-gold/30 text-royal-silver placeholder:text-royal-silver/60 focus:border-royal-gold"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-royal-gold to-royal-gold/80 hover:from-royal-gold/90 hover:to-royal-gold/70 text-royal-deep font-semibold py-3 transform transition-all duration-200 hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-royal-deep/30 border-t-royal-deep rounded-full animate-spin" />
                  {isSignUp ? "Creating Account..." : "Entering Kingdom..."}
                </div>
              ) : (
                isSignUp ? "Create Royal Account" : "Enter Kingdom"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-royal-silver hover:text-royal-gold transition-colors duration-200"
            >
              {isSignUp 
                ? "Already have an account? Sign in to your kingdom"
                : "New to the realm? Create your royal account"
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;