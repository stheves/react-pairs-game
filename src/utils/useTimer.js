import { useEffect, useRef, useState } from 'react';

const useTimer = (startDate = new Date()) => {
   const [time, setTime] = useState(startDate);
   const handle = useRef(0);

   useEffect(() => {
      handle.current = setTimeout(tick, 1000);
      return () => cancel();
   });

   function tick() {
      setTime(new Date());
   }

   function cancel() {
      if (handle.current) {
         clearTimeout(handle.current);
      }
   }

   return { time, cancel };
};
export default useTimer;
