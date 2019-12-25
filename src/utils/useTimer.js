import { useEffect, useRef, useState } from 'react';

const NO_HANDLE = -1;
const useTimer = () => {
   const [startMillis, setStartMillis] = useState(Date.now());
   const [elapsed, setElapsed] = useState(0);
   const [stopped, setStopped] = useState(null);
   const handle = useRef(NO_HANDLE);

   useEffect(() => {
      function tick() {
         const elapsed = Date.now() - startMillis;
         setElapsed(elapsed);
      }

      function cancel() {
         handle.current && clearInterval(handle.current);
      }

      if (!stopped) {
         handle.current = setInterval(tick, 1000);
      }

      return () => cancel();
   }, [stopped, startMillis]);

   function stop() {
      setStopped(true);
   }

   function start() {
      setStopped(false);
   }

   function restart() {
      setStopped(false);
      setStartMillis(Date.now());
      setElapsed(0);
   }

   // noinspection JSUnusedGlobalSymbols
   return { elapsed, start, stop, restart };
};
export default useTimer;
