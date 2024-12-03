class Bomb extends MovableObject {
    explodeImages = [
        'assets/img/bomb/explosion/skeleton-Fx2_0.png',
        'assets/img/bomb/explosion/skeleton-Fx2_1.png',
        'assets/img/bomb/explosion/skeleton-Fx2_2.png',
        'assets/img/bomb/explosion/skeleton-Fx2_3.png',
        'assets/img/bomb/explosion/skeleton-Fx2_4.png',
        'assets/img/bomb/explosion/skeleton-Fx2_5.png',
        'assets/img/bomb/explosion/skeleton-Fx2_6.png',
        'assets/img/bomb/explosion/skeleton-Fx2_7.png',
        'assets/img/bomb/explosion/skeleton-Fx2_8.png',
        'assets/img/bomb/explosion/skeleton-Fx2_9.png',
        'assets/img/bomb/explosion/skeleton-Fx2_10.png',
        'assets/img/bomb/explosion/skeleton-Fx2_11.png',
        'assets/img/bomb/explosion/skeleton-Fx2_12.png',
        'assets/img/bomb/explosion/skeleton-Fx2_13.png',
        'assets/img/bomb/explosion/skeleton-Fx2_14.png',
        'assets/img/bomb/explosion/skeleton-Fx2_15.png',
        'assets/img/bomb/explosion/skeleton-Fx2_16.png',
        'assets/img/bomb/explosion/skeleton-Fx2_17.png'
    ];
    image = 'assets/img/bomb/bomb.png';
    sounds = {
        explosion: new Audio('assets/audio/explosion.wav')
    };
    width = 199;
    height = 185;
    power = 15;
    range = 150;
    speedY = 50;
    isExploding = false;
    isExploded = false;

    constructor(posX, posY, speed) {
        super().loadImage(this.image);
        this.loadImagesInCache(this.explodeImages);
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.setStoppableInterval(this.animate.bind(this));
    }

    animate() {
        if (this.posY > 2000) {
            this.isExploded = true;
        }
        if (this.isExploding) {
            if (!this.isMuted) {
                this.sounds.explosion.play();
            }
            this.playExplodeAnimation();
        } else {
            this.fly();
        }
    }

    fly() {
        this.posX += this.speed;
        this.posY -= this.speedY;
        this.speedY -= 4;
    }

    explode(target) {
        if (!this.isExploding) {
            this.isExploding = true;
            target.takeDamage(this.power);
        }
    }

    playExplodeAnimation() {
        this.ensureAnimationStartsAtBeginning(this.explodeImages);
        this.playAnimation(this.explodeImages);
        if (this.currentImg % this.explodeImages.length === this.explodeImages.length - 1) {
            this.isExploded = true;
            this.isExploding = false;
        }
    }
}
