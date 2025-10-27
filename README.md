# LinkHub
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://link-hubo.netlify.app)

LinkHub is a minimalist and elegant "link-in-bio" SaaS application designed for content creators, professionals, and brands to consolidate their online presence into a single, shareable link.

This project was built as a full-stack personal challenge to create a complete SaaS application from scratch, demonstrating skills in modern web development, database management, and user authentication.

## Features

LinkHub provides a clean and intuitive user experience with all the essential features for a link-in-bio service.

* **User Authentication:** Secure sign-up and login functionality handled by Supabase Auth.
* **User Dashboard:** A central hub for users to manage their profile and links after logging in.
* **Profile Customization:** Users can update their full name and upload a custom profile picture (avatar). Avatars can be uploaded files or external URLs.
* **Link Management:** Easily add, edit, and delete an unlimited number of links with titles and URLs.
* **Public Profile Page:** A unique, shareable public URL (`/username`) that displays the user's avatar, name, and list of links for visitors.
* **Pro Tier (Concept):** The application is built with a "Pro" tier concept, featuring UI elements and modals to upsell users to a paid plan for features like advanced analytics, custom themes, and custom domains.

---

## Tech Stack

This project was built using a modern, full-stack tech stack chosen for its excellent developer experience and performance.

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Backend & Database:** [Supabase](https://supabase.io/) (Handles user auth, database, and file storage for avatars)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
---

## Getting Started

To run this project locally, you will need to set up a Supabase project and configure your local environment.

### Prerequisites

1.  **Node.js** (v20 or later recommended)
2.  **npm** or **yarn**
3.  **A Supabase Project:**
    * Create a new project on [Supabase](https://supabase.com/).
    * In your Supabase project, you will need to create:
        * A `profiles` table (to store `username`, `full_name`, `avatar_url`, linked to `auth.users`).
        * A `links` table (to store `title`, `url`, and a `user_id` foreign key).
        * A Supabase Storage bucket named `avatars` (set it to public).
    * Find your **Project URL** and **`anon` Public Key** in your project's API settings.

### Local Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/meiko-mlgr/linkhub.git
    cd linkhub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### Contact Information

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mikko_Melgar-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mikko-melgar-447069233)
[![Email](https://img.shields.io/badge/Email-Contact%20Me-red?style=for-the-badge&logo=gmail)](mailto:springleaked@gmail.com)
