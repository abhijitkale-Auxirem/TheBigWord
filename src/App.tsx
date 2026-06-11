import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Core
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/common/ScrollToTop";

// Public
import Blog from "./pages/public/Blog";
import BlogDetails from "./pages/public/BlogDetails";
import Careers from "./pages/public/Careers";
import HelpCenter from "./pages/public/HelpCenter";
import Contact from "./pages/public/Contact";
import Press from "./pages/public/Press";
import Documentation from "./pages/public/Documentation";
import Courses from "./pages/public/Courses";
import Community from "./pages/public/Community";
import Pricing from "./pages/public/Pricing";
import About from "./pages/public/About";
import Partners from "./pages/public/Partners";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import TermsOfService from "./pages/public/TermsOfService";
import CookieSettings from "./pages/public/CookieSettings";

// Auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLogin from "./pages/auth/AdminLogin";

// Learner
import LearnerDashboard from "./pages/dashboard/learner/LearnerDashboard";
import CourseAcademy from "./pages/dashboard/learner/CourseAcademy";
import VocabularyBuilder from "./pages/dashboard/learner/VocabularyBuilder";
import ConversationCoach from "./pages/dashboard/learner/ConversationCoach";
import TranslationHub from "./pages/dashboard/learner/TranslationHub";
import ContentStudio from "./pages/dashboard/learner/ContentStudio";
import TutorBooking from "./pages/dashboard/learner/TutorBooking";
import CommunityExchange from "./pages/dashboard/learner/CommunityExchange";
import TestingCenter from "./pages/dashboard/learner/TestingCenter";
import Certifications from "./pages/dashboard/learner/Certifications";
import LearnerProfile from "./pages/dashboard/learner/Profile";
import LearnerSettings from "./pages/dashboard/learner/Settings";

// Tutor
import TutorDashboard from "./pages/dashboard/tutor/TutorDashboard";
import ClassesScheduling from "./pages/dashboard/tutor/ClassesScheduling";
import StudentEvaluations from "./pages/dashboard/tutor/StudentEvaluations";
import EarningsAnalytics from "./pages/dashboard/tutor/EarningsAnalytics";
import TutorProfile from "./pages/dashboard/tutor/Profile";
import TutorSettings from "./pages/dashboard/tutor/Settings";

// Translator
import TranslatorDashboard from "./pages/dashboard/translator/TranslatorDashboard";
import ProjectMarketplace from "./pages/dashboard/translator/ProjectMarketplace";
import LocalizationTools from "./pages/dashboard/translator/LocalizationTools";
import TranslatorProfile from "./pages/dashboard/translator/Profile";
import TranslatorSettings from "./pages/dashboard/translator/Settings";

// Corporate
import CorporateDashboard from "./pages/dashboard/corporate/CorporateDashboard";
import WorkforceAnalytics from "./pages/dashboard/corporate/WorkforceAnalytics";
import ProgramAssignments from "./pages/dashboard/corporate/ProgramAssignments";
import BillingsInvoices from "./pages/dashboard/corporate/BillingsInvoices";
import CorporateProfile from "./pages/dashboard/corporate/Profile";
import CorporateSettings from "./pages/dashboard/corporate/Settings";

// Admin
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import UserManagement from "./pages/dashboard/admin/UserManagement";
import CourseManagement from "./pages/dashboard/admin/CourseManagement";
import CertificationAdmin from "./pages/dashboard/admin/CertificationAdmin";
import ContentModeration from "./pages/dashboard/admin/ContentModeration";
import RevenueMonitoring from "./pages/dashboard/admin/RevenueMonitoring";
import AdminProfile from "./pages/dashboard/admin/Profile";
import AdminSettings from "./pages/dashboard/admin/Settings";

// Common Dashboard Pages
import NotificationsPage from "./pages/dashboard/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Index redirect */}
            <Route path="/" element={<Index />} />
            <Route path="/app" element={<Index />} />

            {/* Public */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/press" element={<Press />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/community" element={<Community />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookieSettings />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Common Dashboard */}
            <Route path="/dashboard/notifications" element={<NotificationsPage />} />

            {/* Learner Dashboard */}
            <Route path="/dashboard/learner" element={<LearnerDashboard />} />
            <Route path="/dashboard/learner/courses" element={<CourseAcademy />} />
            <Route path="/dashboard/learner/vocabulary" element={<VocabularyBuilder />} />
            <Route path="/dashboard/learner/coach" element={<ConversationCoach />} />
            <Route path="/dashboard/learner/translation" element={<TranslationHub />} />
            <Route path="/dashboard/learner/studio" element={<ContentStudio />} />
            <Route path="/dashboard/learner/tutors" element={<TutorBooking />} />
            <Route path="/dashboard/learner/community" element={<CommunityExchange />} />
            <Route path="/dashboard/learner/testing" element={<TestingCenter />} />
            <Route path="/dashboard/learner/certifications" element={<Certifications />} />
            <Route path="/dashboard/learner/profile" element={<LearnerProfile />} />
            <Route path="/dashboard/learner/settings" element={<LearnerSettings />} />

            {/* Tutor Dashboard */}
            <Route path="/dashboard/tutor" element={<TutorDashboard />} />
            <Route path="/dashboard/tutor/schedule" element={<ClassesScheduling />} />
            <Route path="/dashboard/tutor/evaluations" element={<StudentEvaluations />} />
            <Route path="/dashboard/tutor/earnings" element={<EarningsAnalytics />} />
            <Route path="/dashboard/tutor/profile" element={<TutorProfile />} />
            <Route path="/dashboard/tutor/settings" element={<TutorSettings />} />

            {/* Translator Dashboard */}
            <Route path="/dashboard/translator" element={<TranslatorDashboard />} />
            <Route path="/dashboard/translator/marketplace" element={<ProjectMarketplace />} />
            <Route path="/dashboard/translator/tools" element={<LocalizationTools />} />
            <Route path="/dashboard/translator/profile" element={<TranslatorProfile />} />
            <Route path="/dashboard/translator/settings" element={<TranslatorSettings />} />

            {/* Corporate Dashboard */}
            <Route path="/dashboard/corporate" element={<CorporateDashboard />} />
            <Route path="/dashboard/corporate/analytics" element={<WorkforceAnalytics />} />
            <Route path="/dashboard/corporate/programs" element={<ProgramAssignments />} />
            <Route path="/dashboard/corporate/billings" element={<BillingsInvoices />} />
            <Route path="/dashboard/corporate/profile" element={<CorporateProfile />} />
            <Route path="/dashboard/corporate/settings" element={<CorporateSettings />} />

            {/* Admin Dashboard */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/users" element={<UserManagement />} />
            <Route path="/dashboard/admin/courses" element={<CourseManagement />} />
            <Route path="/dashboard/admin/certifications" element={<CertificationAdmin />} />
            <Route path="/dashboard/admin/moderation" element={<ContentModeration />} />
            <Route path="/dashboard/admin/revenue" element={<RevenueMonitoring />} />
            <Route path="/dashboard/admin/profile" element={<AdminProfile />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettings />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
