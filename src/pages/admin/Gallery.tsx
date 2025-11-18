import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase.from('gallery_images').select('*').order('order_position');
    if (data) setImages(data);
    setLoading(false);
  };

  const updateImage = async (image: any) => {
    const { error } = await supabase
      .from('gallery_images')
      .update({ title: image.title, description: image.description, category: image.category })
      .eq('id', image.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Image updated successfully' });
    }
  };

  const addImage = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .insert([{
        title: 'New Image',
        image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
        category: 'general'
      }])
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setImages([...images, data]);
      toast({ title: 'Image added successfully' });
    }
  };

  const deleteImage = async (id: string) => {
    const { error } = await supabase.from('gallery_images').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setImages(images.filter(img => img.id !== id));
      toast({ title: 'Image deleted successfully' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Gallery Management</h1>
          <Button onClick={addImage}>
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{image.title}</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => deleteImage(image.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <img src={image.image_url} alt={image.title} className="w-full h-48 object-cover rounded-lg" />
                <div>
                  <Label>Title</Label>
                  <Input
                    value={image.title}
                    onChange={(e) => {
                      const updated = images.map(img =>
                        img.id === image.id ? { ...img, title: e.target.value } : img
                      );
                      setImages(updated);
                    }}
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input
                    value={image.category || ''}
                    onChange={(e) => {
                      const updated = images.map(img =>
                        img.id === image.id ? { ...img, category: e.target.value } : img
                      );
                      setImages(updated);
                    }}
                  />
                </div>
                <Button onClick={() => updateImage(image)} className="w-full">Save</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
