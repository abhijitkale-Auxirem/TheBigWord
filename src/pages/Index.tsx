import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import FeedbackSpinner from '@/components/common/FeedbackSpinner';
import { ROUTES } from '@/constants/routes';
import Home from '@/pages/public/Home';

const Index = () => {
  const { isAuthenticated, isLoading, user } = useAuthContext();

  if (isLoading) {
    return <FeedbackSpinner fullScreen label="Restoring your session..." />;
  }

  if (!isAuthenticated) {
    return <Home />;
  }

  const roleMap: Record<string, string> = {
    learner: ROUTES.LEARNER_DASHBOARD,
    tutor: ROUTES.TUTOR_DASHBOARD,
    translator: ROUTES.TRANSLATOR_DASHBOARD,
    corporate: ROUTES.CORPORATE_DASHBOARD,
    admin: ROUTES.ADMIN_DASHBOARD,
  };

  return <Navigate to={roleMap[user?.role || 'learner'] || ROUTES.LEARNER_DASHBOARD} replace />;
};

export default Index;
