import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const useAppRouter = (initialUrl = "/") => {
  const DUMMY_BASE = "https://www.sego.com/"
  const [url, setUrl] = useState(() => new URL(initialUrl, DUMMY_BASE));
  const {pathname}=useLocation();

  useEffect(()=>{

    const nextUrl = new URL(pathname, DUMMY_BASE);
    if (nextUrl.pathname !== url.pathname || nextUrl.search !== url.search) {
      setUrl(nextUrl);
    }

  },[pathname])

  const naviage = useNavigate();
  const router = useMemo(() => {
    return {
      pathname: url.pathname,
      searchParams: url.searchParams,
      navigate: (newUrl: string | URL) => {
        const nextUrl = new URL(newUrl, DUMMY_BASE);
        if (nextUrl.pathname !== url.pathname || nextUrl.search !== url.search) {
          setUrl(nextUrl);
          naviage(nextUrl.pathname + nextUrl.search)
        }
      }
    };
  }, [url.pathname, url.search, url.searchParams]);
  return router;
}


export default useAppRouter