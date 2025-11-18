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

export default function Team() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data } = await supabase.from('team_members').select('*').order('order_position');
    if (data) setMembers(data);
    setLoading(false);
  };

  const updateMember = async (member: any) => {
    const { error } = await supabase
      .from('team_members')
      .update({
        name: member.name,
        position: member.position,
        bio: member.bio,
        email: member.email,
        linkedin_url: member.linkedin_url
      })
      .eq('id', member.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Team member updated successfully' });
    }
  };

  const addMember = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .insert([{ name: 'New Member', position: 'Position' }])
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setMembers([...members, data]);
      toast({ title: 'Team member added successfully' });
    }
  };

  const deleteMember = async (id: string) => {
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setMembers(members.filter(m => m.id !== id));
      toast({ title: 'Team member deleted successfully' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Team Management</h1>
          <Button onClick={addMember}>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {members.map((member) => (
            <Card key={member.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{member.name}</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => deleteMember(member.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={member.name}
                    onChange={(e) => {
                      const updated = members.map(m =>
                        m.id === member.id ? { ...m, name: e.target.value } : m
                      );
                      setMembers(updated);
                    }}
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={member.position}
                    onChange={(e) => {
                      const updated = members.map(m =>
                        m.id === member.id ? { ...m, position: e.target.value } : m
                      );
                      setMembers(updated);
                    }}
                  />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Textarea
                    value={member.bio || ''}
                    onChange={(e) => {
                      const updated = members.map(m =>
                        m.id === member.id ? { ...m, bio: e.target.value } : m
                      );
                      setMembers(updated);
                    }}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={member.email || ''}
                    onChange={(e) => {
                      const updated = members.map(m =>
                        m.id === member.id ? { ...m, email: e.target.value } : m
                      );
                      setMembers(updated);
                    }}
                  />
                </div>
                <div>
                  <Label>LinkedIn URL</Label>
                  <Input
                    value={member.linkedin_url || ''}
                    onChange={(e) => {
                      const updated = members.map(m =>
                        m.id === member.id ? { ...m, linkedin_url: e.target.value } : m
                      );
                      setMembers(updated);
                    }}
                  />
                </div>
                <Button onClick={() => updateMember(member)}>Save Changes</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
