function formatMillis(millis) {
   const ms = millis % 1000;
   millis = (millis - ms) / 1000;
   const s = millis % 60;
   millis = (millis - s) / 60;
   const m = millis % 60;
   const h = (millis - m) / 60;

   function pad(ms) {
      return ('00' + ms).slice(-2);
   }

   return pad(h) + ':' + pad(m) + ':' + pad(s);
}

export default formatMillis;
