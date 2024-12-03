# Form Builder Application

A dynamic form builder application that allows users to create, preview, and export custom forms through a drag-and-drop interface.

## Features

- Drag-and-drop form builder interface
- Live form preview https://form-builder-inky-eta.vercel.app/
- Support for multiple form components (text, select, radio, checkbox, textarea)
- Form validation
- Schema export functionality

## Technology Stack

### Core Technologies

- **React + TypeScript**: Chosen for type safety, better developer experience, and robust ecosystem
- **Vite**: Modern build tool offering faster development experience and optimized builds
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality, accessible React components built with Radix UI and Tailwind

### Key Libraries

- **react-hook-form**: Form state management and validation
- **zod**: Runtime type checking and validation
- **sonner**: Toast notifications
- **lucide-react**: Modern icon set

## Setup Instructions

1. **Prerequisites**

   - Node.js (v16 or higher)
   - npm or yarn package manager

2. **Installation**

   ```bash
   # Clone the repository
   git clone <repository-url>

   # Navigate to project directory
   cd form-builder

   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

3. **Development**
   - The application will be available at `http://localhost:8080`
   - Changes will hot-reload automatically

## Known Limitations & Trade-offs

1. **Form Component Limitations**

   - Limited to basic form components (text, select, radio, checkbox, textarea)
   - No support for nested form structures
   - No custom validation rules

2. **State Management**

   - Uses React's built-in state management
   - May need to switch to more robust solutions (Redux, Zustand) for larger applications

3. **Export Functionality**
   - Exports to JSON format only
   - No import functionality yet
   - Limited styling options in exported schema

## Future Improvements

1. **Enhanced Form Components**

   - Add support for file uploads
   - Implement date/time pickers
   - Add rich text editor component
   - Support for nested form groups

2. **Validation & Logic**

   - Add custom validation rules
   - Implement conditional form logic
   - Add form submission endpoints

3. **User Experience**

   - Add undo/redo functionality
   - Implement form templates
   - Add form preview in different device sizes
   - Add form analytics

4. **Data Management**

   - Add form data persistence
   - Implement form version control
   - Add form sharing capabilities

5. **Styling & Customization**
   - Add theme customization
   - Implement custom CSS injection
   - Add more layout options
