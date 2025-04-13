import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Hardcoded credentials for demo
    const validEmail = 'admin@example.com';
    const validPassword = 'password123';

    // Simple validation
    if (email === validEmail && password === validPassword) {
      // Simulate network delay
      setTimeout(() => {
        setIsLoading(false);
        // Store authentication in session storage
        sessionStorage.setItem('adminAuthenticated', 'true');
        onLogin();
        toast({
          title: 'Login successful',
          description: 'Welcome to the admin dashboard',
        });
      }, 1000);
    } else {
      setIsLoading(false);
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-background rounded-lg shadow-lg border border-primary/20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground">Admin Login</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Sign in to access the admin dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className="mt-4 text-center text-sm text-foreground/70">
              <p>Demo credentials:</p>
              <p className="font-mono bg-background/80 p-1 rounded mt-1">Email: admin@example.com</p>
              <p className="font-mono bg-background/80 p-1 rounded mt-1">Password: password123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
