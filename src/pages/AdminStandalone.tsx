import React, { useEffect, useState } from 'react';

import { toast } from '../hooks/use-toast';
import * as XLSX from 'xlsx';
import { Download, LogOut, RefreshCw } from 'lucide-react';

// Hardcoded credentials for demo
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';

// Supabase direct connection details
const SUPABASE_URL = 'https://xqmujsdspymsacjzhoyh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxbXVqc2RzcHltc2Fjanpob3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNTQ5NDUsImV4cCI6MjA1OTkzMDk0NX0.IspVcIDlUu5UDw1AnYhA5rV1erdQYBUa-irAO4wvtMM';

// Simple interface for contact submissions
interface ContactSubmission {
  id?: string;
  name?: string;
  email?: string;
  phone?: string | null;
  message?: string;
  interests?: string | null;
  created_at?: string;
}

const AdminStandalone: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated
  useEffect(() => {
    const adminAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (adminAuthenticated === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Simulate network delay
      setTimeout(() => {
        setIsLoading(false);
        // Store authentication in session storage
        sessionStorage.setItem('adminAuthenticated', 'true');
        setIsAuthenticated(true);
        fetchData();
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

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  // Fetch data directly from Supabase
  const fetchData = async () => {
    setIsDataLoading(true);
    setError(null);

    try {


      const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions?select=*`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();


      if (Array.isArray(data)) {
        setSubmissions(data);
      } else {
        setError('Received unexpected data format from the server.');
      }
    } catch (err) {
      setError(`Failed to load data: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';

    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    try {
      if (submissions.length === 0) {
        toast({
          title: 'No data to export',
          description: 'There are no submissions to export.',
          variant: 'destructive',
        });
        return;
      }

      // Format data for export
      const exportData = submissions.map(item => ({
        'Name': item.name || 'N/A',
        'Email': item.email || 'N/A',
        'Phone': item.phone || 'N/A',
        'Interests': item.interests || 'N/A',
        'Message': item.message || 'N/A',
        'Submitted On': item.created_at ? formatDate(item.created_at) : 'N/A'
      }));

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

      // Generate Excel file
      XLSX.writeFile(workbook, 'fitkraft_submissions.xlsx');

      toast({
        title: 'Export successful',
        description: 'Data has been exported to Excel',
      });
    } catch (err) {
      toast({
        title: 'Export failed',
        description: `Failed to export data: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-6">
        <div className="w-full max-w-md p-4 md:p-8 space-y-6 md:space-y-8 bg-background rounded-lg shadow-lg border border-primary/20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground">Admin Login</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Sign in to access the admin dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
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
  }

  // Loading state
  if (isDataLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-red-500 mb-2">Error</h3>
          <p className="text-foreground/70">{error}</p>
          <button
            className="mt-4 py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            onClick={fetchData}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto">
          <button
            onClick={fetchData}
            className="py-2 px-3 md:px-4 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-50 flex items-center text-sm md:text-base flex-1 md:flex-initial justify-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </button>
          <button
            onClick={exportToExcel}
            className="py-2 px-3 md:px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center text-sm md:text-base flex-1 md:flex-initial justify-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </button>
          <button
            onClick={handleLogout}
            className="py-2 px-3 md:px-4 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-50 flex items-center text-sm md:text-base flex-1 md:flex-initial justify-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </div>



      <div className="bg-white rounded-lg shadow-lg border border-yellow-200 overflow-hidden">
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full">
            <thead className="bg-yellow-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Name</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Email</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Phone</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Interests</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Message</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Submitted On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-100">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    <p>No submissions found</p>
                    <p className="mt-2 text-sm">If you've submitted contact forms, please check the Supabase configuration.</p>
                    <button
                      className="mt-4 py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      onClick={fetchData}
                    >
                      Refresh Data
                    </button>
                  </td>
                </tr>
              ) : (
                submissions.map((submission, index) => (
                  <tr key={submission.id || `submission-${index}`} className="hover:bg-yellow-50">
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">{submission.name || 'N/A'}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">{submission.email || 'N/A'}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">{submission.phone || 'N/A'}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">{submission.interests || 'N/A'}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-700 max-w-[100px] md:max-w-xs truncate">{submission.message || 'N/A'}</td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                      {submission.created_at ? formatDate(submission.created_at) : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStandalone;
