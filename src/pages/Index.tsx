import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import NoteCard from '@/components/NoteCard';
import NoteDialog from '@/components/NoteDialog';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider } from '@/hooks/use-theme';
import useLocalStorage from '@/hooks/use-local-storage';
import type { Note } from '@/types/note';
const Index = () => {
  // State for notes management
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Handle opening the dialog for creating a new note
  const handleNewNote = () => {
    setEditingNote(null);
    setIsDialogOpen(true);
  };

  // Handle opening the dialog for editing an existing note
  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find(note => note.id === id);
    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setIsDialogOpen(true);
    }
  };

  // Handle saving a new or edited note
  const handleSaveNote = (noteData: {
    id?: string;
    title: string;
    content: string;
    isPinned: boolean;
  }) => {
    const now = new Date();
    if (noteData.id) {
      // Editing an existing note
      setNotes(notes.map(note => note.id === noteData.id ? {
        ...note,
        title: noteData.title,
        content: noteData.content,
        isPinned: noteData.isPinned,
        updatedAt: now
      } : note));
      toast.success('Note updated!');
    } else {
      // Creating a new note
      const newNote: Note = {
        id: uuidv4(),
        title: noteData.title,
        content: noteData.content,
        isPinned: noteData.isPinned,
        createdAt: now,
        updatedAt: now
      };
      setNotes([newNote, ...notes]);
      toast.success('Note created!');
    }
  };

  // Handle deleting a note
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success('Note deleted!');
  };

  // Handle toggling a note's pinned status
  const handleTogglePin = (id: string) => {
    setNotes(notes.map(note => note.id === id ? {
      ...note,
      isPinned: !note.isPinned
    } : note));
    const note = notes.find(note => note.id === id);
    toast.success(note?.isPinned ? 'Note unpinned' : 'Note pinned!');
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter(note => {
    const term = searchTerm.toLowerCase();
    return note.title.toLowerCase().includes(term) || note.content.toLowerCase().includes(term);
  });

  // Sort notes: pinned first, then by updatedAt (newest first)
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    // First sort by pinned status
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    // Then sort by date (newest first)
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // Group notes by pinned status for rendering
  const pinnedNotes = sortedNotes.filter(note => note.isPinned);
  const unpinnedNotes = sortedNotes.filter(note => !note.isPinned);
  return <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col bg-background p-4 md:p-6">
        {/* Header with app title, search bar and theme toggle */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">BYTENOTE</h1>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:w-1/2">
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Action button to create new note */}
        <div className="mb-6">
          <Button onClick={handleNewNote} className="bg-note hover:bg-note-hover">
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>

        {/* Notes display section */}
        <div className="flex-1">
          {sortedNotes.length === 0 ? <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-muted-foreground mb-4">No notes yet. Create one to get started!</p>
              <Button onClick={handleNewNote} className="bg-note hover:bg-note-hover">
                <Plus className="h-4 w-4 mr-2" />
                Create First Note
              </Button>
            </div> : <>
              {/* Display pinned notes if any */}
              {pinnedNotes.length > 0 && <div className="mb-8">
                  <h2 className="text-sm uppercase font-medium text-muted-foreground mb-3">Pinned Notes</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {pinnedNotes.map(note => <NoteCard key={note.id} id={note.id} title={note.title} content={note.content} isPinned={note.isPinned} createdAt={new Date(note.createdAt)} onEdit={handleEditNote} onDelete={handleDeleteNote} onTogglePin={handleTogglePin} />)}
                  </div>
                </div>}

              {/* Display unpinned notes */}
              {unpinnedNotes.length > 0 && <div>
                  {pinnedNotes.length > 0 && <h2 className="text-sm uppercase font-medium text-muted-foreground mb-3">Other Notes</h2>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {unpinnedNotes.map(note => <NoteCard key={note.id} id={note.id} title={note.title} content={note.content} isPinned={note.isPinned} createdAt={new Date(note.createdAt)} onEdit={handleEditNote} onDelete={handleDeleteNote} onTogglePin={handleTogglePin} />)}
                  </div>
                </div>}
            </>}
        </div>

        {/* Note edit/create dialog */}
        <NoteDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSave={handleSaveNote} note={editingNote || undefined} />
      </div>
    </ThemeProvider>;
};
export default Index;