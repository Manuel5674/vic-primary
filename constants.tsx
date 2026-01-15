
import { NewsItem, TourLocation, Student, AcademicRecord, FeeRecord, Application } from './types';

// School branding and identity constants
export const SCHOOL_NAME = "Victoria Primary School";
export const TAGLINE = "Where Every Child Shines Brightly.";
// Note: Use your actual logo path here. For this demo, we'll use the concept of your uploaded crest.
export const SCHOOL_LOGO = "https://images.unsplash.com/photo-1614031679232-0dae78087705?auto=format&fit=crop&q=80&w=200"; 

// System instruction for the AI assistant
export const SCHOOL_INFO_PROMPT = `
You are the AI Assistant for Victoria Primary School (VPS). 
Our motto is "Equal Opportunities for All".
The school is located in Victoria District. 
The Headteacher is Mrs. Sarah Kensington.
Our values are Excellence, Kindness, and Community.
School hours are 8:30 AM to 3:15 PM.
We offer a range of clubs including Chess, Football, Choir, and Coding.
Term dates: Autumn (Sept-Dec), Spring (Jan-Mar), Summer (Apr-July).
Uniform: Navy blue blazer/jumper, sky blue shirt, grey trousers/skirt.

VIRTUAL TOUR INFO:
We have a virtual tour on our website. Key locations include: STEAM Lab, The Hub (Library), Forest School, Sports Field, and Early Years Village.

PARENT PORTAL INFO:
Parents can now use our digital portal to:
1. Apply for new admissions for their children.
2. Monitor academic results and term reports.
3. View fee structures, pending balances, and payment history.
4. Update child information and emergency contacts.

You should be friendly, encouraging, and helpful. If you don't know an answer about a specific person, kindly ask the user to contact the front office at office@victoria-primary.edu.
`;

// Core school values data
export const SCHOOL_VALUES = [
  { title: "Excellence", description: "We strive for our personal best in everything we do.", icon: "Star" },
  { title: "Kindness", description: "We treat others with respect, empathy, and care.", icon: "Heart" },
  { title: "Community", description: "We work together to create a supportive environment for all students.", icon: "Users" }
] as const;

// Virtual Tour Locations
export const TOUR_LOCATIONS: TourLocation[] = [
  {
    id: 'steam-lab',
    title: "The STEAM Lab",
    description: "Our cutting-edge center for Science, Technology, Engineering, Arts, and Mathematics.",
    image: "https://images.unsplash.com/photo-1564410267841-915d8f4d71ea?auto=format&fit=crop&q=80&w=1000",
    icon: "Zap",
    features: ["3D Printing Stations", "Robotics Kits", "Interactive Smart Boards", "Digital Microscopes"]
  },
  {
    id: 'the-hub',
    title: "The Hub Library",
    description: "A sanctuary for readers with a curated collection of over 5,000 titles.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000",
    icon: "Book",
    features: ["Quiet Reading Zones", "Digital E-reader Station", "Storytelling Pit", "Weekly Book Club"]
  },
  {
    id: 'forest-school',
    title: "Forest School",
    description: "Outdoor education where students learn through nature and exploration.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000",
    icon: "Trees",
    features: ["Outdoor Fire Pit", "Wildlife Pond", "Sensory Garden", "Survival Skills Area"]
  },
  {
    id: 'sports-field',
    title: "The Arena",
    description: "Spacious multi-use sports fields for athletics, football, and team games.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000",
    icon: "Trophy",
    features: ["400m Athletics Track", "3G Football Pitch", "Tennis Courts", "Pavilion"]
  },
  {
    id: 'early-years',
    title: "Early Years Village",
    description: "A safe and stimulating environment tailored specifically for our youngest learners.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000",
    icon: "Baby",
    features: ["Soft Play Area", "Miniature Garden", "Creative Arts Studio", "Nap & Quiet Zone"]
  }
];

// Mock Parent Portal Data
export const MOCK_STUDENTS: Student[] = [
  { id: 'S001', name: 'Oliver Smith', grade: 'Year 4', dob: '2014-05-12', photo: 'https://i.pravatar.cc/150?u=S001' },
  { id: 'S002', name: 'Emma Smith', grade: 'Year 1', dob: '2018-09-22', photo: 'https://i.pravatar.cc/150?u=S002' }
];

export const MOCK_ACADEMIC_RECORDS: AcademicRecord[] = [
  {
    id: 'R001',
    studentId: 'S001',
    term: 'Spring',
    year: '2024',
    results: [
      { subject: 'Mathematics', score: 92, grade: 'A*', comment: 'Exceptional problem-solving skills.' },
      { subject: 'English', score: 85, grade: 'A', comment: 'Strong creative writing and reading comprehension.' },
      { subject: 'Science', score: 88, grade: 'A', comment: 'Great curiosity during experiments.' }
    ]
  },
  {
    id: 'R002',
    studentId: 'S002',
    term: 'Spring',
    year: '2024',
    results: [
      { subject: 'Reading', score: 95, grade: 'A*', comment: 'Advanced reading level for her age.' },
      { subject: 'Creative Arts', score: 90, grade: 'A', comment: 'Shows great imagination in painting.' },
      { subject: 'Physical Ed', score: 82, grade: 'B', comment: 'Very active and team-oriented.' }
    ]
  }
];

export const MOCK_FEES: FeeRecord[] = [
  { id: 'F001', studentId: 'S001', description: 'Spring Term Tuition', amount: 1250, dueDate: '2024-01-15', status: 'Paid' },
  { id: 'F002', studentId: 'S001', description: 'Music Club Fee', amount: 150, dueDate: '2024-02-01', status: 'Pending' },
  { id: 'F003', studentId: 'S002', description: 'Spring Term Tuition', amount: 1250, dueDate: '2024-01-15', status: 'Paid' },
  { id: 'F004', studentId: 'S002', description: 'School Lunch (Monthly)', amount: 80, dueDate: '2024-03-01', status: 'Overdue' }
];

export const MOCK_APPLICATIONS: Application[] = [
  { id: 'A001', childName: 'Noah Smith', gradeApplyingFor: 'Early Years', status: 'Under Review', dateSubmitted: '2024-02-10' }
];

export const NEWS_ITEMS: NewsItem[] = [
  { 
    id: '1', 
    title: "Sports Day 2024 Winners!", 
    excerpt: "The Golden Eagles take the trophy!", 
    content: "It was a day filled with incredible energy and sportsmanship. Students from all year groups participated in various events including the 100m sprint, long jump, and the ever-popular relay races.",
    date: "Oct 12, 2024", 
    category: "Event", 
    image: "https://picsum.photos/seed/sports/800/600" 
  },
  { 
    id: '2', 
    title: "New Science Lab", 
    excerpt: "STEAM lab is now open.", 
    content: "We are thrilled to announce that our state-of-the-art Science and Technology (STEAM) lab is officially open for classes.",
    date: "Oct 10, 2024", 
    category: "News", 
    image: "https://picsum.photos/seed/science/800/600" 
  },
  { 
    id: '3', 
    title: "Parent Meetings", 
    excerpt: "Booking open now.", 
    content: "Our termly parent-teacher meetings are scheduled for the week of November 5th. Bookings can now be made through our online portal.",
    date: "Oct 08, 2024", 
    category: "Alert", 
    image: "https://picsum.photos/seed/meeting/800/600" 
  }
];
