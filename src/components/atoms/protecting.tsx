import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/Authcontext'; // Adjust the path as necessary

interface WithAuthProps {
  requiredRole: 'admin' | 'manager' | 'customer';
}

const withAuth = (WrappedComponent: React.ComponentType, { requiredRole }: WithAuthProps) => {
  return (props: any) => {
    const { user, loading } = useAuth(); // Assume useAuth provides user and loading state
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user || user.role !== requiredRole) {
          router.push('/login'); // Redirect to login if not authorized
        }
      }
    }, [user, loading, router]);

    if (loading || !user || user.role !== requiredRole) {
      return <p>Loading...</p>; // Display loading state or spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
