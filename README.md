# Fetch Dog Adoption

Built with [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/).

## [View the Live Demo 🐕](https://adopt-pups.netlify.app/)

## Features

- Search for dogs and filter by breed, location, and age range
- Sort results by breed, age, or name
- Add dogs to your favorites, saved to browser local storage
- Generate a perfect match based on your favorites

## Note from the dev

I added a few unit tests, which use Jest and React Testing Library. While I did not have time to implement 100% coverage, the idea of adding unit tests was to demonstrate my testing philosophy and general approach to testing. You can check out the following examples here:

- [DogCard.test.tsx](https://github.com/crbilladeau/fetch-dog-adoption/blob/master/src/authenticated-routes/SearchDashboard/DogsList/components/__tests__/DogCard.test.tsx)
- [FavoritesContext.test.tsx](https://github.com/crbilladeau/fetch-dog-adoption/blob/master/src/context/__tests__/FavoritesContext.test.tsx)
- [useFetchBreeds.test.ts](https://github.com/crbilladeau/fetch-dog-adoption/blob/master/src/hooks/fetchers/__tests__/useFetchBreeds.test.ts)
- [Login.test.tsx](https://github.com/crbilladeau/fetch-dog-adoption/blob/master/src/unauthenticated-routes/Login/__tests__/Login.test.tsx)
- [LoginForm.test.tsx](https://github.com/crbilladeau/fetch-dog-adoption/blob/master/src/unauthenticated-routes/Login/__tests__/LoginForm.test.tsx)

## Getting Started

1. Clone the repository `git clone https://github.com/charliebilladeau/fetch-dog-adoption.git`
2. Install dependencies with `npm install` or `yarn`
3. Start the development server with `npm run dev` or `yarn dev`
4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the application
