class Bullet extends MovableObject {
    image = 'assets/img/projectile/yellow_bullet.png';
    width = 136;
    height = 23;
    power = 10;
    speed = 25;
    posY = 520;

    constructor(posX) {
        super().loadImage(this.image);
        this.posX = posX;
        this.setStoppableInterval(this.animate.bind(this));
    }

    animate() {
        if (this.otherDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }
}
