import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

export default function Pillars() {
  const [pillars, setPillars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPillars();
  }, []);

  const fetchPillars = async () => {
    const { data, error } = await supabase
      .from('pillars')
      .select('*')
      .order('order_position');

    if (data) setPillars(data);
    setLoading(false);
  };

  const updatePillar = async (pillar: any) => {
    const { error } = await supabase
      .from('pillars')
      .update({
        title: pillar.title,
        description: pillar.description,
        detailed_content: pillar.detailed_content,
        icon: pillar.icon,
        color_theme: pillar.color_theme
      })
      .eq('id', pillar.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Pillar updated successfully' });
    }
  };

  const addPillar = async () => {
    const { data, error } = await supabase
      .from('pillars')
      .insert([{
        title: 'New Pillar',
        description: 'Pillar description',
        order_position: pillars.length
      }])
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setPillars([...pillars, data]);
      toast({ title: 'Pillar created successfully' });
    }
  };

  const deletePillar = async (id: string) => {
    const { error } = await supabase.from('pillars').delete().eq('id', id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setPillars(pillars.filter(p => p.id !== id));
      toast({ title: 'Pillar deleted successfully' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Pillars Management</h1>
          <Button onClick={addPillar}>
            <Plus className="w-4 h-4 mr-2" />
            Add Pillar
          </Button>
        </div>

        <div className="grid gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{pillar.title}</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => deletePillar(pillar.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={pillar.title}
                    onChange={(e) => {
                      const updated = pillars.map(p =>
                        p.id === pillar.id ? { ...p, title: e.target.value } : p
                      );
                      setPillars(updated);
                    }}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={pillar.description || ''}
                    onChange={(e) => {
                      const updated = pillars.map(p =>
                        p.id === pillar.id ? { ...p, description: e.target.value } : p
                      );
                      setPillars(updated);
                    }}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Detailed Content</Label>
                  <Textarea
                    value={pillar.detailed_content || ''}
                    onChange={(e) => {
                      const updated = pillars.map(p =>
                        p.id === pillar.id ? { ...p, detailed_content: e.target.value } : p
                      );
                      setPillars(updated);
                    }}
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Icon</Label>
                    <Input
                      value={pillar.icon || ''}
                      onChange={(e) => {
                        const updated = pillars.map(p =>
                          p.id === pillar.id ? { ...p, icon: e.target.value } : p
                        );
                        setPillars(updated);
                      }}
                      placeholder="Lucide icon name"
                    />
                  </div>
                  <div>
                    <Label>Color Theme</Label>
                    <Input
                      value={pillar.color_theme || ''}
                      onChange={(e) => {
                        const updated = pillars.map(p =>
                          p.id === pillar.id ? { ...p, color_theme: e.target.value } : p
                        );
                        setPillars(updated);
                      }}
                      placeholder="e.g., primary, secondary"
                    />
                  </div>
                </div>
                <Button onClick={() => updatePillar(pillar)}>Save Changes</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
