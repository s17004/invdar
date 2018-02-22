// phina.js をグローバル領域に展開
phina.globalize();

//何かで使う定数値まとめて書く
const PLAYER_POSITION_Y = 500;
const PLAYER_DEFAULT_SPEED = 2;
const BULLET_DEFAULT_SPEED = 2;

// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',
    init: function(option) {
        this.superInit(option);
        // 背景色を指定
        this.backgroundColor = 'black';

        //自機を生成
        this.player = Player({
            image: 'player',
            x: this.gridX.center(),
            y: PLAYER_POSITION_Y,
            speed:PLAYER_DEFAULT_SPEED,
            bulletSpeed: BULLET_DEFAULT_SPEED
        }).addChildTo(this);
        //const player = Sprite('player').addChildTo(player);
        //player.x = this.gridX.center();
        //player.y = PLAYER_POSITION_Y;

    }
});
//自機クラス
phina.define('Player', {
    superClass: 'Sprite',
    init: function (option) {
        this.superInit(option.image);
        this.x = option.x;
        this.y = option.y;
        this.speed = option.speed;
        this.bulletSpeed = option.bulletSpeed;
        this.bullet = null;
    },

    update: function (app) {
        const key = app.keyboard;
        //キー入力をみて判断
        this.move(key);

        //スペースキーが押されたら弾発射
        if (key.getKey('space')) {
            this.shot();
        }
    },
    move: function (key) {
        if (key.getKey('left')){
            this.x -= this.speed;
        }
        if (key.getKey('right')) {
            this.x += this.speed;
        }
        //画面外に出ないようにする制御
        if (this.left < 0) {
            this.left = 0;
        }
        if (this.right > 800) {
            this.right = 800;
        }
    },
    shot: function () {
        if (this.bullet != null) {
            if (this.bullet.bottom < 0) {
                this.bullet.remove();
                this.bullet = null;
            }
            return;
        }
        this.bullet = Bullet({
            x: this.x,
            y: this.top,
            speed: this.bulletSpeed
        }).addChildTo(player.parent);
    }
});
// 弾クラスを作る
phina.difine('Bullet', {
    superClass: 'Shape',
    init: function (option) {
        this.superInit({
            width: 2,
            height: 10,
            padding: 0,
            backgroundColor: '#ddd',
            x: option.x,
            y: option.y
        });
        this.speed = option.speed;
    },
    update: function (app) {
        this.y -= this.speed;
    }
});

//アセット
const ASSETS = {
    image: {
        player: './image/player.png'
    }
};

// メイン処理
phina.main(function() {
    const app = GameApp({
        startLabel: 'main',
        assets: ASSETS,
        domElement: document.getElementById('display'),
        width: 800,
        height: 600,
        fps: 60,
        fit: false
    });

    app.enableStats();
    app.run();
});
