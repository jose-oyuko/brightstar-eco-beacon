import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*').single();
    if (data) setSettings(data);
    setLoading(false);
  };

  const updateSettings = async () => {
    const { error } = await supabase
      .from('site_settings')
      .update({
        site_name: settings.site_name,
        tagline: settings.tagline,
        description: settings.description,
        contact_email: settings.contact_email,
        contact_phone: settings.contact_phone,
        contact_address: settings.contact_address,
        facebook_url: settings.facebook_url,
        twitter_url: settings.twitter_url,
        instagram_url: settings.instagram_url,
        linkedin_url: settings.linkedin_url
      })
      .eq('id', settings.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Settings updated successfully' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Site Settings</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Site Name</Label>
                <Input
                  value={settings?.site_name || ''}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Tagline</Label>
                <Input
                  value={settings?.tagline || ''}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={settings?.description || ''}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  value={settings?.contact_email || ''}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={settings?.contact_phone || ''}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Textarea
                  value={settings?.contact_address || ''}
                  onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Facebook</Label>
                <Input
                  value={settings?.facebook_url || ''}
                  onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                />
              </div>
              <div>
                <Label>Twitter</Label>
                <Input
                  value={settings?.twitter_url || ''}
                  onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                />
              </div>
              <div>
                <Label>Instagram</Label>
                <Input
                  value={settings?.instagram_url || ''}
                  onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={settings?.linkedin_url || ''}
                  onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={updateSettings}>Save All Settings</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
