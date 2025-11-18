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

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false });
    if (data) setEvents(data);
    setLoading(false);
  };

  const updateEvent = async (event: any) => {
    const { error } = await supabase
      .from('events')
      .update({
        title: event.title,
        description: event.description,
        location: event.location,
        event_date: event.event_date,
        end_date: event.end_date,
        status: event.status,
        max_participants: event.max_participants,
        registration_link: event.registration_link
      })
      .eq('id', event.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Event updated successfully' });
    }
  };

  const addEvent = async () => {
    const { data, error } = await supabase
      .from('events')
      .insert([{
        title: 'New Event',
        event_date: new Date().toISOString(),
        status: 'upcoming'
      }])
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setEvents([data, ...events]);
      toast({ title: 'Event created successfully' });
    }
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      setEvents(events.filter(e => e.id !== id));
      toast({ title: 'Event deleted successfully' });
    }
  };

  if (loading) return <AdminLayout><div className="p-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Events Management</h1>
          <Button onClick={addEvent}>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>

        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{event.title}</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => deleteEvent(event.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={event.title}
                    onChange={(e) => {
                      const updated = events.map(ev =>
                        ev.id === event.id ? { ...ev, title: e.target.value } : ev
                      );
                      setEvents(updated);
                    }}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={event.description || ''}
                    onChange={(e) => {
                      const updated = events.map(ev =>
                        ev.id === event.id ? { ...ev, description: e.target.value } : ev
                      );
                      setEvents(updated);
                    }}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Event Date</Label>
                    <Input
                      type="datetime-local"
                      value={event.event_date?.slice(0, 16) || ''}
                      onChange={(e) => {
                        const updated = events.map(ev =>
                          ev.id === event.id ? { ...ev, event_date: e.target.value } : ev
                        );
                        setEvents(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label>End Date (Optional)</Label>
                    <Input
                      type="datetime-local"
                      value={event.end_date?.slice(0, 16) || ''}
                      onChange={(e) => {
                        const updated = events.map(ev =>
                          ev.id === event.id ? { ...ev, end_date: e.target.value } : ev
                        );
                        setEvents(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={event.status}
                      onValueChange={(value) => {
                        const updated = events.map(ev =>
                          ev.id === event.id ? { ...ev, status: value } : ev
                        );
                        setEvents(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={event.location || ''}
                      onChange={(e) => {
                        const updated = events.map(ev =>
                          ev.id === event.id ? { ...ev, location: e.target.value } : ev
                        );
                        setEvents(updated);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Registration Link</Label>
                    <Input
                      value={event.registration_link || ''}
                      onChange={(e) => {
                        const updated = events.map(ev =>
                          ev.id === event.id ? { ...ev, registration_link: e.target.value } : ev
                        );
                        setEvents(updated);
                      }}
                    />
                  </div>
                </div>
                <Button onClick={() => updateEvent(event)}>Save Changes</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
