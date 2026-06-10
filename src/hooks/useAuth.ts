import { useAuthContext } from '@/contexts/AuthContext';

const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, signup, logout } = useAuthContext();

  const isLearner = user?.role === 'learner';
  const isTutor = user?.role === 'tutor';
  const isTranslator = user?.role === 'translator';
  const isCorporate = user?.role === 'corporate';
  const isAdmin = user?.role === 'admin';

  return {
    user, isAuthenticated, isLoading,
    login, signup, logout,
    isLearner, isTutor, isTranslator, isCorporate, isAdmin,
  };
};

export default useAuth;
