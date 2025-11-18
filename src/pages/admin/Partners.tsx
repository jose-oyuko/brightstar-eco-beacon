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

export default function Partners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const { data } = await supabase.from('partners').select('*').order('order_position');
    if (data) setPartners(data);
    setLoading(false);
  };

  const updatePartner = async (partner: any) => {
    const { error } = await supabase
      .from('partners')
      .update({
        name: partner.name,
        description: partner.description,
        website_url: partner.website_url,
        partnership_type: partner.partnership_type
      })
      .eq('id', partner.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Partner updated successfully' });
    }
  };

  const addPartner = async () => {
    const { data, error } = await supabase
      .from('partners')
      .insert([{ name: 'New Partner', partnership_type: 'strategic' }])
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setPartners([...partners, data]);
      toast({ title: 'Partner added successfully' });
    }
  };

  const deletePartner = async (id: string) => {
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setPartners(partners.filter(p => p.id !== id));
      toast({ title: 'Partner deleted successfully' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Partners Management</h1>
          <Button onClick={addPartner}>
            <Plus className="w-4 h-4 mr-2" />
            Add Partner
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{partner.name}</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => deletePartner(partner.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={partner.name}
                    onChange={(e) => {
                      const updated = partners.map(p =>
                        p.id === partner.id ? { ...p, name: e.target.value } : p
                      );
                      setPartners(updated);
                    }}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={partner.description || ''}
                    onChange={(e) => {
                      const updated = partners.map(p =>
                        p.id === partner.id ? { ...p, description: e.target.value } : p
                      );
                      setPartners(updated);
                    }}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Website URL</Label>
                  <Input
                    value={partner.website_url || ''}
                    onChange={(e) => {
                      const updated = partners.map(p =>
                        p.id === partner.id ? { ...p, website_url: e.target.value } : p
                      );
                      setPartners(updated);
                    }}
                  />
                </div>
                <div>
                  <Label>Partnership Type</Label>
                  <Input
                    value={partner.partnership_type || ''}
                    onChange={(e) => {
                      const updated = partners.map(p =>
                        p.id === partner.id ? { ...p, partnership_type: e.target.value } : p
                      );
                      setPartners(updated);
                    }}
                  />
                </div>
                <Button onClick={() => updatePartner(partner)}>Save Changes</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
