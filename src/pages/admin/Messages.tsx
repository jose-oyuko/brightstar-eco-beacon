import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, MailOpen, Archive } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: 'new' | 'read' | 'responded' | 'archived') => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setMessages(messages.map(m => m.id === id ? { ...m, status } : m));
      toast({ title: 'Message status updated' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Contact Messages</h1>

        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {message.status === 'new' ? <Mail className="w-5 h-5 text-primary" /> : <MailOpen className="w-5 h-5 text-muted-foreground" />}
                    <div>
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                  </div>
                  <Badge variant={message.status === 'new' ? 'default' : 'secondary'}>
                    {message.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {message.subject && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Subject</p>
                    <p className="font-medium">{message.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Message</p>
                  <p className="text-sm">{message.message}</p>
                </div>
                {message.phone && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Phone</p>
                    <p className="text-sm">{message.phone}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  {message.status === 'new' && (
                    <Button size="sm" onClick={() => updateStatus(message.id, 'read')}>
                      Mark as Read
                    </Button>
                  )}
                  {message.status !== 'responded' && (
                    <Button size="sm" variant="secondary" onClick={() => updateStatus(message.id, 'responded')}>
                      Mark as Responded
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => updateStatus(message.id, 'archived')}>
                    <Archive className="w-4 h-4 mr-1" />
                    Archive
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Received: {new Date(message.created_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
