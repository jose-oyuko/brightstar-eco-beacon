import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Content() {
  const [heroSection, setHeroSection] = useState<any>(null);
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const [hero, blocks] = await Promise.all([
      supabase.from('hero_sections').select('*').eq('page_slug', 'home').single(),
      supabase.from('content_blocks').select('*').order('order_position')
    ]);

    if (hero.data) setHeroSection(hero.data);
    if (blocks.data) setContentBlocks(blocks.data);
    setLoading(false);
  };

  const updateHero = async () => {
    const { error } = await supabase
      .from('hero_sections')
      .update({
        title: heroSection.title,
        subtitle: heroSection.subtitle,
        description: heroSection.description,
        cta_primary_text: heroSection.cta_primary_text,
        cta_primary_link: heroSection.cta_primary_link,
        cta_secondary_text: heroSection.cta_secondary_text,
        cta_secondary_link: heroSection.cta_secondary_link,
        background_image_url: heroSection.background_image_url
      })
      .eq('id', heroSection.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error updating hero section', description: error.message });
    } else {
      toast({ title: 'Hero section updated successfully' });
    }
  };

  const updateContentBlock = async (block: any) => {
    const { error } = await supabase
      .from('content_blocks')
      .update({ title: block.title, content: block.content })
      .eq('id', block.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error updating content block', description: error.message });
    } else {
      toast({ title: 'Content block updated successfully' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Content Management</h1>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="about">About Content</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={heroSection?.title || ''}
                    onChange={(e) => setHeroSection({ ...heroSection, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Subtitle</Label>
                  <Input
                    value={heroSection?.subtitle || ''}
                    onChange={(e) => setHeroSection({ ...heroSection, subtitle: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={heroSection?.description || ''}
                    onChange={(e) => setHeroSection({ ...heroSection, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Primary Button Text</Label>
                    <Input
                      value={heroSection?.cta_primary_text || ''}
                      onChange={(e) => setHeroSection({ ...heroSection, cta_primary_text: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Primary Button Link</Label>
                    <Input
                      value={heroSection?.cta_primary_link || ''}
                      onChange={(e) => setHeroSection({ ...heroSection, cta_primary_link: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Secondary Button Text</Label>
                    <Input
                      value={heroSection?.cta_secondary_text || ''}
                      onChange={(e) => setHeroSection({ ...heroSection, cta_secondary_text: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Secondary Button Link</Label>
                    <Input
                      value={heroSection?.cta_secondary_link || ''}
                      onChange={(e) => setHeroSection({ ...heroSection, cta_secondary_link: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={updateHero}>Save Hero Section</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <div className="space-y-4">
              {contentBlocks.map((block) => (
                <Card key={block.id}>
                  <CardHeader>
                    <CardTitle>{block.block_key}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={block.title}
                        onChange={(e) => {
                          const updated = contentBlocks.map(b => 
                            b.id === block.id ? { ...b, title: e.target.value } : b
                          );
                          setContentBlocks(updated);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={block.content || ''}
                        onChange={(e) => {
                          const updated = contentBlocks.map(b => 
                            b.id === block.id ? { ...b, content: e.target.value } : b
                          );
                          setContentBlocks(updated);
                        }}
                        rows={4}
                      />
                    </div>
                    <Button onClick={() => updateContentBlock(block)}>Save</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
