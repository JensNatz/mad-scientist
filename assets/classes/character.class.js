class Character extends MovableObject {
    world;
    hp;
    power;
    standardImunityTime = 0;
    currentDamageImmunityDuration = 0;
    walkImages;
    getHitImages;
    dieImages;
    idleImages;
    attackImages;
    getLaseredImages;
    hasDetectedHero = false;
    laserHitDuration = 0;
    currentState = 'idle';
    dieSoundPlayed = false;
    dieAnimationPlayed = false;

    playWalkingAnimation() {
        this.ensureAnimationStartsAtBeginning(this.walkImages);
        this.playAnimation(this.walkImages);
    }

    playGetHitAnimation() {
        this.ensureAnimationStartsAtBeginning(this.getHitImages);
        this.playAnimation(this.getHitImages);
        if (this.currentImg === this.getHitImages.length) {
            this.currentState = 'idle';
        }
    }

    playIdleAnimation() {
        this.ensureAnimationStartsAtBeginning(this.idleImages);
        this.playAnimation(this.idleImages);
    }

    playDieAnimation() {
        this.ensureAnimationStartsAtBeginning(this.dieImages);
        if (this.currentImg !== this.dieImages.length) {
            this.playAnimation(this.dieImages);
        } else {
            this.dieAnimationPlayed = true;
        }
    }

    playAttackingAnimation() {
        this.ensureAnimationStartsAtBeginning(this.attackImages);
        this.playAnimation(this.attackImages);
    }

    playLaseredAnimation() {
        this.ensureAnimationStartsAtBeginning(this.getLaseredImages);
        this.playAnimation(this.getLaseredImages);
    }

    reduceDamageImmunityDuration() {
        if (this.currentDamageImmunityDuration > 0) {
            this.currentDamageImmunityDuration--;
        }
    }

    reduceLaserHitDuration() {
        if (this.laserHitDuration > 0) {
            this.laserHitDuration--;
        }
    }

    takeDamage(power) {
        this.hp -= power;
        this.setImmunityToDamageTimer();
        if (this.currentState !== 'jumping') {
            this.currentState = 'hurting';
        }
        if (!this.isMuted) {
            this.sounds.takeDamage.play();
        }
    }

    reactToLaserbeam(power) {
        if (this.isVulnerable() && !this.isBeingLasered()) {
            this.takeLaserDamage(power);
        }
    }

    takeLaserDamage(power) {
        this.hp -= power;
        this.laserHitDuration = 10;
        this.currentState = 'lasered';
        this.setImmunityToDamageTimer();
        if (!this.isMuted) {
            this.sounds.takeDamage.play();
        }
    }

    setImmunityToDamageTimer() {
        this.currentDamageImmunityDuration = this.standardImunityTime;
    }

    isVulnerable() {
        return this.currentDamageImmunityDuration === 0;
    }

    isBeingLasered() {
        return this.laserHitDuration > 0;
    }

    detectHero() {
        this.hasDetectedHero = true;
    }
}
