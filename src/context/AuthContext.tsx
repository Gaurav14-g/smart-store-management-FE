import { createContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import global from "../../config/Global.json";
import Toast from "../components/Toast";

interface AuthTokens {
  access: string;
  refresh: string;
}

interface User {
  user_id?: string;
  username?: string;
  roles?: string[];
  is_superuser?: boolean;
}

interface AuthContextType {
  user: User;
  loginUser: (e: React.FormEvent<HTMLFormElement>) => void;
  logOutUser: (message?: string) => void;
  authToken: AuthTokens | null;
}

const AuthContext = createContext<AuthContextType>({
  user: {},
  loginUser: () => {},
  logOutUser: () => {},
  authToken: null,
});

export default AuthContext;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [toastState, setToastState] = useState({ show: false, message: '', variant: 'primary' as const });

  const showToast = (message: string, variant: 'primary' | 'success' | 'danger' | 'warning' | 'info' = 'primary') => {
    setToastState({ show: true, message, variant });
  };

  const getAPI = (API_NAME: string) => {
    return global.api.host + global.api[API_NAME as keyof typeof global.api];
  };

  const [authToken, setAuthToken] = useState<AuthTokens | null>(() =>
    localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")!) : null
  );

  const [user, setUser] = useState<User>(() =>
    localStorage.getItem("authToken") ? jwtDecode(localStorage.getItem("authToken")!) : {}
  );

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    axios
      .post(getAPI("token"), {
        username: target.username.value,
        password: target.password.value,
      })
      .then((response) => {
        if (global.checkSuperUser !== undefined && global.checkSuperUser === true) {
          checkSuperUser(response.data.access);
        }

        const decodedUser = jwtDecode<User>(response.data.access);
        setAuthToken(response.data);
        setUser(decodedUser);
        localStorage.setItem("authToken", JSON.stringify(response.data));
        localStorage.setItem("isAuthenticated", "true");
        
        showToast("Login successful! Welcome back.", "success");
        
        if (decodedUser.is_superuser) {
          localStorage.setItem("role", "superuser");
          navigate('/dashboard');
        } else if (decodedUser.roles && decodedUser.roles.includes('client')) {
          localStorage.setItem("role", "client");
          navigate('/dashboard');
        } else if (decodedUser.roles && ['qa_engineer', 'frontend_dev', 'backend_dev', 'hum_lead'].some(role => decodedUser.roles!.includes(role))) {
          const role = decodedUser.roles.find(r => ['qa_engineer', 'frontend_dev', 'backend_dev', 'hum_lead'].includes(r));
          localStorage.setItem("role", role!);
          navigate('/dashboard');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.detail || "Username or password incorrect";
        showToast(errorMessage, "danger");
        console.error(error);
      });
  };

  const checkSuperUser = async (token: string) => {
    try {
      const response = await axios.get(getAPI("isSuperUser"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.is_superuser) {
        showToast("Welcome, Admin", "success");
      } else {
        logOutUser("User is not super user");
      }
    } catch (error) {
      showToast("Error checking user permissions", "danger");
      console.error(error);
    }
  };

  const logOutUser = (message?: string) => {
    setAuthToken(null);
    setUser({});
    localStorage.clear();
    if (message) showToast(message, "danger");
    navigate("/signin");
  };

  useEffect(() => {
    const refreshToken = async () => {
      if (authToken?.refresh) {
        try {
          const response = await axios.post(getAPI("refreshToken"), { 
            refresh: authToken.refresh 
          });
          
          const newTokens = {
            access: response.data.access,
            refresh: authToken.refresh
          };
          
          const decodedUser = jwtDecode<User>(response.data.access);
          setAuthToken(newTokens);
          setUser(decodedUser);
          localStorage.setItem("authToken", JSON.stringify(newTokens));
          
          if (decodedUser.is_superuser) {
            localStorage.setItem("role", "superuser");
          } else if (decodedUser.roles && decodedUser.roles.length > 0) {
            const primaryRole = decodedUser.roles.includes('client') ? 'client' :
                               decodedUser.roles.find(role => ['qa_engineer', 'frontend_dev', 'backend_dev', 'hum_lead'].includes(role)) || decodedUser.roles[0];
            localStorage.setItem("role", primaryRole);
          }
          
        } catch (error) {
          console.error('Token refresh failed:', error);
          logOutUser("Session expired. Please login again.");
        }
      } else if (!loading) {
        logOutUser();
      }

      if (loading) {
        setLoading(false);
      }
    };

    if (loading) {
      refreshToken();
    }

    const fourMinutes = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authToken?.refresh) {
        refreshToken();
      }
    }, fourMinutes);
    
    return () => clearInterval(interval);
  }, [authToken, loading]);

  const contextData: AuthContextType = {
    user,
    loginUser,
    logOutUser,
    authToken,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
      <Toast
        show={toastState.show}
        onClose={() => setToastState({ ...toastState, show: false })}
        message={toastState.message}
        variant={toastState.variant}
      />
    </AuthContext.Provider>
  );
};
