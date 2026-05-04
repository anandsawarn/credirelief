import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext({
  pathname: '/',
  search: '',
  navigate: () => {}
});

const ParamsContext = createContext({});

function normalizePath(pathname) {
  if (!pathname) {
    return '/';
  }

  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function matchPath(routePath, pathname) {
  if (routePath === '*') {
    return {};
  }

  const routeParts = normalizePath(routePath).split('/').filter(Boolean);
  const pathParts = normalizePath(pathname).split('/').filter(Boolean);

  if (routeParts.length !== pathParts.length) {
    return null;
  }

  const params = {};

  for (let index = 0; index < routeParts.length; index += 1) {
    const routePart = routeParts[index];
    const pathPart = pathParts[index];

    if (routePart.startsWith(':')) {
      params[routePart.slice(1)] = decodeURIComponent(pathPart);
      continue;
    }

    if (routePart !== pathPart) {
      return null;
    }
  }

  return params;
}

export function BrowserRouter({ children }) {
  const [locationState, setLocationState] = useState(() => ({
    pathname: normalizePath(window.location.pathname),
    search: window.location.search || ''
  }));

  useEffect(() => {
    const syncLocation = () => {
      setLocationState({
        pathname: normalizePath(window.location.pathname),
        search: window.location.search || ''
      });
    };

    window.addEventListener('popstate', syncLocation);
    window.addEventListener('router:navigate', syncLocation);

    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('router:navigate', syncLocation);
    };
  }, []);

  const navigate = (to, options = {}) => {
    const replace = Boolean(options.replace);
    const targetUrl = new URL(to, window.location.origin);
    const nextPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;

    if (replace) {
      window.history.replaceState({}, '', nextPath);
    } else {
      window.history.pushState({}, '', nextPath);
    }

    window.dispatchEvent(new Event('router:navigate'));
  };

  const contextValue = useMemo(
    () => ({
      pathname: locationState.pathname,
      search: locationState.search,
      navigate
    }),
    [locationState.pathname, locationState.search]
  );

  return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>;
}

export function Route() {
  return null;
}

export function Routes({ children }) {
  const { pathname } = useContext(RouterContext);
  const routes = Array.isArray(children) ? children : [children];

  let wildcardElement = null;

  for (const routeNode of routes) {
    if (!routeNode || !routeNode.props) {
      continue;
    }

    const { path, element } = routeNode.props;

    if (path === '*') {
      wildcardElement = element;
      continue;
    }

    const params = matchPath(path, pathname);

    if (params) {
      return <ParamsContext.Provider value={params}>{element}</ParamsContext.Provider>;
    }
  }

  return wildcardElement ?? null;
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);

  return null;
}

export function Link({ to, onClick, children, ...rest }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function useParams() {
  return useContext(ParamsContext);
}

export function useSearchParams() {
  const { pathname, search, navigate } = useContext(RouterContext);
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const setSearchParams = (nextParams, options = {}) => {
    const next =
      nextParams instanceof URLSearchParams
        ? nextParams
        : typeof nextParams === 'string'
          ? new URLSearchParams(nextParams)
          : new URLSearchParams(nextParams || {});

    const query = next.toString();
    const target = query ? `${pathname}?${query}` : pathname;
    navigate(target, { replace: Boolean(options.replace) });
  };

  return [params, setSearchParams];
}
