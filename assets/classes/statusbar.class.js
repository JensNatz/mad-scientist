class Statusbar extends DrawableObject {
    statusImages = [];
    statusImageCache = {};
    currentImg = 0;
    character;
    maxHp;

    constructor(posX, posY, width, height, character) {
        super();
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.character = character;
        this.statusImages = character.statusbarImages;
        this.loadImage(this.statusImages[10]);
        this.maxHp = character.hp
        this.loadingPromises = [
            this.loadImagesInCache(this.statusImages)
        ];
    }

    updateStatus() {
        let hp = this.calculateHpPercentage();
        if (hp <= 0) {
            this.img = this.imageCache[this.statusImages[0]];
        } else if (hp <= 10) {
            this.img = this.imageCache[this.statusImages[1]];
        } else if (hp <= 20) {
            this.img = this.imageCache[this.statusImages[2]];
        } else if (hp <= 30) {
            this.img = this.imageCache[this.statusImages[3]];
        } else if (hp <= 40) {
            this.img = this.imageCache[this.statusImages[4]];
        } else if (hp <= 50) {
            this.img = this.imageCache[this.statusImages[5]];
        } else if (hp <= 60) {
            this.img = this.imageCache[this.statusImages[6]];
        } else if (hp <= 70) {
            this.img = this.imageCache[this.statusImages[7]];
        } else if (hp <= 80) {
            this.img = this.imageCache[this.statusImages[8]];
        } else if (hp <= 90) {
            this.img = this.imageCache[this.statusImages[9]];
        } else if (hp <= 100) {
            this.img = this.imageCache[this.statusImages[10]];
        }
    }

    calculateHpPercentage() {
        let hpPercentage = (this.character.hp / this.maxHp) * 100;
        return Math.max(0, Math.min(100, hpPercentage));
    }
}