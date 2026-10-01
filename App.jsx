import { useEffect, useState } from 'react';
import AuthScreen from './apps/AuthScreen';
import UserApp from './apps/UserApp';
import AdminApp from './apps/AdminApp';
import { apiRequest } from './apps/api';
import LoadingScreen from './apps/LoadingScreen';

function loadSession() {
  try { return JSON.parse(localStorage.getItem('stacksy-session')); }
  catch { return null; }
}

function App() {
  const [session, setSession] = useState(loadSession);
  const [portal, setPortal] = useState(() => loadSession()?.user?.role === 'admin' ? 'admin' : 'user');
  const [sessionValidated, setSessionValidated] = useState(() => !loadSession()?.token);
  const sessionToken = session?.token;

  useEffect(() => {
    if (!sessionToken) return undefined;
    let active = true;
    apiRequest('/me', { token: sessionToken })
      .then((user) => {
        if (!active) return;
        localStorage.setItem('stacksy-session', JSON.stringify({ token: sessionToken, user }));
        setSession((currentSession) => currentSession ? { ...currentSession, user } : currentSession);
        setSessionValidated(true);
      })
      .catch(() => {
        if (!active) return;
        localStorage.removeItem('stacksy-session');
        setSession(null);
        setPortal('user');
        setSessionValidated(true);
      });
    return () => { active = false; };
  }, [sessionToken]);

  const signOut = () => {
    localStorage.removeItem('stacksy-session');
    setSession(null);
    setPortal('user');
    setSessionValidated(true);
  };

  if (!sessionValidated) return <LoadingScreen label="Checking your space" />;

  if (!session?.token || !session?.user) return <AuthScreen onAuthenticated={(nextSession) => {
    localStorage.setItem('stacksy-session', JSON.stringify(nextSession));
    setSessionValidated(false);
    setPortal(nextSession.user.role === 'admin' ? 'admin' : 'user');
    setSession(nextSession);
  }} />;

  if (portal === 'admin' && session.user.role === 'admin') {
    return <AdminApp session={session} onBack={() => setPortal('user')} onSignOut={signOut} />;
  }

  return <UserApp session={session} onEnterAdmin={() => setPortal('admin')} onSignOut={signOut} />;
}

export default App;