import { useEffect } from 'react';

const useTimer = (handler, timeout = 1000) => {
   useEffect(() => {
      const handle = setTimeout(handler, timeout);
      return () => clearTimeout(handle);
   }, [handler, timeout]);
};
export default useTimer;
