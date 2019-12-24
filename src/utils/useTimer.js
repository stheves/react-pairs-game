import { useEffect, useState } from 'react';

const useTimer = (startDate = new Date(), timeout = 1000) => {
   const [time, setTime] = useState(startDate);
   useEffect(() => {
      function handler() {
         setTime(new Date());
      }

      const handle = setTimeout(handler, timeout);
      return () => clearInterval(handle);
   }, [time, timeout]);

   return { time };
};
export default useTimer;
