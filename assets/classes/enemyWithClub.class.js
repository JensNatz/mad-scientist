class EnemyWithClub extends Character {
    idleImages = [
        'assets/img/enemyWithClub/Idle/Idle_00.png',
        'assets/img/enemyWithClub/Idle/Idle_01.png',
        'assets/img/enemyWithClub/Idle/Idle_02.png',
        'assets/img/enemyWithClub/Idle/Idle_03.png',
        'assets/img/enemyWithClub/Idle/Idle_04.png',
        'assets/img/enemyWithClub/Idle/Idle_05.png',
        'assets/img/enemyWithClub/Idle/Idle_06.png',
        'assets/img/enemyWithClub/Idle/Idle_07.png',
        'assets/img/enemyWithClub/Idle/Idle_08.png',
        'assets/img/enemyWithClub/Idle/Idle_09.png',
        'assets/img/enemyWithClub/Idle/Idle_10.png',
        'assets/img/enemyWithClub/Idle/Idle_11.png',
        'assets/img/enemyWithClub/Idle/Idle_12.png',
        'assets/img/enemyWithClub/Idle/Idle_13.png'
    ];
    walkImages = [
        'assets/img/enemyWithClub/Walk/Walk_00.png',
        'assets/img/enemyWithClub/Walk/Walk_01.png',
        'assets/img/enemyWithClub/Walk/Walk_02.png',
        'assets/img/enemyWithClub/Walk/Walk_03.png',
        'assets/img/enemyWithClub/Walk/Walk_04.png',
        'assets/img/enemyWithClub/Walk/Walk_05.png',
        'assets/img/enemyWithClub/Walk/Walk_06.png',
        'assets/img/enemyWithClub/Walk/Walk_07.png',
        'assets/img/enemyWithClub/Walk/Walk_08.png',
        'assets/img/enemyWithClub/Walk/Walk_09.png',
        'assets/img/enemyWithClub/Walk/Walk_10.png',
        'assets/img/enemyWithClub/Walk/Walk_11.png',
        'assets/img/enemyWithClub/Walk/Walk_12.png',
        'assets/img/enemyWithClub/Walk/Walk_13.png'
    ];
    attackImages = [
        'assets/img/enemyWithClub/Hit/Hit_00.png',
        'assets/img/enemyWithClub/Hit/Hit_01.png',
        'assets/img/enemyWithClub/Hit/Hit_02.png',
        'assets/img/enemyWithClub/Hit/Hit_03.png',
        'assets/img/enemyWithClub/Hit/Hit_04.png',
        'assets/img/enemyWithClub/Hit/Hit_05.png',
        'assets/img/enemyWithClub/Hit/Hit_06.png',
        'assets/img/enemyWithClub/Hit/Hit_07.png',
        'assets/img/enemyWithClub/Hit/Hit_08.png',
        'assets/img/enemyWithClub/Hit/Hit_09.png',
        'assets/img/enemyWithClub/Hit/Hit_10.png',
        'assets/img/enemyWithClub/Hit/Hit_11.png',
        'assets/img/enemyWithClub/Hit/Hit_12.png',
        'assets/img/enemyWithClub/Hit/Hit_13.png'
    ];
    dieImages = [
        'assets/img/enemyWithClub/Death/Death_00.png',
        'assets/img/enemyWithClub/Death/Death_01.png',
        'assets/img/enemyWithClub/Death/Death_02.png',
        'assets/img/enemyWithClub/Death/Death_03.png',
        'assets/img/enemyWithClub/Death/Death_04.png',
        'assets/img/enemyWithClub/Death/Death_05.png',
        'assets/img/enemyWithClub/Death/Death_06.png',
        'assets/img/enemyWithClub/Death/Death_07.png',
        'assets/img/enemyWithClub/Death/Death_08.png',
        'assets/img/enemyWithClub/Death/Death_09.png',
        'assets/img/enemyWithClub/Death/Death_10.png',
        'assets/img/enemyWithClub/Death/Death_11.png',
        'assets/img/enemyWithClub/Death/Death_12.png',
        'assets/img/enemyWithClub/Death/Death_13.png',
        'assets/img/enemyWithClub/Death/Death_14.png',
        'assets/img/enemyWithClub/Death/Death_15.png',
        'assets/img/enemyWithClub/Death/Death_16.png',
        'assets/img/enemyWithClub/Death/Death_17.png',
        'assets/img/enemyWithClub/Death/Death_18.png',
        'assets/img/enemyWithClub/Death/Death_19.png',
        'assets/img/enemyWithClub/Death/Death_20.png',
        'assets/img/enemyWithClub/Death/Death_21.png',
        'assets/img/enemyWithClub/Death/Death_22.png',
        'assets/img/enemyWithClub/Death/Death_23.png'
    ];
    getHitImages = [
        'assets/img/enemyWithClub/GetHit/Get_Hit_00.png',
        'assets/img/enemyWithClub/GetHit/Get_Hit_01.png',
        'assets/img/enemyWithClub/GetHit/Get_Hit_02.png',
        'assets/img/enemyWithClub/GetHit/Get_Hit_03.png',
        'assets/img/enemyWithClub/GetHit/Get_Hit_04.png',
        'assets/img/enemyWithClub/GetHit/Get_Hit_05.png',
        'assets/img/enemyWithClub/GetHit/Get_Hit_06.png',
        'assets/img/enemyWithClub/GetHit/Get_Hit_07.png',
        'assets/img/enemyWithClub/GetHit/Get_Hit_08.png',
        'assets/img/enemyWithClub/GetHit/Get_Hit_09.png'
    ];
    getLaseredImages = [
        'assets/img/enemyWithClub/GetElectric/Get_Electric_0.png',
        'assets/img/enemyWithClub/GetElectric/Get_Electric_1.png',
        'assets/img/enemyWithClub/GetElectric/Get_Electric_2.png'
    ];
    sounds = {
        attacking: new Audio('assets/audio/hitWithClub.flac'),
        takeDamage: new Audio('assets/audio/pain2.wav'),
        die: new Audio('assets/audio/death2.wav')
    };
    posY = 150;
    width = 650;
    height = 650;
    speed = 6;
    power = 10;
    hp = 10;
    standardImunityTime = 20;
    detectionRange = 800;
    hasDetectedHero = false;
    attackingDistance = 200;

    constructor(posX) {
        super().loadImage(this.walkImages[0]);
        this.posX = posX;

        this.loadingPromises = [
            this.loadImagesInCache(this.idleImages),
            this.loadImagesInCache(this.walkImages),
            this.loadImagesInCache(this.dieImages),
            this.loadImagesInCache(this.attackImages),
            this.loadImagesInCache(this.getHitImages),
            this.loadImagesInCache(this.getLaseredImages)
        ];

        Promise.all(this.loadingPromises).then(() => {
            this.setStoppableInterval(this.run.bind(this));
            this.setStoppableInterval(this.animate.bind(this));
        })
    }

    run() {
        this.reduceLaserHitDuration();
        this.reduceDamageImmunityDuration();
        this.checkIfDead();
        this.checkLaseredState();
    }

    checkIfDead() {
        if (this.hp <= 0 && (this.currentState != 'lasered' || this.currentState != 'hurting')) {
            this.currentState = 'dead';
            if (!this.dieSoundPlayed) {
                if (!this.isMuted) {
                    this.sounds.die.play();
                }
                this.dieSoundPlayed = true;
            }
        }
    }

    checkLaseredState() {
        if (this.currentState == 'lasered' && !this.isBeingLasered()) {
            this.currentState = 'idle';
        }
    }

    animate() {
        if (this.currentState == 'dead') {
            this.playDieAnimation();
        } if (this.currentState == 'walking') {
            this.playWalkingAnimation();
            this.moveTowardsHero();
        } if (this.currentState == 'hurting') {
            this.playGetHitAnimation();
        } if (this.currentState == 'lasered') {
            this.playLaseredAnimation();
        } if (this.currentState == 'attacking') {
            this.playAttackingAnimation();
        } if (this.currentState == "idle") {
            this.playIdleAnimation();
        }
    }

    moveTowardsHero() {
        this.currentState = 'walking';
        if (this.posX + this.width / 2 > this.world.hero.posX + this.world.hero.width / 2) {
            this.moveLeft();
            this.otherDirection = false;
        } else {
            this.moveRight();
            this.otherDirection = true;
        }
    }

    actBasedOnDistance(distanceToHero, hero) {
        if (this.hasDetectedHero && !this.isBeingLasered()) {
            if (distanceToHero < this.attackingDistance) {
                this.attackHero(hero);
            } else {
                this.moveTowardsHero();
            }
        }
    }

    attackHero(hero) {
        this.currentState = 'attacking';
        if (hero.isVulnerable()) {
            hero.takeDamage(this.power);
        }
        if (!this.isMuted) {
            this.sounds.attacking.play();
        }
    }
}
