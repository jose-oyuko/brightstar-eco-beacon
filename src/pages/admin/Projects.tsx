import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [pillars, setPillars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [projectsRes, pillarsRes] = await Promise.all([
      supabase.from('projects').select('*').order('order_position'),
      supabase.from('pillars').select('id, title')
    ]);

    if (projectsRes.data) setProjects(projectsRes.data);
    if (pillarsRes.data) setPillars(pillarsRes.data);
    setLoading(false);
  };

  const updateProject = async (project: any) => {
    const { error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        slug: project.slug,
        short_description: project.short_description,
        full_description: project.full_description,
        status: project.status,
        pillar_id: project.pillar_id,
        location: project.location,
        budget: project.budget,
        beneficiaries_count: project.beneficiaries_count
      })
      .eq('id', project.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Project updated successfully' });
    }
  };

  const addProject = async () => {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: 'New Project',
        slug: 'new-project-' + Date.now(),
        short_description: 'Project description',
        status: 'planning'
      }])
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setProjects([...projects, data]);
      toast({ title: 'Project created successfully' });
    }
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setProjects(projects.filter(p => p.id !== id));
      toast({ title: 'Project deleted successfully' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Projects Management</h1>
          <Button onClick={addProject}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{project.title}</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => deleteProject(project.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={project.title}
                      onChange={(e) => {
                        const updated = projects.map(p =>
                          p.id === project.id ? { ...p, title: e.target.value } : p
                        );
                        setProjects(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input
                      value={project.slug}
                      onChange={(e) => {
                        const updated = projects.map(p =>
                          p.id === project.id ? { ...p, slug: e.target.value } : p
                        );
                        setProjects(updated);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label>Short Description</Label>
                  <Textarea
                    value={project.short_description || ''}
                    onChange={(e) => {
                      const updated = projects.map(p =>
                        p.id === project.id ? { ...p, short_description: e.target.value } : p
                      );
                      setProjects(updated);
                    }}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Full Description</Label>
                  <Textarea
                    value={project.full_description || ''}
                    onChange={(e) => {
                      const updated = projects.map(p =>
                        p.id === project.id ? { ...p, full_description: e.target.value } : p
                      );
                      setProjects(updated);
                    }}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={project.status}
                      onValueChange={(value) => {
                        const updated = projects.map(p =>
                          p.id === project.id ? { ...p, status: value } : p
                        );
                        setProjects(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Pillar</Label>
                    <Select
                      value={project.pillar_id || ''}
                      onValueChange={(value) => {
                        const updated = projects.map(p =>
                          p.id === project.id ? { ...p, pillar_id: value } : p
                        );
                        setProjects(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pillar" />
                      </SelectTrigger>
                      <SelectContent>
                        {pillars.map(pillar => (
                          <SelectItem key={pillar.id} value={pillar.id}>{pillar.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={project.location || ''}
                      onChange={(e) => {
                        const updated = projects.map(p =>
                          p.id === project.id ? { ...p, location: e.target.value } : p
                        );
                        setProjects(updated);
                      }}
                    />
                  </div>
                </div>
                <Button onClick={() => updateProject(project)}>Save Changes</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
