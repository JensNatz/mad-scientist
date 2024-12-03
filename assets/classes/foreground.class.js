class Foreground extends MovableObject {
   
   constructor(path, posX, posY, width, height) {
       super().loadImage(path);
       this.posX = posX;
       this.posY = posY; 
       this.width = width;
       this.height = height;
   }
}
