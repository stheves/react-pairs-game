import { useEffect, useRef, useState } from 'react';

const useTimer = (startDate = new Date(), timeout = 1000) => {
   const [time, setTime] = useState(startDate);
   const handle = useRef(0);

   function cancel() {
      if (handle.current) {
         clearInterval(handle.current);
      }
   }

   useEffect(() => {
      function handler() {
         setTime(new Date());
      }

      handle.current = setTimeout(handler, timeout);
      return () => cancel();
   }, [time, timeout]);

   return { time, cancel };
};
export default useTimer;
