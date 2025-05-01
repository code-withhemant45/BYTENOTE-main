# ByteNote

A modern note-taking application built with React, TypeScript, and Supabase.

## 🚀 Features

- Modern and responsive UI built with React and Tailwind CSS
- Type-safe development with TypeScript
- Real-time data synchronization with Supabase
- Beautiful UI components using shadcn/ui
- Form handling with React Hook Form and Zod validation
- State management with React Query
- Routing with React Router DOM
- Dark mode support
- Responsive design for all devices

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Backend/Database:** Supabase
- **Form Handling:** React Hook Form + Zod
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Package Manager:** npm/bun

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd bytenote
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
# or
bun run dev
```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── integrations/  # Third-party service integrations
├── lib/          # Utility functions and configurations
├── pages/        # Page components
├── types/        # TypeScript type definitions
└── App.tsx       # Main application component
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 UI Components

The project uses shadcn/ui, which provides a collection of reusable components built with Radix UI and Tailwind CSS. These components are highly customizable and accessible.

## 🔒 Environment Variables

The following environment variables are required:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key


## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 