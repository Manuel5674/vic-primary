
// Types for school-related data structures used in the application
export type CategoryType = 'News' | 'Event' | 'Alert';
export type IconType = 'Star' | 'Heart' | 'Users' | 'Zap' | 'Book' | 'Trophy' | 'Trees' | 'Baby' | 'UserPlus' | 'CreditCard' | 'GraduationCap';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: CategoryType;
  image: string;
}

export interface SchoolValue {
  title: string;
  description: string;
  icon: IconType;
}

export interface TourLocation {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: IconType;
  features: string[];
}

// Parent Portal Types
export interface Student {
  id: string;
  name: string;
  grade: string;
  dob: string;
  photo?: string;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  term: string;
  year: string;
  results: {
    subject: string;
    score: number;
    grade: string;
    comment: string;
  }[];
}

export interface FeeRecord {
  id: string;
  studentId: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Application {
  id: string;
  childName: string;
  gradeApplyingFor: string;
  status: 'Under Review' | 'Accepted' | 'Declined' | 'Action Required';
  dateSubmitted: string;
}
