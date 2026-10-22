import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Go back in history; if the page was opened directly (no history), go home.
export default function useGoBack(fallback = '/home') {
  const navigate = useNavigate();
  return useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) navigate(-1);
    else navigate(fallback, { replace: true });
  }, [navigate, fallback]);
}
