class Keyboard {
   KEYPRESSED = false;
   SPACE = false;
   UP = false;
   DOWN = false;
   LEFT = false;
   RIGHT = false;
   W = false;
   A = false;

   constructor() {
      this.bindKeyEvents();
      this.bindButtonEvents();
   }

   bindKeyEvents() {
      window.addEventListener('keydown', (event) => {
         this.KEYPRESSED = true;
         switch (event.code) {
            case 'ArrowLeft':
               this.LEFT = true;
               break;
            case 'ArrowRight':
               this.RIGHT = true;
               break;
            case 'Space':
               this.SPACE = true;
               break;
            case 'KeyW':
               this.W = true;
               break;
            case 'KeyA':
               this.A = true;
               break;
         }
      });

      window.addEventListener('keyup', (event) => {
         this.KEYPRESSED = false;
         switch (event.code) {
            case 'ArrowLeft':
               this.LEFT = false;
               break;
            case 'ArrowRight':
               this.RIGHT = false;
               break;
            case 'Space':
               this.SPACE = false;
               break;
            case 'KeyW':
               this.W = false;
               break;
            case 'KeyA':
               this.A = false;
               break;
         }
      });
   }
      
   bindButtonEvents() {
      document.getElementById('btn-left').addEventListener('touchstart', () => {
         this.LEFT = true;
         this.KEYPRESSED = true;
      });
      document.getElementById('btn-left').addEventListener('touchend', () => {
         this.LEFT = false;
         this.KEYPRESSED = false;
      });

      document.getElementById('btn-right').addEventListener('touchstart', () => {
         this.RIGHT = true;
         this.KEYPRESSED = true;
      });
      document.getElementById('btn-right').addEventListener('touchend', () => {
         this.RIGHT = false;
         this.KEYPRESSED = false;
      });

      document.getElementById('btn-jump').addEventListener('touchstart', () => {
         this.SPACE = true;
         this.KEYPRESSED = true;
      });
      document.getElementById('btn-jump').addEventListener('touchend', () => {
         this.SPACE = false;
         this.KEYPRESSED = false;
      });

      document.getElementById('btn-laser').addEventListener('touchstart', () => {
         this.A = true;
         this.KEYPRESSED = true;
      });
      document.getElementById('btn-laser').addEventListener('touchend', () => {
         this.A = false;
         this.KEYPRESSED = false;
      });

      document.getElementById('btn-bomb').addEventListener('touchstart', () => {
         this.W = true;
         this.KEYPRESSED = true;
      });
      document.getElementById('btn-bomb').addEventListener('touchend', () => {
         this.W = false;
         this.KEYPRESSED = false;
      });
   }
}