
# OpportunityHub 

### Student Opportunity & Application Tracker

OpportunityHub is a web-based platform designed to help college students discover, save, and manage various opportunities in one place.

Students often find internships, hackathons, scholarships, workshops, and other opportunities through different websites and social media platforms. Keeping track of these opportunities, application links, and deadlines can become difficult.

OpportunityHub aims to simplify this process by providing a centralized platform where students can explore opportunities and track their application progress.

##  Features

- **Login Page:** Simple demo login to access the platform.
- **Home Page:** Get an overview of featured opportunities.
- **Explore Opportunities:** Browse and search opportunities by category.
- **Dashboard:** View a summary of saved opportunities, applications, and upcoming deadlines.
- **Saved Opportunities:** Bookmark opportunities and access them later.
- **Application Tracker:** Track application progress using different statuses.
- **Opportunity Details:** View descriptions, eligibility, deadlines, and other information.
- **My Profile:** Add and manage basic profile information.
- **Data Persistence:** Save profile details, bookmarks, and application status using browser local storage.

## Technologies Used

- Next.js
- React.js
- JavaScript
- Tailwind CSS
- HTML
- CSS
- Browser Local Storage
- Session Storage

##  Project Structure

```text
opportunity-hub/
│
├── app/
│   ├── dashboard/
│   ├── explore/
│   ├── applications/
│   ├── saved/
│   ├── login/
│   ├── profile/
│   ├── opportunity/
│   ├── page.js
│   ├── layout.js
│   └── globals.css
│
├── components/
├── context/
│   └── OpportunityContext.js
│
├── data/
│   └── opportunities.js
│
├── public/
├── package.json
└── README.md
```

##  Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- Visual Studio Code (recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AVANI543/OpportunityHub.git
```

2. Navigate to the project directory:

```bash
cd OpportunityHub
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit:

```text
http://localhost:3000
```

##  Demo Login

The project currently uses a frontend-only demo login system.

- Enter a valid-looking email address.
- Enter any non-empty password.
- Access the platform after logging in.

No actual password or authentication service is used.

##  Project Limitations

- This is a frontend-only project.
- No backend or database is currently integrated.
- Login is implemented for demonstration purposes only.
- User data is stored locally in the browser.
- Sample opportunity data is used for demonstration.
- Application links in the sample data are placeholders.

##  Future Enhancements

- Backend and database integration.
- Secure user authentication.
- Real-time opportunity updates.
- Email notifications for upcoming deadlines.
- Personalized opportunity recommendations.

##  Team

Developed as a college project by a team of two students.

---

**OpportunityHub: Discover opportunities. Stay organized. Track your progress.**
