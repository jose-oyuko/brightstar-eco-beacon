import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, Calendar, ImageIcon, MessageSquare, Users, Newspaper } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    events: 0,
    gallery: 0,
    messages: 0,
    team: 0,
    blogPosts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [projects, events, gallery, messages, team, blogPosts] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('events').select('id', { count: 'exact', head: true }),
      supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('team_members').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true })
    ]);

    setStats({
      projects: projects.count || 0,
      events: events.count || 0,
      gallery: gallery.count || 0,
      messages: messages.count || 0,
      team: team.count || 0,
      blogPosts: blogPosts.count || 0
    });
  };

  const statCards = [
    { title: 'Projects', value: stats.projects, icon: FolderKanban, color: 'text-primary' },
    { title: 'Events', value: stats.events, icon: Calendar, color: 'text-secondary' },
    { title: 'Gallery Images', value: stats.gallery, icon: ImageIcon, color: 'text-accent' },
    { title: 'New Messages', value: stats.messages, icon: MessageSquare, color: 'text-destructive' },
    { title: 'Team Members', value: stats.team, icon: Users, color: 'text-primary' },
    { title: 'Blog Posts', value: stats.blogPosts, icon: Newspaper, color: 'text-secondary' },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to BECC Admin Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="/admin/projects" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <FolderKanban className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">Add New Project</h3>
                <p className="text-sm text-muted-foreground">Create a new project entry</p>
              </a>
              <a href="/admin/events" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <Calendar className="w-6 h-6 text-secondary mb-2" />
                <h3 className="font-semibold mb-1">Schedule Event</h3>
                <p className="text-sm text-muted-foreground">Add an upcoming event</p>
              </a>
              <a href="/admin/messages" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <MessageSquare className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-semibold mb-1">View Messages</h3>
                <p className="text-sm text-muted-foreground">Check contact form submissions</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
