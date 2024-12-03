class World extends IntervalGenerator {
    allLoadingPromises = [];
    worldLoadedPromise;
    sounds = {
        thememusic: new Audio('assets/audio/soundtrack.mp3'),
    };
    hero = new Hero();
    laserbeam = new Laserbeam();
    tokens = [];
    bombs = [];
    projectiles = []
    bombSymbols = [];
    enemies = [];
    boss;
    statusbar;
    bossStatusbar;
    backgrounds;
    foregrounds;
    length;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    isMuted = false;

    constructor(canvas, keyboard, level) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadLevel(level);
        this.initializeStatusbars();
        this.allLoadingPromises = [
            ...this.enemies.flatMap(enemy => enemy.loadingPromises),
            this.hero.loadingPromises,
            this.statusbar.loadingPromises
        ].flat();
        this.setWorld();
        this.sounds.thememusic.loop = true;
        this.worldLoadedPromise = Promise.all(this.allLoadingPromises).then(() => {
            this.setStoppableInterval(this.runGame.bind(this));
            this.draw();
        })
    }

    isCompleteyLoaded() {
        return this.worldLoadedPromise;
    }

    loadLevel(level) {
        this.enemies = level.enemies;
        this.boss = level.boss;
        this.enemies.push(this.boss);
        this.tokens = level.tokens;
        this.backgrounds = level.backgrounds;
        this.foregrounds = level.foregrounds;
        this.length = level.length;
    }

    initializeStatusbars() {
        this.statusbar = new Statusbar(-30, 20, 730, 205, this.hero);
        this.bossStatusbar = new Statusbar(700, 20, 696, 146, this.boss);
    }

    setWorld() {
        this.hero.world = this;
        this.enemies.forEach(enemy => {
            enemy.world = this;
        })
    }

    drawObject(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }
        this.ctx.drawImage(object.img, object.posX, object.posY, object.width, object.height);
        if (object.otherDirection) {
            this.reverseFlipImage(object);
        }
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.posX = object.posX * -1;
    }

    reverseFlipImage(object) {
        this.ctx.restore();
        object.posX = object.posX * -1;
    }

    draw() {
        this.resetCanvas();
        // this.drawBackgrounds();
        this.drawObjects(this.backgrounds)
        this.drawObject(this.hero);
        this.drawObjects(this.enemies)
        this.drawObjects(this.bombs)
        this.drawObjects(this.projectiles)
        this.drawObjects(this.tokens)
        this.drawLaserbeam();
        this.drawObjects(this.foregrounds)
        this.ctx.translate(this.cameraX * -1, 0);
        this.drawStatusbars();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
    }

    drawObjects(objects) {
        objects.forEach(object => {
            this.drawObject(object);
        });
    }

    drawLaserbeam() {
        if (this.hero.currentState == 'attacking') {
            this.drawObject(this.laserbeam);
        }
    }

    drawStatusbars() {
        this.drawObject(this.statusbar);
        if (this.boss.hasDetectedHero) {
            this.drawObject(this.bossStatusbar);
        }
        this.bombSymbols.forEach(symbol => {
            this.drawObject(symbol);
        })
    }

    runGame() {
        this.playThemeMusic();
        this.endGameIfHeroDead();
        this.endGameIfBossDead();
        this.removeExplodedRpojectilesFromWorld();
        this.updateStatusbars();
        this.handleTokens();
        this.handleEnemies();
        this.handleProjectiles();
    }

    playThemeMusic() {
        if (!this.isMuted) {
            this.sounds.thememusic.play();
        }
    }

    endGameIfHeroDead() {
        if (this.hero.dieAnimationPlayed && this.hero.sounds.die.ended) {
            this.muteSounds();
            this.stopGame('lose');
        }
    }

    endGameIfBossDead() {
        if (this.boss.dieAnimationPlayed && this.boss.sounds.die.ended) {
            this.muteSounds();
            this.stopGame('win');
        }
    }

    handleTokens() {
        for (let i = this.tokens.length - 1; i >= 0; i--) {
            const token = this.tokens[i];
            let distanceTokenToHero = this.calcDistance(token, this.hero);
            if (distanceTokenToHero < 50) {
                this.removeElementFromWorld(this.tokens, i)
                if (token instanceof BombToken) {
                    this.hero.addBombToInventory();
                    if (!this.isMuted) {
                        token.sounds.pickup.play();
                    }
                    this.addBombSymbolToStatusbar();
                } if (token instanceof HealthpackToken) {
                    this.hero.applyHealthPack(token)
                }
            }
        }
    }

    handleEnemies() {
        this.enemies.forEach(enemy => {
            if (enemy.currentState != 'dead') {
                let distanceToEnemy = this.calcDistance(enemy, this.hero);
                if (enemy instanceof EnemyWithClub) {
                    enemy.actBasedOnDistance(distanceToEnemy, this.hero);
                } if (enemy instanceof EnemyWithGun || enemy instanceof Drone) {
                    enemy.shootAtHeroIfDeteced();
                } if (this.hero.currentState == 'attacking' && this.isHitByLaserbeam(enemy)) {
                    enemy.reactToLaserbeam(this.laserbeam.power);
                } if (distanceToEnemy <= enemy.detectionRange) {
                    enemy.detectHero();
                }
                this.handleEnemyReactionsToBombs(enemy);
            }
        })
    }

    handleEnemyReactionsToBombs(enemy) {
        this.bombs.forEach(bomb => {
            let distanceBombToEnemy = this.calcDistance(enemy, bomb);
            if (distanceBombToEnemy < bomb.range) {
                bomb.explode(enemy);
            }
        });
    }

    handleProjectiles() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            let distanceBulletToHero = this.calcDistance(projectile, this.hero);
            if (distanceBulletToHero < 150) {
                if (this.hero.isVulnerable()) {
                    if (projectile instanceof Bullet) {
                        this.hero.takeDamage(projectile.power);
                        this.removeElementFromWorld(this.projectiles, i)
                    } if (projectile instanceof Rocket) {
                        projectile.explode(this.hero);
                    }
                }
            }
        }
    }

    stopGame(status) {
        this.stopAllIntervals();
        this.sendGameEndEventToCanvas(status);
    }

    stopAllIntervals() {
        this.stopIntervals();
        this.hero.stopIntervals();
        this.enemies.forEach(enemy => {
            enemy.stopIntervals();
        });
        this.bombs.forEach(bomb => {
            bomb.stopIntervals();
        });
        this.projectiles.forEach(projectile => {
            projectile.stopIntervals();
        });
    }

    sendGameEndEventToCanvas(status) {
        const event = new CustomEvent('gameOver', {
            detail: { status: status }
        });
        this.canvas.dispatchEvent(event);
    }

    calcDistance(obj, obj2) {
        let dx = (obj.posX + obj.width / 2) - (obj2.posX + obj2.width / 2);
        let dy = (obj.posY + obj.height / 2) - (obj2.posY + obj2.height / 2);
        if (obj2 instanceof Hero) {
            dy = dy - obj2.offsetY;
        }
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }

    isHitByLaserbeam(enemy) {
        let enemyOffsetX = 260;
        let enemyOffsetY = 240;
        if (this.laserbeam.posX < enemy.posX + enemy.width - enemyOffsetX &&
            this.laserbeam.posX + this.laserbeam.width > enemy.posX + enemyOffsetX &&
            this.laserbeam.posY < enemy.posY + enemy.height - enemyOffsetY &&
            this.laserbeam.posY + this.laserbeam.height > enemy.posY + enemyOffsetY) {
            return true;
        } else {
            return false;
        }
    }

    addBombSymbolToStatusbar() {
        let offsetX = (this.hero.numberOfBombs - 1) * 50
        let bombSymbol = new BombSymbol(offsetX);
        this.bombSymbols.push(bombSymbol);
    }

    removeElementFromWorld(array, index) {
        array.splice(index, 1);
    }

    removeExplodedRpojectilesFromWorld() {
        this.bombs = this.bombs.filter(bomb => !bomb.isExploded);
        this.projectiles = this.projectiles.filter(projectile => !projectile.isExploded);
    }

    updateStatusbars() {
        this.statusbar.updateStatus();
        if (this.boss.hasDetectedHero) {
            this.bossStatusbar.updateStatus();
        }
    }

    toggleMuteAll() {
        this.isMuted = !this.isMuted;
        this.hero.isMuted = !this.hero.isMuted;
        this.enemies.forEach(enemy => {
            enemy.isMuted = !enemy.isMuted;
        });
        this.bombs.forEach(bomb => {
            bomb.isMuted = !bomb.isMuted;
        });
        this.tokens.forEach(token => {
            token.isMuted = !token.isMuted;
        });
        this.projectiles.forEach(projectile => {
            projectile.isMuted = !projectile.isMuted;
        });
        if (this.isMuted) {
            this.muteSounds();
        }
    }

    muteSounds() {
        Object.values(this.sounds).forEach(sound => sound.pause());
    }
}