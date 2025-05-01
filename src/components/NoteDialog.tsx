
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: { id?: string; title: string; content: string; isPinned: boolean }) => void;
  note?: {
    id: string;
    title: string;
    content: string;
    isPinned: boolean;
  };
}

const NoteDialog: React.FC<NoteDialogProps> = ({ isOpen, onClose, onSave, note }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const isEditing = !!note?.id;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setIsPinned(note.isPinned);
    } else {
      setTitle('');
      setContent('');
      setIsPinned(false);
    }
  }, [note, isOpen]);

  const handleSave = () => {
    // Prevent saving empty notes
    if (!title.trim() && !content.trim()) {
      onClose();
      return;
    }
    
    onSave({
      id: note?.id,
      title: title.trim(),
      content: content.trim(),
      isPinned
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Note' : 'New Note'}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-grow"
            />
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full",
                isPinned && "text-note bg-primary/10"
              )}
              onClick={() => setIsPinned(!isPinned)}
            >
              <Pin className="h-4 w-4" />
              <span className="sr-only">Toggle pin</span>
            </Button>
          </div>
          
          <Textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] resize-none"
          />
        </div>
        
        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{isEditing ? 'Save Changes' : 'Save Note'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
