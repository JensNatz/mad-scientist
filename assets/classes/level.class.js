class Level {
    enemies;
    boss;
    backgrounds;
    foregrounds;
    length;

    constructor(enemies, boss, tokens, backgrounds, foregrounds, length){
        this.enemies = enemies;
        this.boss = boss;
        this.tokens = tokens;
        this.backgrounds = backgrounds;
        this.foregrounds = foregrounds;
        this.length = length;
    }
}