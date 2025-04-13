import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Download, LogOut, RefreshCw } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from '../../hooks/use-toast';
import { fetchContactSubmissions, formatDate } from './supabaseDirectFetch';

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

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to load data
  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchContactSubmissions();
      console.log('Dashboard received data:', data);
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(`Failed to load data: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    onLogout();
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  const handleRefresh = () => {
    toast({
      title: 'Refreshing data',
      description: 'Fetching latest submissions...',
    });
    loadData();
  };

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
      console.error('Error exporting to Excel:', err);
      toast({
        title: 'Export failed',
        description: `Failed to export data: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-red-500 mb-2">Error</h3>
          <p className="text-foreground/70">{error}</p>
          <Button
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={loadData}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button
            onClick={exportToExcel}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Debug info - will help troubleshoot */}
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <h3 className="font-bold mb-2">Debug Information:</h3>
        <p>Total submissions loaded: {submissions.length}</p>
        <p className="text-xs mt-2">If you're seeing this message but no data below, check the browser console (F12) for errors.</p>
      </div>

      <div className="bg-background rounded-lg shadow-lg border border-primary/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Interests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Submitted On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-foreground/70">
                    <p>No submissions found</p>
                    <p className="mt-2 text-sm">If you've submitted contact forms, please check the Supabase configuration.</p>
                    <Button
                      className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleRefresh}
                    >
                      Refresh Data
                    </Button>
                  </td>
                </tr>
              ) : (
                submissions.map((submission, index) => (
                  <tr key={submission.id || `submission-${index}`} className="hover:bg-primary/5">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{submission.name || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{submission.email || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{submission.phone || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{submission.interests || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-foreground max-w-xs truncate">{submission.message || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
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

export default AdminDashboard;
