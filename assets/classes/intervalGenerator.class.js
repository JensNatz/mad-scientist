class IntervalGenerator {

   intervals = [];
   setStoppableInterval(fn){
      let id = setInterval(fn, 1000/16);
      this.intervals.push(id);
   }

   stopIntervals(){
      this.intervals.forEach(interval => {
         clearInterval(interval);
      });
   }
}