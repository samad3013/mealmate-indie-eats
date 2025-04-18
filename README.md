
# Cook Booking Platform

A platform that connects users with professional cooks for personalized dining experiences. The platform includes both customer and cook interfaces, along with an admin dashboard for monitoring and managing the platform.

## Features

- User Authentication (Customers, Cooks, Admins)
- Profile Management
- Meal Listings and Management
- Booking System
- Admin Dashboard with Analytics
- Real-time Data Visualization

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cook-booking-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── context/       # React context providers
├── lib/          # Utility functions
└── integrations/ # External service integrations
```

## Admin Access

To access the admin dashboard:
1. Log in with admin credentials
2. Navigate to '/admin' or click the Admin Dashboard link in the profile menu
3. Access analytics at '/admin/analytics'

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Built With

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase
- Tanstack Query
- Recharts
- Lucide Icons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
