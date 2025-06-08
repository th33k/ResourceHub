import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URLS } from '../services/api/config';

// Define the shape of user data
export interface UserData {
  name: string;
  role: string;
  avatar: string;
  email?: string;
  profilePicture?: string;
}

interface UserContextType {
  isAdmin: boolean;
  toggleAdminMode: () => void;
  userData: UserData;
  refreshUserData: () => void;
  isAdminView: boolean;
}

// Default fallback user
const defaultUser: UserData = {
  name: 'Guest User',
  role: localStorage.getItem('userRole') || '',
  avatar: 'GU',
};

const UserContext = createContext<UserContextType>({
  isAdmin: false,
  toggleAdminMode: () => {},
  userData: defaultUser,
  refreshUserData: () => {},
  isAdminView: false,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize role immediately to avoid role flicker on refresh
  const storedRole = localStorage.getItem('userRole') || 'User';
  const storedUserId = localStorage.getItem('Userid');

  const [userData, setUserData] = useState<UserData>({
    ...defaultUser,
    role: storedRole,
  });

  const fetchUserData = useCallback(async () => {
    if (!storedUserId) {
      setUserData(defaultUser);
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URLS.settings}/details/${storedUserId}`,
      );
      const [profile] = response.data;

      const name = profile.username || 'User';
      const email = profile.email || '';
      const avatar = name.charAt(0).toUpperCase();
      const role = localStorage.getItem('userRole') || 'User';
      const profilePicture = profile.profile_picture_url || '';

      setUserData((prev) => ({
        ...prev,
        name,
        avatar,
        role,
        email,
        profilePicture,
      }));
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setUserData(defaultUser);
    }
  }, [storedUserId]);

  const refreshUserData = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const isUserAdmin = useMemo(
    () => userData.role.toLowerCase() === 'admin',
    [userData.role],
  );

  const isAdminView = useMemo(
    () => location.pathname.startsWith('/admin'),
    [location.pathname],
  );

  const toggleAdminMode = useCallback(() => {
    navigate(isAdminView ? '/user-dashboarduser' : '/admin-dashboardadmin');
  }, [isAdminView, navigate]);

  const value = useMemo(
    () => ({
      isAdmin: isUserAdmin,
      toggleAdminMode,
      userData,
      refreshUserData,
      isAdminView,
    }),
    [isUserAdmin, toggleAdminMode, userData, refreshUserData, isAdminView],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
