import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import { ROUTES as R } from '@/constants/routes';

const Index = () => {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const roleMap: Record<string, string> = {
    learner: R.LEARNER_DASHBOARD,
    tutor: R.TUTOR_DASHBOARD,
    corporate: R.CORPORATE_DASHBOARD,
    admin: R.ADMIN_DASHBOARD,
  };

  return <Navigate to={roleMap[user?.role || 'learner'] || R.LEARNER_DASHBOARD} replace />;
};

export default Index;
