import { useEffect, useRef, useState } from 'react';

const useTimer = (startDate = new Date()) => {
   const NO_HANDLE = -1;
   const [time, setTime] = useState(startDate);
   const handle = useRef(NO_HANDLE);

   useEffect(() => {
      handle.current = setTimeout(tick, 1000);
      return () => cancel();
   });

   function tick() {
      setTime(new Date());
   }

   function cancel() {
      if (handle.current !== NO_HANDLE) {
         clearTimeout(handle.current);
      }
   }

   return { time, cancel };
};
export default useTimer;
