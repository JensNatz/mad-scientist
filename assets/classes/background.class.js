class Background extends MovableObject {
   posY = 0;
   width = 13019;
   height = 796;

   constructor(path, posX) {
       super().loadImage(path);
       this.posX = posX;
   }
}
