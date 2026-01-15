import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Calendar, 
  BookOpen, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Star, 
  Heart, 
  Users,
  Instagram,
  Twitter,
  Facebook,
  Menu,
  X,
  Info,
  Newspaper,
  Mail,
  ListChecks,
  Sun,
  Moon,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  Search,
  SearchX,
  Camera,
  PlayCircle,
  Loader2,
  Zap,
  Book,
  Trophy,
  Trees,
  Baby,
  UserPlus,
  CreditCard,
  LineChart,
  LayoutDashboard,
  PlusCircle,
  Filter,
  Download,
  ArrowUpRight,
  FileText,
  User
} from 'lucide-react';
import AIAssistant from './components/AIAssistant';
import Section from './components/Section';
import { 
  SCHOOL_NAME, 
  TAGLINE, 
  SCHOOL_VALUES, 
  NEWS_ITEMS, 
  TOUR_LOCATIONS,
  MOCK_STUDENTS,
  MOCK_ACADEMIC_RECORDS,
  MOCK_FEES,
  MOCK_APPLICATIONS,
  SCHOOL_LOGO
} from './constants';
import { NewsItem, TourLocation, Student, AcademicRecord, FeeRecord, Application } from './types';

type Page = 'home' | 'about' | 'info' | 'values' | 'news' | 'contact' | 'calendar' | 'virtual-tour' | 'parent-portal';

interface ContactFormState {
  fullName: string;
  email: string;
  message: string;
}

interface ContactErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedTourLocation, setSelectedTourLocation] = useState<TourLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [portalTab, setPortalTab] = useState<'dashboard' | 'apply' | 'results' | 'fees'>('dashboard');
  const [portalSearchQuery, setPortalSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [appData, setAppData] = useState({ childName: '', dob: '', grade: '' });
  const [isAppSubmitting, setIsAppSubmitting] = useState(false);
  const [isAppSubmitted, setIsAppSubmitted] = useState(false);

  const [formData, setFormData] = useState<ContactFormState>({ fullName: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validPages: Page[] = ['home', 'about', 'info', 'values', 'news', 'contact', 'calendar', 'virtual-tour', 'parent-portal'];

  const navigateTo = useCallback((page: Page) => {
    if (page === currentPage) return;
    window.location.hash = page;
    setIsSidebarOpen(false);
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      const targetPage = validPages.includes(hash) ? hash : 'home';

      if (targetPage !== currentPage) {
        setIsPageLoading(true);
        setTimeout(() => {
          setCurrentPage(targetPage);
          setIsPageLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 400);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    const initialHash = window.location.hash.replace('#', '') as Page;
    if (validPages.includes(initialHash)) {
      setCurrentPage(initialHash);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Home', id: 'home', icon: <LayoutDashboard size={20} /> },
    { name: 'Parent Portal', id: 'parent-portal', icon: <UserPlus size={20} /> },
    { name: 'Virtual Tour', id: 'virtual-tour', icon: <Camera size={20} /> },
    { name: 'About Us', id: 'about', icon: <Info size={20} /> },
    { name: 'School Info', id: 'info', icon: <ListChecks size={20} /> },
    { name: 'Our Values', id: 'values', icon: <Heart size={20} /> },
    { name: 'Latest News', id: 'news', icon: <Newspaper size={20} /> },
    { name: 'Contact Us', id: 'contact', icon: <Mail size={20} /> },
  ];

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAppSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAppSubmitting(false);
    setIsAppSubmitted(true);
    setAppData({ childName: '', dob: '', grade: '' });
  };

  const validateForm = (): boolean => {
    const errors: ContactErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !emailRegex.test(formData.email)) errors.email = 'Valid email required';
    if (!formData.message.trim()) errors.message = 'Message required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ fullName: '', email: '', message: '' });
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() && currentPage !== 'news') navigateTo('news');
  };

  const filteredStudents = useMemo(() => {
    if (!portalSearchQuery.trim()) return MOCK_STUDENTS;
    const q = portalSearchQuery.toLowerCase();
    return MOCK_STUDENTS.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.grade.toLowerCase().includes(q) || 
      s.id.toLowerCase().includes(q)
    );
  }, [portalSearchQuery]);

  const filteredApplications = useMemo(() => {
    if (!portalSearchQuery.trim()) return MOCK_APPLICATIONS;
    const q = portalSearchQuery.toLowerCase();
    return MOCK_APPLICATIONS.filter(a => 
      a.childName.toLowerCase().includes(q) || 
      a.gradeApplyingFor.toLowerCase().includes(q) || 
      a.status.toLowerCase().includes(q)
    );
  }, [portalSearchQuery]);

  const filteredAcademicRecords = useMemo(() => {
    if (!portalSearchQuery.trim()) return MOCK_ACADEMIC_RECORDS;
    const q = portalSearchQuery.toLowerCase();
    return MOCK_ACADEMIC_RECORDS.filter(record => {
      const student = MOCK_STUDENTS.find(s => s.id === record.studentId);
      const studentMatch = student?.name.toLowerCase().includes(q);
      const termMatch = record.term.toLowerCase().includes(q);
      const subjectMatch = record.results.some(r => r.subject.toLowerCase().includes(q));
      return studentMatch || termMatch || subjectMatch;
    });
  }, [portalSearchQuery]);

  const filteredFees = useMemo(() => {
    if (!portalSearchQuery.trim()) return MOCK_FEES;
    const q = portalSearchQuery.toLowerCase();
    return MOCK_FEES.filter(f => 
      f.description.toLowerCase().includes(q) || 
      f.status.toLowerCase().includes(q) || 
      f.studentId.toLowerCase().includes(q)
    );
  }, [portalSearchQuery]);

  const ParentPortalPage = () => {
    return (
      <div className="page-enter">
        <div className="relative pt-32 pb-12 px-6 bg-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="animate-in slide-in-from-left-4 duration-500">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 text-brand-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <ShieldCheck size={12} /> Secure Parent Gateway
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tight">Parent <span className="text-brand-400">Portal</span></h1>
              <p className="text-slate-400 max-w-2xl text-lg">Manage admissions, results, and financial accounts.</p>
            </div>
            <div className="relative w-full md:w-80 group animate-in slide-in-from-right-4 duration-500">
              <input 
                type="text" 
                placeholder="Search records..." 
                value={portalSearchQuery}
                onChange={(e) => setPortalSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-brand-500 focus:bg-white/20 outline-none transition-all backdrop-blur-md"
              />
              <Search size={20} className="absolute left-4 top-4 text-slate-500 group-focus-within:text-brand-400" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 pb-20">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden min-h-[650px] flex flex-col md:flex-row border border-slate-200 dark:border-slate-800">
            <nav className="w-full md:w-72 bg-slate-50 dark:bg-slate-800/40 p-8 border-r border-slate-200 dark:border-slate-800 space-y-3">
              <button 
                onClick={() => { setPortalTab('dashboard'); setIsAppSubmitted(false); }} 
                className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-sm transition-all group ${portalTab === 'dashboard' ? 'bg-brand-500 text-white shadow-xl translate-x-1' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:translate-x-1'}`}
              >
                <div className="flex items-center gap-3"><LayoutDashboard size={20} /> Dashboard</div>
              </button>
              <button 
                onClick={() => { setPortalTab('apply'); setIsAppSubmitted(false); }} 
                className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-sm transition-all group ${portalTab === 'apply' ? 'bg-brand-500 text-white shadow-xl translate-x-1' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:translate-x-1'}`}
              >
                <div className="flex items-center gap-3"><UserPlus size={20} /> Admissions</div>
              </button>
              <button 
                onClick={() => { setPortalTab('results'); setIsAppSubmitted(false); }} 
                className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-sm transition-all group ${portalTab === 'results' ? 'bg-brand-500 text-white shadow-xl translate-x-1' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:translate-x-1'}`}
              >
                <div className="flex items-center gap-3"><LineChart size={20} /> Term Results</div>
              </button>
              <button 
                onClick={() => { setPortalTab('fees'); setIsAppSubmitted(false); }} 
                className={`w-full flex items-center justify-between p-4 rounded-2xl font-black text-sm transition-all group ${portalTab === 'fees' ? 'bg-brand-500 text-white shadow-xl translate-x-1' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:translate-x-1'}`}
              >
                <div className="flex items-center gap-3"><CreditCard size={20} /> Fees</div>
              </button>
            </nav>

            <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white dark:bg-slate-900">
              {portalTab === 'dashboard' && (
                <div className="space-y-12 animate-in fade-in duration-500">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">Family Overview</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredStudents.map(student => (
                      <div key={student.id} className="bg-slate-50 dark:bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-8 group hover:shadow-2xl transition-all duration-500">
                        <img src={student.photo} className="w-24 h-24 rounded-3xl object-cover shadow-2xl" alt={student.name} />
                        <div>
                          <h4 className="font-black text-2xl dark:text-white group-hover:text-brand-600 transition-colors">{student.name}</h4>
                          <p className="text-brand-600 dark:text-brand-400 font-black text-xs uppercase tracking-widest mt-1">{student.grade}</p>
                        </div>
                      </div>
                    ))}
                    <div 
                      className="bg-brand-50 dark:bg-brand-900/20 p-8 rounded-[2.5rem] border-2 border-dashed border-brand-200 dark:border-brand-800 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-brand-100 transition-all duration-300" 
                      onClick={() => setPortalTab('apply')}
                    >
                      <PlusCircle size={32} className="text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-black text-brand-900 dark:text-brand-300">Add Child</p>
                    </div>
                  </div>
                </div>
              )}

              {portalTab === 'apply' && (
                <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
                  {isAppSubmitted ? (
                    <div className="flex flex-col items-center justify-center text-center py-20 space-y-8 animate-in zoom-in-95 duration-500">
                      <div className="w-32 h-32 bg-brand-100 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 rounded-[3rem] flex items-center justify-center">
                        <CheckCircle2 size={64} />
                      </div>
                      <h2 className="text-4xl font-black dark:text-white">Application Received!</h2>
                      <button 
                        onClick={() => { setPortalTab('dashboard'); setIsAppSubmitted(false); }}
                        className="px-10 py-4 bg-brand-500 text-white rounded-2xl font-black text-lg hover:bg-brand-600 transition-all shadow-xl"
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="space-y-8">
                      <h2 className="text-4xl font-black dark:text-white mb-2">New Admission</h2>
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Child's Full Name</label>
                        <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-3xl p-6 focus:ring-4 focus:ring-brand-500/20 outline-none dark:text-white font-bold" placeholder="Full Name" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Date of Birth</label>
                          <input required type="date" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-3xl p-6 focus:ring-4 focus:ring-brand-500/20 outline-none dark:text-white font-bold" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Grade</label>
                          <select required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-3xl p-6 focus:ring-4 focus:ring-brand-500/20 outline-none dark:text-white font-bold">
                            <option value="">Select Grade</option>
                            <option value="Early Years">Early Years</option>
                            <option value="Year 1">Year 1</option>
                            <option value="Year 2">Year 2</option>
                          </select>
                        </div>
                      </div>
                      <button disabled={isAppSubmitting} className="w-full py-6 bg-brand-500 text-white rounded-[2rem] font-black text-xl hover:bg-brand-600 transition-all shadow-2xl flex items-center justify-center gap-3">
                        {isAppSubmitting ? <Loader2 size={24} className="animate-spin" /> : 'Submit Application'}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {portalTab === 'results' && (
                <div className="space-y-12 animate-in fade-in duration-500">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">Academic Progress</h2>
                  {filteredAcademicRecords.map(record => (
                    <div key={record.id} className="bg-white dark:bg-slate-900 border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
                      <div className="bg-brand-500 p-8 text-white flex justify-between items-center">
                        <div>
                          <h3 className="font-black text-2xl">{MOCK_STUDENTS.find(s=>s.id===record.studentId)?.name}</h3>
                          <p className="text-brand-100 text-sm font-bold uppercase tracking-widest">{record.term} {record.year}</p>
                        </div>
                        <button className="bg-white text-brand-600 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-50 transition-all">Download PDF</button>
                      </div>
                      <div className="p-10">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b dark:border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                              <th className="pb-6">Subject</th>
                              <th className="pb-6">Score</th>
                              <th className="pb-6">Grade</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y dark:divide-slate-800">
                            {record.results.map((res, i) => (
                              <tr key={i}>
                                <td className="py-6 font-black text-lg dark:text-white">{res.subject}</td>
                                <td className="py-6 font-bold text-slate-500">{res.score}%</td>
                                <td className="py-6"><span className="px-4 py-1.5 rounded-xl font-black text-sm bg-brand-50 text-brand-600 dark:bg-brand-950/30">{res.grade}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {portalTab === 'fees' && (
                <div className="space-y-12 animate-in fade-in duration-500">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">Financials</h2>
                  <div className="bg-gradient-to-br from-slate-900 to-brand-900 p-10 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-brand-200 text-xs font-black uppercase tracking-widest mb-2 opacity-80">Total Balance</p>
                      <h3 className="text-5xl font-black tracking-tight">£230.00</h3>
                    </div>
                    <button className="relative z-10 px-10 py-5 bg-white text-brand-900 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-xl flex items-center gap-2">
                       <CreditCard size={24} /> Pay Balance
                    </button>
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 rounded-[3rem] p-10 shadow-sm">
                    <h3 className="font-black text-2xl mb-10">Fee History</h3>
                    <table className="w-full">
                      <tbody className="divide-y dark:divide-slate-800">
                        {filteredFees.map((fee, i) => (
                          <tr key={i} className="group">
                            <td className="py-6">
                              <p className="font-black text-lg dark:text-white group-hover:text-brand-600 transition-colors">{fee.description}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Due: {fee.dueDate}</p>
                            </td>
                            <td className="py-6 font-black text-slate-900 dark:text-white">£{fee.amount.toFixed(2)}</td>
                            <td className="py-6">
                              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${fee.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : fee.status === 'Overdue' ? 'bg-rose-50 text-rose-600' : 'bg-brand-50 text-brand-600'}`}>
                                {fee.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NewsModal = () => {
    if (!selectedNews) return null;
    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedNews(null)}
        role="presentation"
      >
        <div 
          className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative h-64 shrink-0">
            <img src={selectedNews.image} alt="" className="w-full h-full object-cover" />
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute top-6 right-6 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all"
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-6 left-8">
               <span className={`px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl ${selectedNews.category === 'Alert' ? 'bg-rose-500 text-white' : 'bg-brand-600 text-white'}`}>
                  {selectedNews.category}
                </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-10 space-y-8">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">{selectedNews.title}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-bold italic border-l-8 border-brand-500 pl-8">{selectedNews.excerpt}</p>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{selectedNews.content}</div>
          </div>
        </div>
      </div>
    );
  };

  const TourModal = () => {
    if (!selectedTourLocation) return null;
    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/70 backdrop-blur-lg transition-opacity"
        onClick={() => setSelectedTourLocation(null)}
      >
        <div 
          className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full md:w-3/5 h-80 md:h-auto overflow-hidden">
            <img src={selectedTourLocation.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
              <PlayCircle size={80} className="text-white hover:scale-110 active:scale-95 transition-all cursor-pointer" />
            </div>
          </div>
          <div className="flex-1 p-10 md:p-16 bg-white dark:bg-slate-900 overflow-y-auto">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">{selectedTourLocation.title}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10">{selectedTourLocation.description}</p>
            <div className="space-y-4">
              <h4 className="font-black text-xs uppercase tracking-widest text-brand-600">Features</h4>
              {selectedTourLocation.features.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  <span className="font-bold">{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigateTo('contact')} className="w-full mt-10 py-5 bg-brand-500 text-white rounded-3xl font-black text-lg hover:bg-brand-600 transition-all">Request Visit</button>
          </div>
        </div>
      </div>
    );
  };

  const HomePage = () => (
    <div className="page-enter">
      <div className="relative min-h-[90vh] flex items-center pt-20 pb-20 lg:pt-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-500 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <Star size={14} className="fill-brand-600" /> Outstanding 2024
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter uppercase">
              Every Child <span className="text-brand-500 italic font-medium">Shines</span> Brightly.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium">
              Nurturing curiosity and character in a vibrant, supportive community where diversity is celebrated and excellence is reached together.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <button onClick={() => navigateTo('parent-portal')} className="px-10 py-5 bg-brand-500 text-white rounded-[2rem] font-black text-lg hover:bg-brand-600 hover:-translate-y-2 transition-all duration-500 shadow-2xl">Portal Access</button>
              <button onClick={() => navigateTo('virtual-tour')} className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 rounded-[2rem] font-black text-lg hover:bg-brand-50 transition-all duration-500 shadow-xl">Campus Tour</button>
            </div>
          </div>
          <div className="relative animate-in zoom-in duration-1000">
            <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] group">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200" alt="Students" className="w-full h-full object-cover aspect-[3/4] group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute bottom-10 left-10 p-8 bg-brand-500 text-white rounded-[2.5rem] shadow-2xl transform -rotate-3">
                 <p className="text-2xl font-black tracking-tight">30 Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VirtualTourPage = () => (
    <div className="page-enter">
      <Section id="locations" title="Explore Victoria" subtitle="Step inside our purpose-built environment designed for exploration and discovery." light>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pt-8">
          {TOUR_LOCATIONS.map((loc) => (
            <div key={loc.id} onClick={() => setSelectedTourLocation(loc)} className="group cursor-pointer bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] hover:-translate-y-4 transition-all duration-500">
              <div className="h-72 overflow-hidden relative">
                <img src={loc.image} alt="" className="w-full h-full object-cover group-hover:scale-125 transition-all duration-[1.5s]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700 flex items-center justify-center">
                   <PlayCircle size={64} className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all" />
                </div>
                <div className="absolute top-8 left-8 p-4 bg-brand-500 rounded-2xl shadow-2xl text-white">
                   {(() => {
                      const icons: Record<string, any> = { Zap, Book, Trophy, Trees, Baby };
                      const Icon = icons[loc.icon] || Camera;
                      return <Icon size={28} />;
                   })()}
                </div>
              </div>
              <div className="p-10 space-y-6">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-brand-600 transition-all">{loc.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">{loc.description}</p>
                <div className="pt-4 flex items-center gap-3 text-brand-600 font-black text-sm uppercase tracking-[0.2em] group-hover:translate-x-4 transition-all">Step Inside <ArrowRight size={20} /></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  const AboutPage = () => (
    <div className="page-enter py-32">
      <Section id="about" title="Our Legacy" subtitle="Nurturing the hearts and minds of Victoria District's future leaders since 1994." light>
        <div className="grid lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-10">
              <h3 className="text-4xl font-black dark:text-white">Equal Opportunities for All</h3>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                At Victoria Primary School, we believe that every child deserves a world-class foundation. Our motto isn't just on our crest; it's the standard we live by every day in every classroom.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-8 bg-brand-50 dark:bg-brand-950/20 rounded-[2.5rem] text-brand-600">
                    <span className="text-5xl font-black mb-2 block">30+</span>
                    <span className="text-sm font-black uppercase tracking-widest">Years</span>
                 </div>
                 <div className="p-8 bg-brand-50 dark:bg-brand-950/20 rounded-[2.5rem] text-brand-600">
                    <span className="text-5xl font-black mb-2 block">500+</span>
                    <span className="text-sm font-black uppercase tracking-widest">Students</span>
                 </div>
              </div>
           </div>
           <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-brand-50">
              <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200" alt="About" className="w-full aspect-video object-cover" />
           </div>
        </div>
      </Section>
    </div>
  );

  const ValuesPage = () => (
    <div className="page-enter">
      <Section id="values" title="Core Values">
        <div className="grid md:grid-cols-3 gap-12">
          {SCHOOL_VALUES.map((val, idx) => (
            <div key={idx} className="group p-12 bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-brand-50 rounded-[2.5rem] flex items-center justify-center text-brand-600 mb-10 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-lg">
                {(() => {
                   const icons: Record<string, any> = { Star, Heart, Users };
                   const Icon = icons[val.icon] || Heart;
                   return <Icon size={48} />;
                })()}
              </div>
              <h3 className="text-4xl font-black mb-6 dark:text-white">{val.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  const NewsPage = () => (
    <div className="page-enter">
      <Section id="news" title="Latest Stories" light>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {NEWS_ITEMS.map(item => (
            <div key={item.id} className="group bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all cursor-pointer" onClick={() => setSelectedNews(item)}>
               <div className="h-64 overflow-hidden relative">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt="" />
                  <div className="absolute top-6 right-6 bg-brand-500 px-5 py-2 rounded-2xl text-[10px] font-black uppercase text-white shadow-xl">{item.category}</div>
               </div>
               <div className="p-10 space-y-4">
                  <h3 className="text-2xl font-black dark:text-white group-hover:text-brand-600 transition-colors line-clamp-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium line-clamp-3">{item.excerpt}</p>
               </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  const ContactPage = () => (
    <div className="page-enter">
      <Section id="contact" title="Get in Touch" light>
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="bg-brand-600 p-16 rounded-[4rem] text-white space-y-16 relative overflow-hidden shadow-2xl">
            <h3 className="text-4xl font-black">Main Office</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-6"><Mail size={28} /> <span className="text-2xl font-black">office@victoria-primary.edu</span></div>
              <div className="flex items-center gap-6"><Phone size={28} /> <span className="text-2xl font-black">+44 123 456 7890</span></div>
              <div className="flex items-center gap-6"><MapPin size={28} /> <span className="text-2xl font-black">Victoria District, VD1 2PS</span></div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm">
            {submitSuccess ? (
              <div className="text-center py-20 animate-in zoom-in duration-700">
                <CheckCircle2 size={64} className="text-emerald-600 mx-auto mb-6" />
                <h3 className="text-4xl font-black dark:text-white">Sent!</h3>
                <button onClick={() => setSubmitSuccess(false)} className="mt-10 px-10 py-4 bg-brand-500 text-white rounded-2xl font-black">Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 rounded-[2rem] p-6 focus:ring-4 focus:ring-brand-500/20 outline-none font-bold" placeholder="Your Name" />
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 rounded-[2rem] p-6 focus:ring-4 focus:ring-brand-500/20 outline-none font-bold" placeholder="Your Email" />
                <textarea rows={5} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 rounded-[2rem] p-6 focus:ring-4 focus:ring-brand-500/20 outline-none font-bold resize-none" placeholder="How can we help?"></textarea>
                <button disabled={isSubmitting} className="w-full py-6 bg-brand-500 text-white rounded-[2rem] font-black text-xl hover:bg-brand-600 shadow-2xl">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );

  const InfoPage = () => <div className="page-enter py-32"><Section id="info" title="School Info" light><p className="text-xl font-bold text-slate-500">Essential school details and documentation.</p></Section></div>;
  const CalendarPage = () => <div className="page-enter py-32"><Section id="calendar" title="Academic Calendar"><p className="text-xl font-bold text-slate-500">Upcoming term dates and events.</p></Section></div>;

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'info': return <InfoPage />;
      case 'values': return <ValuesPage />;
      case 'news': return <NewsPage />;
      case 'contact': return <ContactPage />;
      case 'calendar': return <CalendarPage />;
      case 'virtual-tour': return <VirtualTourPage />;
      case 'parent-portal': return <ParentPortalPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col lg:flex-row font-quicksand">
      {isPageLoading && (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-brand-100 overflow-hidden">
          <div className="h-full bg-brand-500 w-1/3 animate-[loading_1s_infinite_linear]"></div>
        </div>
      )}

      {selectedNews && <NewsModal />}
      {selectedTourLocation && <TourModal />}

      <header className="lg:hidden fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 z-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <img src={SCHOOL_LOGO} alt="Crest" className="w-10 h-10 rounded-xl shadow-lg shadow-brand-200" />
            <span className="font-black tracking-tighter uppercase text-lg">Victoria</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 text-slate-600 dark:text-slate-300 hover:text-brand-600 transition-colors">
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 z-[60] transition-all duration-500 transform shadow-2xl
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-72 lg:w-80`}>
        <div className="p-10 h-full flex flex-col">
          <div className="flex flex-col items-center text-center pb-10 border-b dark:border-slate-800 mb-10 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="relative w-24 h-24 bg-brand-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-500 overflow-hidden border-4 border-white dark:border-slate-900">
               <img src={SCHOOL_LOGO} alt="VPS Crest" className="w-full h-full object-contain p-2" />
            </div>
            <div>
              <span className="block text-2xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">VICTORIA</span>
              <span className="block text-[10px] font-black text-brand-600 uppercase tracking-[0.3em]">Primary School</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id as Page)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[2rem] transition-all duration-300 group font-black text-sm ${
                  currentPage === link.id 
                    ? 'bg-brand-500 text-white shadow-2xl translate-x-2' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 hover:translate-x-2'
                }`}
              >
                <span className={`${currentPage === link.id ? 'text-white' : 'text-slate-400 group-hover:text-brand-600'}`}>{link.icon}</span>
                {link.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t dark:border-slate-800 space-y-6">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-[2rem] hover:bg-slate-100 transition-all">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Theme</span>
              {isDarkMode ? <Sun size={20} className="text-brand-400" /> : <Moon size={20} className="text-slate-400" />}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-80 min-h-screen relative overflow-x-hidden">
        <div className="hidden lg:flex fixed top-0 right-0 left-80 h-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b dark:border-slate-800 z-40 items-center justify-between px-16">
          <div className="relative w-[450px] group">
             <input type="text" placeholder="Search VPS..." value={searchQuery} onChange={handleSearchChange} className="w-full bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] py-4 pl-14 pr-4 text-sm focus:ring-4 focus:ring-brand-500/10 outline-none transition-all dark:text-white font-bold" />
             <Search size={22} className="absolute left-5 top-4 text-slate-300 group-focus-within:text-brand-600 transition-colors" />
          </div>
          <button onClick={() => navigateTo('contact')} className="px-10 py-3.5 bg-brand-500 text-white rounded-2xl font-black text-sm hover:shadow-2xl shadow-brand-100 transition-all">Inquire</button>
        </div>

        <div className={`transition-all duration-500 ${isPageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100 pt-24 lg:pt-0'}`}>
          {renderCurrentPage()}
        </div>

        <footer className="bg-slate-900 text-slate-400 pt-24 pb-12 px-10 border-t border-slate-800">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-20">
             <div className="space-y-6">
                <div className="flex items-center gap-3 text-white">
                   <img src={SCHOOL_LOGO} alt=" Crest" className="w-12 h-12 rounded-xl" />
                   <span className="font-black text-2xl tracking-tighter">VICTORIA</span>
                </div>
                <p className="text-lg leading-relaxed font-medium">Equal Opportunities for All. Nurturing future leaders since 1994.</p>
             </div>
             <div>
                <h4 className="text-white font-black uppercase text-xs mb-8 tracking-widest">Portal</h4>
                <ul className="space-y-4 font-bold">
                   <li><button onClick={() => navigateTo('parent-portal')} className="hover:text-brand-400 transition-all">Dashboard</button></li>
                   <li><button onClick={() => navigateTo('parent-portal')} className="hover:text-brand-400 transition-all">Admissions</button></li>
                   <li><button onClick={() => navigateTo('parent-portal')} className="hover:text-brand-400 transition-all">Results</button></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-black uppercase text-xs mb-8 tracking-widest">About</h4>
                <ul className="space-y-4 font-bold">
                   <li><button onClick={() => navigateTo('about')} className="hover:text-brand-400 transition-all">Our Legacy</button></li>
                   <li><button onClick={() => navigateTo('virtual-tour')} className="hover:text-brand-400 transition-all">Virtual Tour</button></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-black uppercase text-xs mb-8 tracking-widest">Contact</h4>
                <p className="text-lg font-black text-white">office@victoria-primary.edu</p>
                <p className="text-lg font-black text-white">+44 123 456 7890</p>
             </div>
          </div>
        </footer>
      </main>

      <AIAssistant />
    </div>
  );
};

export default App;
