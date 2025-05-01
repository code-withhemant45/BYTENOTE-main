
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pin, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: Date;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  content,
  isPinned,
  createdAt,
  onEdit,
  onDelete,
  onTogglePin
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // Format the date
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div
      className={cn(
        "note-card p-4 flex flex-col h-full animate-fade-in",
        isPinned && "note-card-pinned"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium line-clamp-2">{title || 'Untitled'}</h3>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full",
            isPinned ? "text-note" : "text-muted-foreground",
            !isHovering && !isPinned && "opacity-0"
          )}
          onClick={() => onTogglePin(id)}
        >
          <Pin className="h-4 w-4" />
          <span className="sr-only">Pin note</span>
        </Button>
      </div>
      
      <div className="flex-grow mb-3">
        <p className="text-muted-foreground line-clamp-6 text-sm whitespace-pre-wrap">{content}</p>
      </div>
      
      <div className="flex justify-between items-center mt-auto pt-2 border-t">
        <span className="text-xs text-muted-foreground">
          {formatDate(createdAt)}
        </span>
        
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => onEdit(id)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit note</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-destructive"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete note</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
