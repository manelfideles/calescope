import { PageTemplate } from '../components/PageTemplate';
import { Home } from '../pages/Home';
import { Settings } from '../pages/Settings';
import { Faqs } from '../pages/Faqs';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Data } from '../pages/Data';
import { Route } from '../utils/types';

export const routes: Route[] = [
  {
    path: '/',
    pageName: '🔥',
    element: (
      <PageTemplate
        pageContent={<Home />}
        hasFixedHeight={false}
        footerBgColor='purple.600'
      />
    ),
  },
  {
    path: '/dashboard',
    pageName: 'Dashboard',
    element: <Dashboard />,
    showIfLoggedOut: false,
  },
  {
    path: '/settings',
    pageName: 'Settings',
    element: <PageTemplate pageContent={<Settings />} />,
    showIfLoggedOut: false,
  },
  {
    path: '/login',
    pageName: 'Login',
    element: <PageTemplate pageContent={<Login />} />,
    showIfLoggedOut: true,
  },
  {
    path: '/register',
    pageName: 'Register',
    element: <PageTemplate pageContent={<Register />} />,
    showIfLoggedOut: true,
  },
];
