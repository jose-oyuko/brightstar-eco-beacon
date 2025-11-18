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

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  };

  const updatePost = async (post: any) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        status: post.status
      })
      .eq('id', post.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Post updated successfully' });
    }
  };

  const addPost = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        title: 'New Blog Post',
        slug: 'new-post-' + Date.now(),
        status: 'draft'
      }])
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setPosts([data, ...posts]);
      toast({ title: 'Post created successfully' });
    }
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setPosts(posts.filter(p => p.id !== id));
      toast({ title: 'Post deleted successfully' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Blog Management</h1>
          <Button onClick={addPost}>
            <Plus className="w-4 h-4 mr-2" />
            Add Post
          </Button>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{post.title}</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={post.title}
                      onChange={(e) => {
                        const updated = posts.map(p =>
                          p.id === post.id ? { ...p, title: e.target.value } : p
                        );
                        setPosts(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input
                      value={post.slug}
                      onChange={(e) => {
                        const updated = posts.map(p =>
                          p.id === post.id ? { ...p, slug: e.target.value } : p
                        );
                        setPosts(updated);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label>Excerpt</Label>
                  <Textarea
                    value={post.excerpt || ''}
                    onChange={(e) => {
                      const updated = posts.map(p =>
                        p.id === post.id ? { ...p, excerpt: e.target.value } : p
                      );
                      setPosts(updated);
                    }}
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea
                    value={post.content || ''}
                    onChange={(e) => {
                      const updated = posts.map(p =>
                        p.id === post.id ? { ...p, content: e.target.value } : p
                      );
                      setPosts(updated);
                    }}
                    rows={6}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={post.status}
                    onValueChange={(value) => {
                      const updated = posts.map(p =>
                        p.id === post.id ? { ...p, status: value } : p
                      );
                      setPosts(updated);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => updatePost(post)}>Save Changes</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
