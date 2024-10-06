import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from "react";
import { setTheme } from '@/store/slices/themeSlice'; 
import "@/style/main.css";
import "@/style/font.css";
import 'react-quill/dist/quill.snow.css';
import 'lightbox.js-react/dist/index.css';
import { usePathname } from "next/navigation";
import store, { persistor } from '@/store/store'; 
import Signin from './auth/signin';

function MainApp({ Component, pageProps }) {
  const pageUrl = usePathname();
  const token = useSelector((state) => state.auth.token);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  // Detect and apply system theme on load
  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    dispatch(setTheme(systemTheme));  // Set the initial theme based on system preference

    // Watch for system theme changes dynamically
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      dispatch(setTheme(newTheme));  // Update Redux theme state on system change
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [dispatch]);

  // Apply theme to the document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let pageClass = pageUrl.substring(1).replace(/\//g, '-');
    pageClass = pageClass.replace(/-$/, '');
    document.body.classList.add(pageClass ? pageClass : 'dashboard');
    return () => {
      document.body.classList.remove(pageClass ? pageClass : 'dashboard');
    };
  }, [pageUrl]);

  return token ? <Component {...pageProps} /> : <Signin />;
}

export default function App(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp {...props} />
      </PersistGate>
    </Provider>
  );
}
