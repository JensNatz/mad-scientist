function createLevel1() {   
    const enemies = [
        new EnemyWithClub(900),
        new EnemyWithGun(1500),
        new EnemyWithClub(3000),
        new EnemyWithClub(3200),
        new EnemyWithGun(4200),
        new EnemyWithClub(4500),
        new EnemyWithGun(5800),
        new EnemyWithGun(6000),
        new EnemyWithClub(7000),
        new EnemyWithClub(7100),
        new EnemyWithGun(7400),
        new EnemyWithClub(8400),
        new EnemyWithClub(8500),
        new EnemyWithClub(8600),
        new EnemyWithGun(9400),
    ];
    const boss = new Drone(10000);
    const tokens = [
        new HealthpackToken(2000),
        new BombToken(3700),
        new HealthpackToken(4900),
        new BombToken(5100),
        new HealthpackToken(6500),
        new HealthpackToken(6600),
        new BombToken(7800),
        new BombToken(7900),
        new HealthpackToken(8000),
        new HealthpackToken(8100),
        new BombToken(9000),
        new HealthpackToken(9400),
    ];
    const backgrounds = [
        new Background('assets/img/backgrounds/background.jpg', -150)
    ];
    const foregrounds = [
        new Foreground('assets/img/backgrounds/celing.png', -150, 0, 13842, 103),
        new Foreground('assets/img/backgrounds/floor.png', -104, 0, 13842, 784)
    ];
    const levelWidth = 10400;

    return new Level(enemies, boss, tokens, backgrounds, foregrounds, levelWidth);
}
