import { Texto } from './texto.js';
import { TextoHija1 } from './textoHija1.js';

export class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'game'});
    }

    init(){
        this.score = 0;
    }

    preload() {
        this.load.image('background', 'img/MaderaP.png');
        this.load.image('pasto', 'img/Camino casa.png');
        this.load.image('muro1', 'img/Negro.png');
        this.load.image('ball', 'img/ball.png');
        this.load.image('casa', 'img/Boton.png');
        this.load.image('tapete', 'img/Tapete.PNG');
        this.load.image('mesa', 'img/Mesa.png');
        this.load.image('todo', 'img/InteriorC.png');
        this.load.image('luz', 'img/Luz.png');
        this.load.image('zona', 'img/Casa.png');
        this.load.image('luzCasa', 'img/LUZCASA.png');
        this.load.image('cerca', 'img/CERCA.png');
        this.load.image('titulo', 'img/Titulo.png');
        this.load.image('play', 'img/PLAY.png');
        this.load.image('recomendaciones', 'img/Recomendaciones.png');
        this.load.image('nevera', 'img/Nevera2.png');
        this.load.image('sofa', 'img/Sofa_Normal.png');
        // personajes y texto
        this.load.spritesheet('personaje', 'img/Madre frente.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('Hija', 'img/hija 128.png', { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet('fondoBatalla', 'img/Batalla1.png', { frameWidth: 1300, frameHeight: 600 });
     
        // sonidos
        this.load.audio('Sbalon', 'Sonido/1/BALON F.mp3');
        this.load.audio('puertaOP', 'Sonido/PUERTA F.mp3');
        this.load.audio('musica', 'Sonido/Musica inicio.mp3');
        this.load.audio('textos', 'Sonido/Sound POke.mp3');
    }
    create() {
        this.physics.world.setBoundsCollision(true, true, true, true);

        
        this.textoPoke = this.sound.add('textos');

        this.add.image(650, 300, 'background');

        this.cursors = this.input.keyboard.createCursorKeys()

        this.muro1 = this.physics.add.image(20, 250, 'muro1');
        this.muro1.body.allowGravity = false;
        this.muro1.setDisplaySize(50, 800); 
        this.muro1.setImmovable();

        this.muro2 = this.physics.add.image(1280, 250, 'muro1');
        this.muro2.body.allowGravity = false;
        this.muro2.setDisplaySize(50, 800); 
        this.muro2.setImmovable();

        this.muro3 = this.physics.add.image(650, 25, 'muro1');
        this.muro3.body.allowGravity = false;
        this.muro3.setDisplaySize(1300, 50); 
        this.muro3.setImmovable();

        this.pmuro3 = this.physics.add.image(650, 85, 'muro1');
        this.pmuro3.body.allowGravity = false;
        this.pmuro3.setDisplaySize(1300, 50); 
        this.pmuro3.setImmovable();

        this.muro4 = this.physics.add.image(1060, 535, 'muro1');
        this.muro4.body.allowGravity = false;
        this.muro4.setDisplaySize(690, 50); 
        this.muro4.setImmovable();

        this.pmuro4 = this.physics.add.image(240, 535, 'muro1');
        this.pmuro4.body.allowGravity = false;
        this.pmuro4.setDisplaySize(690, 50); 
        this.pmuro4.setImmovable();

        this.todo = this.physics.add.image(650, 300, 'todo').setImmovable();
        this.todo.body.allowGravity = false; 
        this.todo.setImmovable();

        this.luz = this.physics.add.image(1000, 100, 'luz').setImmovable();
        this.luz.body.allowGravity = false; 
        this.luz.setImmovable();

        this.nevera = this.physics.add.image(130, 110, 'nevera').setImmovable();
        this.nevera.body.allowGravity = false; 
        this.nevera.setImmovable();

        this.sofa = this.physics.add.image(1200, 295, 'sofa').setImmovable();
        this.sofa.body.allowGravity = false; 
        this.sofa.setImmovable();

        // texto de la puntuación
        this.scoreText = this.add.text(60,20, 'PUNTOS: 0', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });

        //hija personaje
        this.Hija = this.physics.add.sprite(300, 110, 'Hija').setImmovable();
        this.Hija.body.allowGravity = false;
        this.Hija.setScale(0.8);
        this.Hija.setCollideWorldBounds(true);
        //Animación Hija
        this.anims.create({
            key: 'neutralH',
            frames: this.anims.generateFrameNumbers('Hija', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.Hija.anims.play('neutralH');

        this.Tapete = this.physics.add.image (650, 590, 'tapete');
        this.Tapete.body.allowGravity = false;
        this.Tapete.setImmovable();
        this.Tapete.setScale(1.25);
        this.tapeteInteractuable = false;

        this.ball = this.physics.add.image(1000, 250, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setScale(1);
        this.ball.setBounce(0.8);
        this.ball.setVelocity(0, 0);
        this.ball.body.allowGravity = false;
        this.ballInteractuable = false;

        this.mesa = this.physics.add.image(300, 380, 'mesa').setImmovable();
        this.mesa.body.allowGravity = false;
        this.mesa.setScale(0.9);
        this.mesa.setCollideWorldBounds(true);

        this.PastoImagen = this.add.image(650, 300, 'pasto');
        this.PastoImagen.setScale(1);
        this.PastoImagen.visible = true;

        this.Casa = this.add.image(600, 180, 'casa');
        this.Casa.setScale(0.1);
        this.Casa.visible = true;
        this.casaInteractuable = true;

        this.zona = this.physics.add.image(650, 300, 'zona');
        this.zona.setScale(1);
        this.zona.body.allowGravity = false;
        this.zona.visible = true;
    

        //personaje
        this.personaje = this.physics.add.sprite(650, 450, 'personaje');
        this.personaje.body.allowGravity = false;
        this.personaje.setScale(0.8);
        this.personaje.setCollideWorldBounds(true);
        //animación del personaje
        this.anims.create({
            key: 'neutral',
            frames: this.anims.generateFrameNumbers('personaje', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('personaje', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.personaje.anims.play('neutral');

        this.luzCasa = this.add.image(650, 300, 'luzCasa');
        this.luzCasa.setScale(1);
        this.luzCasa.visible = true;

        this.cerca = this.physics.add.image(650, 300, 'cerca');
        this.cerca.setScale(1);
        this.cerca.body.allowGravity = false;
        this.cerca.visible = true;

     
        //texto madre
        this.Titulo = this.add.image(650, 300,'titulo');
        this.Titulo.visible = true;
        this.play = this.add.image(650, 450, 'play')
        this.play.setInteractive();
        this.play.visible = true;
        this.play.on('pointerdown', () => {
            this.textoPoke.play();
            this.play.visible = false;
            this.Titulo.visible = false;
            this.ins = this.add.image(650, 300,'recomendaciones');
            
            this.ins.visible = true;
            this.play1 = this.add.image(650, 550, 'play')
            this.play1.setInteractive();
            this.play1.visible = true;
                this.play1.on('pointerdown', () => {
                this.textoPoke.play();
                this.Titulo.visible = false;
                this.play1.visible = false;
                this.ins.visible = false;
                this.scene.add('texto', Texto, true);
                this.musica = this.sound.add('musica');
                this.musica.setLoop(true)
                this.musica.play();
                
            });
        });
        

        //texto hija1
        this.scene.add('TEXTOHIJA1', TextoHija1, true);

        this.physics.add.collider(this.ball, this.personaje, this.ejecutar, null, this);
        this.physics.add.collider(this.ball, this.muro1);
        this.physics.add.collider(this.ball, this.muro2);
        this.physics.add.collider(this.ball, this.muro3);
        this.physics.add.collider(this.ball, this.pmuro3);
        this.physics.add.collider(this.ball, this.muro4);
        this.physics.add.collider(this.ball, this.pmuro4);
        this.physics.add.collider(this.ball, this.luz);
        this.physics.add.collider(this.ball, this.Hija);
        this.physics.add.collider(this.personaje, this.Hija, this.mostrarTextoHija, null, this);
        this.physics.add.collider(this.personaje, this.muro1);
        this.physics.add.collider(this.personaje, this.muro2);
        this.physics.add.collider(this.personaje, this.muro3);
        this.physics.add.collider(this.personaje, this.muro4);
        this.physics.add.collider(this.personaje, this.pmuro3);
        this.physics.add.collider(this.personaje, this.pmuro4);
        this.physics.add.collider(this.personaje, this.zona);
        this.physics.add.collider(this.personaje, this.cerca);
        this.physics.add.collider(this.ball, this.sofa);
        
        this.mesaCollider = this.physics.add.collider(this.personaje, this.mesa);
        this.mesaCollider.active = false;
        
        this.muro4Collider = this.physics.add.collider(this.personaje, this.muro4);
        this.muro4Collider.active = false;

        this.pmuro4Collider = this.physics.add.collider(this.personaje, this.pmuro4);
        this.pmuro4Collider.active = false;

        this.ocultarTextoHija();
    
        //sonidos
        this.Sbalon = this.sound.add('Sbalon');
        this.PuertaOP = this.sound.add('puertaOP');

        //TECLAS
        this.keys = this.input.keyboard.addKeys('W,A,S,D');

        this.movement = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        
    }

    update() {
        
        // Si ninguna tecla de dirección está presionada y el personaje está en movimiento, detener el movimiento
        if (!this.keys.W.isDown && !this.keys.A.isDown && !this.keys.S.isDown && !this.keys.D.isDown &&
            (Math.abs(this.personaje.body.velocity.x) > 0 || Math.abs(this.personaje.body.velocity.y) > 0)) {
            this.personaje.setVelocity(0);
        }
    
        // Reiniciar la animación si el personaje está inactivo
        if (!this.keys.W.isDown && !this.keys.A.isDown && !this.keys.S.isDown && !this.keys.D.isDown) {
            this.personaje.anims.play('neutral', true);
        }
        if (this.keys.W.isDown || this.keys.A.isDown || this.keys.S.isDown || this.keys.D.isDown) {
            this.personaje.anims.play('walking', true);
        } else {
            // Reproducir la animación neutral si el personaje está inactivo
            this.personaje.anims.play('neutral', true);
        }
    //importante
        if (this.physics.overlap(this.personaje, this.Tapete) && this.tapeteInteractuable) {
            this.PastoImagen.visible = true;
            this.Casa.visible = true;
            this.zona.visible = true;
            this.luzCasa.visible = true;
            this.cerca.visible = true;
            this.tapeteInteractuable = false;
            this.personaje.setPosition(600, 255);
            this.casaInteractuable = true; // Activar la interacción con la casa
            this.PuertaOP.play();  
        } 
        
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.personaje.getBounds(), this.Casa.getBounds()) && this.casaInteractuable) {
            this.PastoImagen.visible = false;
            this.Casa.visible = false;
            this.zona.visible = false;
            this.luzCasa.visible = false;
            this.cerca.visible = false;
            this.tapeteInteractuable = true;
          
            this.PuertaOP.play();
    
            // Desactivar la interacción con la casa
            this.casaInteractuable = false;
            this.personaje.setPosition(650, 500);
        }
        if (this.PastoImagen.visible) {
            this.mesaCollider.active = false;
            this.muro4Collider.active = false;
            this.pmuro4Collider.active = false;
            
        } else {
            this.mesaCollider.active = true;
            this.muro4Collider.active = true;
            this.pmuro4Collider.active = true;
        }
        //movimiento
    
        if (this.keys.W.isDown) {
            this.personaje.setVelocityY(-150);
        } else if (this.keys.S.isDown) {
            this.personaje.setVelocityY(150); 
        } else {
            this.personaje.setVelocityY(0); 
        }
        
        if (this.keys.A.isDown) {
            this.personaje.setVelocityX(-150); 
        } else if (this.keys.D.isDown) {
            this.personaje.setVelocityX(150); 
        } else {
            this.personaje.setVelocityX(0); 
        }


        this.physics.world.collide(this.personaje, [this.muro1, this.muro2, this.muro3, this.muro4]);
      
    }
    mostrarTextoHija() {
        // Muestra el texto de la hija solo si no está visible
        
        if (!this.scene.get('TEXTOHIJA1').scene.isVisible()) {
            this.scene.get('TEXTOHIJA1').scene.setVisible(true);
        }
    }
    
    
    ocultarTextoHija() {
        // Desactiva la escena TEXTOHIJA1
        this.scene.get('TEXTOHIJA1').scene.setVisible(false);
    }
    ejecutar(ball, personaje) {
        this.Sbalon.play();
        
        this.score += 1; 
        this.scoreText.setText('PUNTOS: ' + this.score);

        let relativeImpact = ball.x - personaje.x;

        let bounceFactor = 0.4; // Ajusta este valor según sea necesario
        relativeImpact *= bounceFactor;

        // Al principio, la pelota va rápidamente
        this.ball.setVelocityX(this.ball.body.velocity.x * 1.8);
        this.ball.setVelocityY(this.ball.body.velocity.y * 1.8);

        // Después de un tiempo, la velocidad se reduce gradualmente
        this.time.delayedCall(500, () => {
            const elapsed = this.time.now - this.ball.getData('collisionTime');
            const factor = Math.max(0, 0.9 - (elapsed / 3000)); // La velocidad disminuye gradualmente hasta un mínimo de 0.1
            this.ball.setVelocityX(this.ball.body.velocity.x * factor);
            this.ball.setVelocityY(this.ball.body.velocity.y * factor);
        }, null, this);

        this.ball.setData('collisionTime', this.time.now); 
        this.mostrarTextoHija(true);
        
    }

}