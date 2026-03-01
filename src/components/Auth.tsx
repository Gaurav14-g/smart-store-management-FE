import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import headerJson from "../../config/header.json";

interface AuthProps {
  check: boolean;
  component: React.ReactNode;
}

export const Auth = (props: AuthProps) => {
  let { user } = useContext(AuthContext);
  const [validPage, setValidPage] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    if (headerJson.roleBased.isRoleBased === true) {
      const currentRole = localStorage.getItem("role");
      
      if (!currentRole) {
        navigate("/signin");
        return;
      }
      
      const menuForRole = headerJson.menu[currentRole as keyof typeof headerJson.menu];
      if (menuForRole) {
        let isValidUser = extractUrls(menuForRole).includes(window.location.pathname);
        setValidPage(isValidUser);
        if (!isValidUser && window.location.pathname !== '/') {
          navigate("/");
        }
      } else {
        localStorage.removeItem("role");
        navigate("/signin");
      }
    }
  }, [validPage, navigate]);

  function extractUrls(menuItems: any[]): string[] {
    let urls: string[] = [];
    if (!menuItems || !Array.isArray(menuItems)) {
      return urls;
    }
    menuItems.forEach(item => {
      if (item.url) {
        urls.push(item.url);
      }
      if (item.child) {
        urls = urls.concat(extractUrls(item.child));
      }
    });
    return urls;
  }

  return props.check ? (
    user.user_id ? <>{props.component}</> : <>{navigate("/signin")}</>
  ) : <>{props.component}</>;
};

export default Auth;
