**Project Overview**

This project is a React-based User Management Dashboard that interacts with the JSONPlaceholder API
 to fetch, display, and manage users.

Features include:

Fetching users from API and mapping their details

Adding, editing, and deleting users

Sorting and filtering functionality

Pagination with dynamic items per page

Error handling with clear messages

Support for local users (users added manually are managed locally without API calls)

⚙️ Setup Instructions

Clone the Repository

git clone https://github.com/NadiaHafsa/User-Management-Dashboard.git
cd User-Management-Dashboard


Install Dependencies
Make sure you have Node.js (>=16) installed. Then run:

npm install


Start Development Server

npm run dev


This starts the app on http://localhost:3000


▶️ Run Instructions
Development Mode
npm run dev

Production Build
npm run build
npm run preview

🌍 Deployed Link

 https://nadiahafsa.github.io/User-Management-Dashboard/



📝 Reflections
🔹 What Went Well

Successfully integrated API data with React state management.

Implemented a clean separation of concerns across components (UserForm, UserTable, Pagination, FilterPopup).

Added robust error handling and user feedback.

Solved the challenge of differentiating API users vs. locally created users (preventing update/delete errors).

🔹 Challenges Faced

JSONPlaceholder doesn’t actually persist changes, so updates/deletes had to be simulated locally.

Ensuring pagination, filtering, and sorting all worked together required careful state management.

🔹 Key Learnings

Handling real API users vs. local state users is a common real-world challenge.

Importance of error handling and fallback logic when APIs don’t support all CRUD operations.

Designing reusable UI components (FilterPopup, Pagination) improves maintainability.

🔹 Next Steps / Improvements

Add authentication (e.g., login with JWT).

Connect with a real backend API that supports full CRUD.

Write unit tests for core logic (filtering, sorting, pagination).
