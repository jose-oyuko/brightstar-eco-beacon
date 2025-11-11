import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  FolderKanban, 
  Calendar, 
  ImageIcon, 
  Users, 
  Newspaper, 
  MessageSquare,
  Settings,
  LogOut,
  Handshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: FileText, label: 'Content', path: '/admin/content' },
  { icon: Target, label: 'Pillars', path: '/admin/pillars' },
  { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
  { icon: Calendar, label: 'Events', path: '/admin/events' },
  { icon: ImageIcon, label: 'Gallery', path: '/admin/gallery' },
  { icon: Handshake, label: 'Partners', path: '/admin/partners' },
  { icon: Users, label: 'Team', path: '/admin/team' },
  { icon: Newspaper, label: 'Blog', path: '/admin/blog' },
  { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminSidebar() {
  const location = useLocation();
  const { signOut, user } = useAuth();

  return (
    <div className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">BECC Admin</h2>
        <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3"
          onClick={signOut}
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
