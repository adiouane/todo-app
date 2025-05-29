# Todo Application

A modern todo application built with Next.js, TypeScript, and Redux.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Batch operations (delete completed, mark all as complete/incomplete)
- Search functionality for finding specific tasks
- Sorting functionality (by date, title, completion status)
- Responsive design for mobile, tablet, and desktop
- Dark/light mode toggle

## Tech Stack

- **Next.js**: React framework for building the application
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Redux Toolkit**: State management
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **React Query**: Data fetching and caching
- **next-themes**: Theme management

## Setup and Installation

1. Clone the repository
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Project Structure

```
todo-app/
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   │   ├── layout/     # Layout components
│   │   ├── todos/      # Todo-specific components
│   │   └── ui/         # Reusable UI components
│   ├── lib/            # Utility functions and helpers
│   │   ├── utils/      # General utilities
│   │   └── validators/ # Zod schemas for validation
│   ├── redux/          # Redux store and slices
│   │   └── features/   # Redux slices
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using semantic commit messages
   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation only changes
   - `style`: Changes that do not affect the meaning of the code
   - `refactor`: A code change that neither fixes a bug nor adds a feature
   - `test`: Adding missing tests or correcting existing tests
   - `chore`: Changes to the build process or auxiliary tools
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
# todo-app
# todo-app
