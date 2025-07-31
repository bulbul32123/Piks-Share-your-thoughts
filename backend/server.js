const { connectToDB } = require('./db/ConnectToDB');
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/auth');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

connectToDB();
const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));        
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory at:', uploadsDir);
}


app.use('/api/auth', authRoutes);

app.get('/api/users', (req, res) => {
    return res.json([
        {
            id: 1,
            author: 'John Doe',
            profilePic: '/user4.jpg',
            likes: 100,
            mood: "Feeling 😊 Excited",
            comments: 10,
            postimg: "/postimg1.jpeg",
            content: `⚡ Why TypeScript Matters in Modern Web Development

TypeScript is more than just a trend—it's a game-changer for web developers. 
Here’s why:

🔹 1. Better Code Quality
TypeScript’s static typing catches errors during development, making your code more 
reliable and 
maintainable.

🔹 2. Improved Developer Experience
With auto-completion, navigation, and refactoring tools, TypeScript makes writing code 
smoother
and faster.

🔹 3. Scalable Applications
Large codebases become easier to manage with TypeScript’s strong typing and structured approach.

🔹 4. Seamless JavaScript Integration
TypeScript is a superset of JavaScript, meaning you can adopt it gradually in existing projects.

🔹 5. Growing Industry Demand
Major frameworks like Next.js, Angular, and NestJS prefer TypeScript, making it a valuable 
skill in 
the job market.

💬 Are you using TypeScript in your projects? Share your thoughts below! 👇

hashtag#TypeScript hashtag#JavaScript hashtag#WebDevelopment hashtag#Coding 
hashtag#Programming hashtag#Fullstack hashtag#Nextjs hashtag#Developers`,
            date: '12 February at 12:00 PM',
        },
        {
            id: 2,
            author: 'Mickael',
            content: `Next.js is a very popular React.js framework for frontend developers. So it is very
important to learn it consistently from basic to advanced level. Recently, 
a YouTube channel called 
Codevolution has released a Next.js Crash Course from basic to advanced level.

I personally recommend this course to everyone and I have watched more than 50 
videos
myself, which is really amazing. Thank you very much dear Vishwas 
Sir—congratulations to you at the same time, keep going!

Course:https://lnkd.in/gXjSHN6n

Here's a quick rundown of what's worth knowing about Next.js:

1. Basic
- What is Next.js and why do I need it?
- Next.js setup and creating a project
- Learning folder structure
- Page routing (Pages & Routing)
- Link management (next/link & next/router)
- Static file management (Public Folder)

2. SSG & SSR
- Static site generation (getStaticProps & getStaticPaths)
- Server-side rendering (getServerSideProps)
- Incremental Static Regeneration (ISR)

3. App Router & API Routes
- App Router (Next.js 15+ - app directory)
- API Routes (Creating Backend API)
- Concepts of using Middleware

4. Styling & UI
- CSS Modules & Global CSS
- Tailwind CSS or Styled Components
- Libraries like Material UI, Chakra UI etc.

5. Data Fetching and State Management
- Client-side data fetching (useEffect, SWR, React Query)
- Concepts of using Context API, Redux, Zustand

6. Authentication & Authorization
- Authentication using NextAuth.js
- JWT (JSON Web Token) Authentication
- Protected Routes creation using Middleware

7. Database & Backend Integration
- MongoDB, PostgreSQL, MySQL integration
- Prisma ORM concepts usage
- Edge Functions & Server Actions

8. Performance Optimization
- next/image Image Optimization
- Caching & Lazy Loading
- Code Splitting & Dynamic Imports

9. Deployment
- Vercel Deployment of Next.js Project
- Docker & Custom Server Deployment

10. Advanced Topics
- Internationalization (i18n)
- Middleware & Edge Functions
- AI/ML Integration (LangChain, OpenAI API)
- Payment Gateway (Stripe, PayPal) Integration`,
            profilePic: '/user6.jpg',
            date: "1 February at 1:00 AM",
            likes: 560,
            color: "#E9F3FF",
            comments: 40,
            postimg: "/postimg4.jpeg",
            mood: "Feeling 🎉 Excited ",
        },
        {
            id: 3,
            author: 'Mitu Akter',
            content: 'Life of a Programmer',
            profilePic: '/user3.jpg',
            color: "#E8F5E9",
            date: "1 January at 3:00 PM",
            likes: 660,
            mood: "Feeling 😌 Calm",
            comments: 80,
            postimg: "/postimg2.jpg",
        },
        {
            id: 4,
            author: 'Rana',
            content: 'Life',
            profilePic: '/user7.jpg',
            color: "#FFEBEE",
            date: "24 January at 8:00 PM",
            likes: 994,
            comments: 450,
            mood: "Feeling ❤️ Love",
            postimg: "/postimg3.jpg",
        },
        {
            id: 5,
            author: 'Yohanna',
            content: 'Problems',
            profilePic: '/user4.jpg',
            date: "15 January at 3:00 AM",
            likes: 494,
            mood: "Feeling 😨 Fearful",
            comments: 89,
            color: "#2C3E50",
            postimg: "/postimg5.jpg",
        },
    ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});