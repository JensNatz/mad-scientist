class MovableObject extends DrawableObject {
    speed = 1;

    moveRight() {
        this.posX = this.posX + this.speed;
    }
    
    moveLeft() {
        this.posX = this.posX - this.speed;
    }
}