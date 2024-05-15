export class TextoHija1 extends Phaser.Scene {
    constructor() {
        super({ key: 'TEXTOHIJA1' });
        this.textoCount = 0;
        this.musicaB = null;
        this.musica1 = null;
        this.teclaEContador = 0;
        this.musicaBIniciada = false;
        this.musica1Iniciada = false;
    }

    preload() {
        this.load.spritesheet('textoH', 'img/TextoHija1.png', { frameWidth: 847, frameHeight: 100 });
        this.load.spritesheet('personajeAmarillo', 'img/Madre 128AMARILLO.png', { frameWidth: 128, frameHeight: 128 });

        this.load.spritesheet('fondoBatalla', 'img/Batalla1.png', { frameWidth: 1300, frameHeight: 600 });
        this.load.spritesheet('taza', 'img/TAZA.png', { frameWidth: 200, frameHeight: 300 });
        this.load.spritesheet('textoB1', 'img/Texto B A.png', { frameWidth: 847, frameHeight: 100 });
        this.load.spritesheet('tabla', 'img/Operaciónes.png', { frameWidth: 469, frameHeight: 500 });
        this.load.spritesheet('respuestas1', 'img/RESPUESTA 1.png', { frameWidth: 226, frameHeight: 100 });
        this.load.spritesheet('respuestas2', 'img/RESPUESTAS 2.png', { frameWidth: 226, frameHeight: 100 });
        this.load.spritesheet('transText', 'img/transformadas.png', { frameWidth: 847, frameHeight: 100 });
        this.load.spritesheet('LAPLACE', 'img/LAPLACE.png', { frameWidth: 1300, frameHeight: 500 });
        this.load.spritesheet('textCK', 'img/Text constantes.png', { frameWidth: 847, frameHeight: 100 });
        this.load.spritesheet('textF', 'img/FINAL.png', { frameWidth: 847, frameHeight: 100 });
        this.load.spritesheet('tablaF', 'img/Oper2.png', { frameWidth: 469, frameHeight: 500 });
        this.load.spritesheet('chocolate', 'img/CHOCOLATE.png', { frameWidth: 452, frameHeight: 100 });
        this.load.spritesheet('TextoFinal', 'img/TEXTO FINAL.png', { frameWidth: 847, frameHeight: 100 });

        this.load.audio('textos', 'Sonido/Sound POke.mp3');
        this.load.audio('pop', 'Sonido/POP FI.mp3');
        this.load.audio('batallaS', 'Sonido/MUSICA BATALLA.mp3');
        this.load.audio('daño', 'Sonido/DAÑO F.mp3');
        this.load.audio('musica1', 'Sonido/Musica inicio.mp3');
        this.load.audio('win', 'Sonido/win.mp3');

        this.load.video('Casa Amarilla v', 'Sonido/1/CASA AMARILLA FINAL.mp4');
        this.load.video('trancisionBatalla', 'Sonido/1/TrancisionBATALLA.mp4');

        this.load.image('Estatica', 'img/CASAAMARILLA.png');
        this.load.image('TextoMA', 'img/Texto Madre A.png');
        this.load.image('blanco', 'img/blanco.jpg');
        this.load.image('piso', 'img/MaderaP.png');
        this.load.image('pelota', 'img/ball.png');
        this.load.image('salida', 'img/Tapete.PNG');
        this.load.image('mesa1', 'img/Mesa.png');
        this.load.image('todo1', 'img/InteriorC.png');
        this.load.image('nevera', 'img/Nevera2.png');
        this.load.image('sofa', 'img/Sofa_Normal.png');
        this.load.image('luzCasa1', 'img/Luz.png');
        this.load.image('gracias', 'img/GRACIAS.png');
        
        this.load.spritesheet('personaje', 'img/Madre frente.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('hija', 'img/hija 128.png', { frameWidth: 128, frameHeight: 128 });
    }

    create() {
        this.textoH = this.physics.add.sprite(650, 550, 'textoH');
        this.textoH.body.allowGravity = false;
        this.currentFrame = 0;
        this.textoH.setFrame(this.currentFrame);

        this.keys = this.input.keyboard.addKeys('E');
        this.interactable = true;

        this.textoPoke = this.sound.add('textos');

        this.pop = this.sound.add('pop');

        this.daño = this.sound.add('daño');

        this.win = this.sound.add('win');

        this.videoSprite = this.add.video(650, 300, 'Casa Amarilla v');
        this.videoSprite.on('play', this.detenerMusica, this);

        this.textoMAVisible = false;

        if (!this.musicaB) {
            this.musicaB = this.sound.add('batallaS');
        }
        if (!this.musica1) {
            this.musica1 = this.sound.add('musica1');
        }
    }
    detenerMusica = () => {
    }
    detenerMusica= () => {
        const gameScene = this.scene.get('game');
        if (gameScene && gameScene.musica) {
            gameScene.musica.stop(); // Detener la música en la escena del juego
        }
        }
   
    update() {
        if (this.keys.E.isDown && this.interactable) {
           
            this.teclaEContador++;
            if (!this.videoPlaying) { // Verificar si el video no está en reproducción
                this.FotogramaTexto();
                this.videoPlaying = true;
            }
            if (this.textoMA && this.textoMAVisible) {
                this.textoMAVisible = false;
                this.textoMA.setVisible(false);
    
                // Emitir el evento cuando el textoMA se vuelve invisible
            }
            this.FotogramaTexto();
            this.interactable = false; // Evita múltiples activaciones
            this.textoPoke.play();
    
            this.time.delayedCall(600, () => {
                this.interactable = true;
            });
            
        
       
    }
  
}

FotogramaTexto() {
    this.interactable = false;

    if (this.currentFrame < 23) {
        this.currentFrame++;
        this.textoH.setFrame(this.currentFrame);
        this.interactable = false;
    } else {
        this.videoSprite.play();
        if (this.teclaEContador >= 24) {
            this.videoSprite.destroy();
            this.videoPlaying = false;

            this.imagen = this.physics.add.image(650, 300, 'Estatica');
            this.imagen.body.allowGravity = false;
            this.imagen.visible = true;

            // Agregar el personaje amarillo después de la imagen estática
            this.personajeAmarillo = this.physics.add.sprite(650, 300, 'personajeAmarillo');
            this.personajeAmarillo.body.allowGravity = false;
            this.personajeAmarillo.setScale(0.8);

            // Animación del personaje amarillo
            this.anims.create({
                key: 'neutral1_hija',
                frames: this.anims.generateFrameNumbers('personajeAmarillo', { start: 0, end: 3 }),
                frameRate: 4,
                repeat: -1
            });
            this.personajeAmarillo.anims.play('neutral1_hija');
            this.pop.play();
            
                this.textoMA = this.add.sprite(650, 550, 'TextoMA');
                this.textoMAVisible = true;

               
        };
      
        if (this.teclaEContador >= 25) {
            this.imagen.destroy();
            this.textoMA.destroy();
            this.personajeAmarillo.destroy();
            this.pop.stop();
            this.TrancisiónBatalla = this.add.video(650, 300, 'trancisionBatalla');
            this.TrancisiónBatalla.play();
            this.iniciarMusicaBatalla();
          
        }
        if (this.teclaEContador >= 26) {
            this.TrancisiónBatalla.destroy();
            //FONDOBATALLA
            this.fondoBatalla = this.add.sprite(650, 300, 'fondoBatalla');
               this.anims.create({
                key: 'batalla',
               frames: this.anims.generateFrameNumbers('fondoBatalla', { start: 0, end: 1 }),
               frameRate: 4,
               repeat: -1
                });
            this.fondoBatalla.anims.play('batalla');
            //TAZA CHOCOLATE
            this.taza = this.add.sprite(565, 222, 'taza');
               this.anims.create({
                key: 'tazaA',
               frames: this.anims.generateFrameNumbers('taza', { start: 0, end: 3}),
               frameRate: 4,
               repeat: -1
                });
            this.taza.anims.play('tazaA');
            //TEXTO BATALLA 1
            this.textoB1 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB1.setFrame(0);
            //TABLA
            this.tabla = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla.setFrame(0);
            //RESPUESTAS VERDADERAS
            this.res1 = this.add.sprite(961, 549, 'respuestas1');
            this.res1.setFrame(0);
            //RESPUESTAS FALSAS
            this.res2 = this.add.sprite(1187, 549, 'respuestas2');
            this.res2.setFrame(0);
            //CHOCOLATE:
            this.chocolate = this.add.sprite(226, 50, 'chocolate');
            this.chocolate.setFrame(0);

        }
        //27--------- RESPUESTA 1
        if (this.teclaEContador >= 27) {
            this.textoB1.destroy();
            this.res1.destroy();
            this.res2.destroy();
            this.tabla.destroy();
            //TEXTO BATALLA 1
            this.textoB2 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB2.setFrame(1);
            //TABLA
            this.tabla2 = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla2.setFrame(0);
            //RESPUESTAS VERDADERAS
            this.res12 = this.add.sprite(961, 549, 'respuestas1');
            this.res12.setFrame(1);
            this.res12.setInteractive();
            this.res12.on('pointerdown', () => {
                
                this.textoB2.setFrame(10);
                this.textoPoke.play();
            });
            //RESPUESTAS FALSAS
            this.res22 = this.add.sprite(1187, 549, 'respuestas2');
            this.res22.setInteractive();
            this.res22.setFrame(1);
            this.res22.on('pointerdown', () => {
                this.daño.play();
                this.chocolate.setFrame(1);
                this.res12.setFrame(0);
                this.textoB2.setFrame(2);
                this.res22.setFrame(0);
                this.tabla2.setFrame(1);
            });
        }
       
        if (this.teclaEContador >= 28) {
            this.textoB2.destroy();
            this.res22.destroy();
            this.res12.destroy();
            this.tabla2.destroy();
            this.chocolate.setFrame(1);
            //TEXTO BATALLA 1
            this.textoB13 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB13.setFrame(3);
            //TABLA
            this.tabla3 = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla3.setFrame(1);
         
            this.res13 = this.add.sprite(961, 549, 'respuestas1');
            this.res13.setFrame(0);
     
            this.res23 = this.add.sprite(1187, 549, 'respuestas2');
            this.res23.setFrame(0);

        }
        if (this.teclaEContador >= 29) {
            this.chocolate.setFrame(1);
            this.textoB13.destroy();
            this.res23.destroy();
            this.res13.destroy();
            this.tabla3.destroy();
            //TEXTO BATALLA 1
            this.textoB14 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB14.setFrame(4);
            //TABLA
            this.tabla4 = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla4.setFrame(1);
        
            this.res14 = this.add.sprite(961, 549, 'respuestas1');
            this.res14.setFrame(0);
        
            this.res24 = this.add.sprite(1187, 549, 'respuestas2');
            this.res24.setFrame(0);

        }
        if (this.teclaEContador >= 30) {
            this.textoB14.destroy();
            this.res24.destroy();
            this.res14.destroy();
            this.tabla4.destroy();
            this.chocolate.setFrame(1);
            //TEXTO BATALLA 1
            this.textoB15 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB15.setFrame(5);
            //TABLA
            this.tabla5 = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla5.setFrame(1);
         
            this.res15 = this.add.sprite(961, 549, 'respuestas1');
            this.res15.setFrame(0);
   
            this.res25 = this.add.sprite(1187, 549, 'respuestas2');
            this.res25.setFrame(0);
            
        }
         //RESPUESTA 2
        if (this.teclaEContador >= 31) {
            this.textoB15.destroy();
            this.res25.destroy();
            this.res15.destroy();
            this.tabla5.destroy();
            this.chocolate.setFrame(1);
            //TEXTO BATALLA 1
            this.textoB16 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB16.setFrame(5);
            //TABLA
            this.tabla6 = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla6.setFrame(1);
            //RESPUESTAS VERDADERAS
            this.res16 = this.add.sprite(961, 549, 'respuestas1');
            this.res16.setFrame(2);
            this.res16.setInteractive();
            this.res16.on('pointerdown', () => {
                this.daño.play();
                this.chocolate.setFrame(2);
                this.res16.setFrame(0);
                this.textoB16.setFrame(6);
                this.res26.setFrame(0);
                this.tabla6.setFrame(2);
            });
            //RESPUESTAS FALSAS
            this.res26 = this.add.sprite(1187, 549, 'respuestas2');
            this.res26.setFrame(2);
            this.res26.setInteractive();
            this.res26.on('pointerdown', () => {
                this.textoPoke.play();
                this.textoB16.setFrame(10);
            });
        }
        //RESPUESTA 3
        if (this.teclaEContador >= 32) {
            this.textoB16.destroy();
            this.res26.destroy();
            this.res16.destroy();
            this.tabla6.destroy();
            this.chocolate.setFrame(2);
            //TEXTO BATALLA 1
            this.textoB17 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB17.setFrame(6);
            //TABLA
            this.tabla7 = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla7.setFrame(2);
            //RESPUESTAS FALSA
            this.res17 = this.add.sprite(961, 549, 'respuestas1');
            this.res17.setFrame(3);
            this.res17.setInteractive();
            this.res17.on('pointerdown', () => {
                this.textoPoke.play();
                this.textoB17.setFrame(10);
            });
            //RESPUESTAS VERDADERA
            this.res27 = this.add.sprite(1187, 549, 'respuestas2');
            this.res27.setFrame(3);
            this.res27.setInteractive();
            this.res27.on('pointerdown', () => {
                this.daño.play();
                this.chocolate.setFrame(3);
                this.res17.setFrame(0);
                this.textoB17.setFrame(7);
                this.res27.setFrame(0);
                this.tabla7.setFrame(3);
                
            });
        }
        //RESPUESTA 4
        if (this.teclaEContador >= 33) {
            this.textoB17.destroy();
            this.res27.destroy();
            this.res17.destroy();
            this.tabla7.destroy();
            this.chocolate.setFrame(3);
            //TEXTO BATALLA 1
            this.textoB18 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB18.setFrame(7);
            //TABLA
            this.tabla8 = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla8.setFrame(3);
            //RESPUESTAS VERDADERA
            this.res18 = this.add.sprite(961, 549, 'respuestas1');
            this.res18.setFrame(4);
            this.res18.setInteractive();
            this.res18.on('pointerdown', () => {
                this.daño.play();
                this.chocolate.setFrame(4);
                this.res18.setFrame(0);
                this.textoB18.setFrame(8);
                this.res28.setFrame(0);
                this.tabla8.setFrame(4);
                
            });
            //RESPUESTAS FALSA
            this.res28 = this.add.sprite(1187, 549, 'respuestas2');
            this.res28.setFrame(4);
            this.res28.setInteractive();
            this.res28.on('pointerdown', () => {
                this.textoPoke.play();
                this.textoB18.setFrame(10);        
            });
        } 
         //RESPUESTA 5
         if (this.teclaEContador >= 34) {
            this.textoB18.destroy();
            this.res28.destroy();
            this.res18.destroy();
            this.tabla8.destroy();
            this.chocolate.setFrame(4);
            //TEXTO BATALLA 1
            this.textoB19 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB19.setFrame(8);
            //TABLA
            this.tabla9 = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla9.setFrame(4);
            //RESPUESTAS FALSA
            this.res19 = this.add.sprite(961, 549, 'respuestas1');
            this.res19.setFrame(5);
            this.res19.setInteractive();
            this.res19.on('pointerdown', () => {
                this.textoPoke.play();
                this.textoB19.setFrame(10);              
            });
            //RESPUESTAS VERDADERA
            this.res29 = this.add.sprite(1187, 549, 'respuestas2');
            this.res29.setFrame(5);
            this.res29.setInteractive();
            this.res29.on('pointerdown', () => {
                this.daño.play();
                this.chocolate.setFrame(5);             
                this.res19.setFrame(0);
                this.textoB19.setFrame(9);
                this.res29.setFrame(0);
                this.tabla9.setFrame(5);    
            });
        } 
        //RESPUESTA 6
        if (this.teclaEContador >= 35) {
            this.textoB19.destroy();
            this.res29.destroy();
            this.res19.destroy();
            this.tabla9.destroy();
            this.chocolate.setFrame(5); 
            //TEXTO BATALLA 1
            this.textoB110 = this.add.sprite(423.5, 550, 'textoB1');
            this.textoB110.setFrame(9);
            //TABLA
            this.tabla10 = this.add.sprite(1075.5, 250.5, 'tabla');
            this.tabla10.setFrame(5);
            //RESPUESTAS FALSA
            this.res110 = this.add.sprite(961, 549, 'respuestas1');
            this.res110.setFrame(6);
            this.res110.setInteractive();
            this.res110.on('pointerdown', () => {
                this.textoPoke.play();
                this.textoB110.setFrame(10);              
            });
            //RESPUESTAS VERDADERA
            this.res210 = this.add.sprite(1187, 549, 'respuestas2');
            this.res210.setFrame(6);
            this.res210.setInteractive();
            this.res210.on('pointerdown', () => {
                this.transText = this.add.sprite(423.5, 550, 'transText');
                this.transText.setFrame(0);
                this.daño.play(); 
                this.chocolate.setFrame(6);              
                this.res110.setFrame(0);
                this.res210.setFrame(0);
                this.tabla10.setFrame(6);    
            });
        } 
        //LAPLACE
        if (this.teclaEContador >= 36) {
            this.textoB110.destroy();
            this.res210.destroy();
            this.res110.destroy();
            this.tabla10.destroy();
            
            //TEXTO TRANSFORMADAS
            this.transText11 = this.add.sprite(423.5, 550, 'transText');
            this.transText11.setFrame(1);
            //TABLA LAPLACE
            this.tablaLap1 = this.add.sprite(650, 251, 'LAPLACE');
            this.tablaLap1.setFrame(0);
       
            this.res111 = this.add.sprite(961, 549, 'respuestas1');
            this.res111.setFrame(0);

            this.res211 = this.add.sprite(1187, 549, 'respuestas2');
            this.res211.setFrame(0);if (this.teclaEContador >= 37) {
                //TEXTO TRANSFORMADAS
                this.transText11 = this.add.sprite(423.5, 550, 'transText');
                this.transText11.setFrame(2);
                //TABLA LAPLACE
                this.tablaLap2 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap2.setFrame(1);
                this.tablaLap1.destroy();
               
                this.res111 = this.add.sprite(961, 549, 'respuestas1');
                this.res111.setFrame(0);
    
                this.res211 = this.add.sprite(1187, 549, 'respuestas2');
                this.res211.setFrame(0);
            } 
            if (this.teclaEContador >= 38) {
                this.res211.destroy();
                this.res111.destroy();
                this.transText11.destroy();
                //TEXTO TRANSFORMADAS
                this.transText12 = this.add.sprite(423.5, 550, 'transText');
                this.transText12.setFrame(3);
                //TABLA LAPLACE
                this.tablaLap3 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap3.setFrame(2);
                this.tablaLap2.destroy();
           
                this.res112 = this.add.sprite(961, 549, 'respuestas1');
                this.res112.setFrame(0);
    
                this.res212 = this.add.sprite(1187, 549, 'respuestas2');
                this.res212.setFrame(0);
            } 
            if (this.teclaEContador >= 39) {
                //TEXTO TRANSFORMADAS
                this.transText12 = this.add.sprite(423.5, 550, 'transText');
                this.transText12.setFrame(4);
                //TABLA LAPLACE
                this.tablaLap4 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap4.setFrame(3);
                this.tablaLap3.destroy();
           
                this.res112 = this.add.sprite(961, 549, 'respuestas1');
                this.res112.setFrame(0);
    
                this.res212 = this.add.sprite(1187, 549, 'respuestas2');
                this.res212.setFrame(0);
            } 
            if (this.teclaEContador >= 40) {
                this.res212.destroy();
                this.res112.destroy();
                this.transText12.destroy();
                //TEXTO TRANSFORMADAS
                this.transText13 = this.add.sprite(423.5, 550, 'transText');
                this.transText13.setFrame(5);
                //TABLA LAPLACE
                this.tablaLap5 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap5.setFrame(4);
                this.tablaLap4.destroy();
           
                this.res113 = this.add.sprite(961, 549, 'respuestas1');
                this.res113.setFrame(0);
    
                this.res213 = this.add.sprite(1187, 549, 'respuestas2');
                this.res213.setFrame(0);
            } 
            if (this.teclaEContador >= 41) {
                this.res213.destroy();
                this.res113.destroy();
                this.transText13.destroy();
                //TEXTO TRANSFORMADAS
                this.transText14 = this.add.sprite(423.5, 550, 'transText');
                this.transText14.setFrame(6);
                //TABLA LAPLACE
                this.tablaLap6 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap6.setFrame(5);
                this.tablaLap5.destroy();
           
                this.res114 = this.add.sprite(961, 549, 'respuestas1');
                this.res114.setFrame(0);
    
                this.res214 = this.add.sprite(1187, 549, 'respuestas2');
                this.res214.setFrame(0);
            } 
            if (this.teclaEContador >= 42) {
                this.res214.destroy();
                this.res114.destroy();
                this.transText14.destroy();
                //TEXTO TRANSFORMADAS
                this.transText15 = this.add.sprite(423.5, 550, 'transText');
                this.transText15.setFrame(7);
                //TABLA LAPLACE
                this.tablaLap7 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap7.setFrame(6);
                this.tablaLap6.destroy();
           
                this.res115 = this.add.sprite(961, 549, 'respuestas1');
                this.res115.setFrame(0);
    
                this.res215 = this.add.sprite(1187, 549, 'respuestas2');
                this.res215.setFrame(0);
            } 
            if (this.teclaEContador >= 43) {
                this.res215.destroy();
                this.res115.destroy();
                this.transText15.destroy();
                //TEXTO TRANSFORMADAS
                this.transText16 = this.add.sprite(423.5, 550, 'transText');
                this.transText16.setFrame(8);
                //TABLA LAPLACE
                this.tablaLap8 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap8.setFrame(7);
                this.tablaLap7.destroy();
           
                this.res116 = this.add.sprite(961, 549, 'respuestas1');
                this.res116.setFrame(0);
    
                this.res216 = this.add.sprite(1187, 549, 'respuestas2');
                this.res216.setFrame(0);
            } 
            if (this.teclaEContador >= 44) {
                this.res216.destroy();
                this.res116.destroy();
                this.transText16.destroy();
                //TEXTO TRANSFORMADAS
                this.transText17 = this.add.sprite(423.5, 550, 'transText');
                this.transText17.setFrame(9);
                //TABLA LAPLACE
                this.tablaLap9 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap9.setFrame(8);
                this.tablaLap8.destroy();
           
                this.res117 = this.add.sprite(961, 549, 'respuestas1');
                this.res117.setFrame(0);
    
                this.res217 = this.add.sprite(1187, 549, 'respuestas2');
                this.res217.setFrame(0);
            } 
            if (this.teclaEContador >= 45) {
                this.res217.destroy();
                this.res117.destroy();
                this.transText17.destroy();
                //TEXTO TRANSFORMADAS
                this.transText18 = this.add.sprite(423.5, 550, 'transText');
                this.transText18.setFrame(10);
                //TABLA LAPLACE
                this.tablaLap10 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap10.setFrame(9);
                this.tablaLap9.destroy();
           
                this.res118 = this.add.sprite(961, 549, 'respuestas1');
                this.res118.setFrame(0);
    
                this.res218 = this.add.sprite(1187, 549, 'respuestas2');
                this.res218.setFrame(0);
            } 
            if (this.teclaEContador >= 46) {
                this.res218.destroy();
                this.res118.destroy();
                this.transText18.destroy();
                //TEXTO TRANSFORMADAS
                this.transText19 = this.add.sprite(423.5, 550, 'transText');
                this.transText19.setFrame(11);
                //TABLA LAPLACE
                this.tablaLap11 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap11.setFrame(10);
                this.tablaLap10.destroy();
           
                this.res119 = this.add.sprite(961, 549, 'respuestas1');
                this.res119.setFrame(0);
    
                this.res219 = this.add.sprite(1187, 549, 'respuestas2');
                this.res219.setFrame(0);
            } 
            if (this.teclaEContador >= 47) {
                this.res219.destroy();
                this.res119.destroy();
                this.transText19.destroy();
                //TEXTO TRANSFORMADAS
                this.transText20 = this.add.sprite(423.5, 550, 'transText');
                this.transText20.setFrame(12);
                //TABLA LAPLACE
                this.tablaLap12 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap12.setFrame(11);
                this.tablaLap11.destroy();
           
                this.res120 = this.add.sprite(961, 549, 'respuestas1');
                this.res120.setFrame(0);
    
                this.res220 = this.add.sprite(1187, 549, 'respuestas2');
                this.res220.setFrame(0);
            } 
            if (this.teclaEContador >= 48) {
                this.res220.destroy();
                this.res120.destroy();
                this.transText20.destroy();
                //TEXTO TRANSFORMADAS
                this.transText21 = this.add.sprite(423.5, 550, 'transText');
                this.transText21.setFrame(13);
                //TABLA LAPLACE
                this.tablaLap13 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap13.setFrame(12);
                this.tablaLap12.destroy();
           
                this.res121 = this.add.sprite(961, 549, 'respuestas1');
                this.res121.setFrame(0);
    
                this.res221 = this.add.sprite(1187, 549, 'respuestas2');
                this.res221.setFrame(0);
            } 
            if (this.teclaEContador >= 49) {
                this.res221.destroy();
                this.res121.destroy();
                this.transText21.destroy();
                //TEXTO TRANSFORMADAS
                this.transText22 = this.add.sprite(423.5, 550, 'transText');
                this.transText22.setFrame(14);
                //TABLA LAPLACE
                this.tablaLap14 = this.add.sprite(650, 251, 'LAPLACE');
                this.tablaLap14.setFrame(13);
                this.tablaLap13.destroy();
           
                this.res122 = this.add.sprite(961, 549, 'respuestas1');
                this.res122.setFrame(0);
    
                this.res222 = this.add.sprite(1187, 549, 'respuestas2');
                this.res222.setFrame(0);
                if (this.teclaEContador >= 50) {
                    this.res222.destroy();
                this.res122.destroy();
                this.transText22.destroy();
                    this.tablaLap14.destroy();
                    //TEXTO TRANSFORMADAS
                    this.transText23 = this.add.sprite(423.5, 550, 'transText');
                    this.transText23.setFrame(14);
                    //TABLA 
                    this.tabla23 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla23.setFrame(7);
               
                    this.res123 = this.add.sprite(961, 549, 'respuestas1');
                    this.res123.setFrame(0);
        
                    this.res223 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res223.setFrame(0);
                } 
                if (this.teclaEContador >= 51) {
                    this.res223.destroy();
                    this.res123.destroy();
                    this.transText23.destroy();
                    this.tabla23.destroy();
                    this.chocolate.setFrame(5); 
                    //TEXTO CONSTANTES
                    this.textCK24 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK24.setFrame(0);
                    //TABLA 
                    this.tabla24 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla24.setFrame(7);
               
                    this.res124 = this.add.sprite(961, 549, 'respuestas1');
                    this.res124.setFrame(0);
        
                    this.res224 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res224.setFrame(0);
                } 
                if (this.teclaEContador >= 52) {
                    this.res224.destroy();
                    this.res124.destroy();
                    this.textCK24.destroy();
                    this.tabla24.destroy();
                    //TEXTO CONSTANTES
                    this.textCK25 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK25.setFrame(1);
                    //TABLA 
                    this.tabla25 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla25.setFrame(7);
               
                    this.res125 = this.add.sprite(961, 549, 'respuestas1');
                    this.res125.setFrame(0);
        
                    this.res225 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res225.setFrame(0);
                } 
                if (this.teclaEContador >= 53) {
                    this.res225.destroy();
                    this.res125.destroy();
                    this.textCK25.destroy();
                    this.tabla25.destroy();
                    //TEXTO CONSTANTES
                    this.textCK26 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK26.setFrame(2);
                    //TABLA 
                    this.tabla26 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla26.setFrame(7);
               
                    this.res126 = this.add.sprite(961, 549, 'respuestas1');
                    this.res126.setFrame(0);
        
                    this.res226 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res226.setFrame(0);
                } 
                if (this.teclaEContador >= 54) {
                    this.res226.destroy();
                    this.res126.destroy();
                    this.textCK26.destroy();
                    this.tabla26.destroy();
                    //TEXTO CONSTANTES
                    this.textCK27 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK27.setFrame(3);
                    //TABLA 
                    this.tabla27 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla27.setFrame(7);
               
                    this.res127 = this.add.sprite(961, 549, 'respuestas1');
                    this.res127.setFrame(0);
        
                    this.res227 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res227.setFrame(0);
                } 
                if (this.teclaEContador >= 55) {
                    this.res227.destroy();
                    this.res127.destroy();
                    this.textCK27.destroy();
                    this.tabla27.destroy();
                    //TEXTO CONSTANTES
                    this.textCK28 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK28.setFrame(4);
                    //TABLA 
                    this.tabla28 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla28.setFrame(8);
               
                    this.res128 = this.add.sprite(961, 549, 'respuestas1');
                    this.res128.setFrame(0);
        
                    this.res228 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res228.setFrame(0);
                } 
                if (this.teclaEContador >= 56) {
                    this.res228.destroy();
                    this.res128.destroy();
                    this.textCK28.destroy();
                    this.tabla28.destroy();
                    //TEXTO CONSTANTES
                    this.textCK29 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK29.setFrame(5);
                    //TABLA 
                    this.tabla29 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla29.setFrame(8);
               
                    this.res129 = this.add.sprite(961, 549, 'respuestas1');
                    this.res129.setFrame(0);
        
                    this.res229 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res229.setFrame(0);
                } 
                //RESPUESTA 7 ------------------------------------------------------
                if (this.teclaEContador >= 57) {
                    this.res229.destroy();
                    this.res129.destroy();
                    this.textCK29.destroy();
                    this.tabla29.destroy();
                    //TEXTO CONSTANTES
                    this.textCK30 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK30.setFrame(6);
                    //TABLA 
                    this.tabla30 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla30.setFrame(9);
                    //RESPUESTAS VERDADERA
                    this.res130 = this.add.sprite(961, 549, 'respuestas1');
                    this.res130.setFrame(7);
                    this.res130.setInteractive();
                    this.res130.on('pointerdown', () => {
                        this.daño.play();
                        this.chocolate.setFrame(7); 
                        this.res130.setFrame(0);
                        this.textCK30.setFrame(7);
                        this.res230.setFrame(0);
                        this.tabla30.setFrame(10);                  
                    });
                    //RESPUESTAS FALSA
                    this.res230 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res230.setFrame(7);
                    this.res230.setInteractive();
                    this.res230.on('pointerdown', () => {
                        this.textoPoke.play();       
                        this.textCK30.setFrame(17);          
                        
                    });
                } 
                 if (this.teclaEContador >= 58) {
                    this.res230.destroy();
                    this.res130.destroy();
                    this.textCK30.destroy();
                    this.tabla30.destroy();
                    this.chocolate.setFrame(7); 
                    //TEXTO CONSTANTES
                    this.textCK31 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK31.setFrame(8);
                    //TABLA 
                    this.tabla31 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla31.setFrame(11);
                    this.res131 = this.add.sprite(961, 549, 'respuestas1');
                    this.res131.setFrame(0);
        
                    this.res231 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res231.setFrame(0);
                } 
                if (this.teclaEContador >= 59) {
                    this.res231.destroy();
                    this.res131.destroy();
                    this.textCK31.destroy();
                    this.tabla31.destroy();
                    //TEXTO CONSTANTES
                    this.textCK32 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK32.setFrame(9);
                    //TABLA 
                    this.tabla32 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla32.setFrame(12);
                    this.res132 = this.add.sprite(961, 549, 'respuestas1');
                    this.res132.setFrame(0);
        
                    this.res232 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res232.setFrame(0);
                } 
                if (this.teclaEContador >= 60) {
                    this.res232.destroy();
                    this.res132.destroy();
                    this.textCK32.destroy();
                    this.tabla32.destroy();
                    //TEXTO CONSTANTES
                    this.textCK33 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK33.setFrame(10);
                    //TABLA 
                    this.tabla33 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla33.setFrame(13);
                    this.res133 = this.add.sprite(961, 549, 'respuestas1');
                    this.res133.setFrame(0);
        
                    this.res233 = this.add.sprite(1187, 549, 'respuestas2');
                    this.res233.setFrame(0);
                } 
                //RESPUESTA 8 ----------------
                if (this.teclaEContador >= 61) {
                    this.res233.destroy();
                    this.res133.destroy();
                    this.textCK33.destroy();
                    this.tabla33.destroy();
                    //TEXTO CONSTANTES
                    this.textCK34 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK34.setFrame(11);
                    //TABLA 
                    this.tabla34 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla34.setFrame(13);
                     //RESPUESTAS VERDADERA
                     this.res134 = this.add.sprite(961, 549, 'respuestas1');
                     this.res134.setFrame(8);
                     this.res134.setInteractive();
                     this.res134.on('pointerdown', () => {
                        this.daño.play();
                         this.chocolate.setFrame(8);
                         this.res134.setFrame(0);
                         this.textCK34.setFrame(12);
                         this.res234.setFrame(0);
                         this.tabla34.setFrame(14);                  
                     });
                     //RESPUESTAS FALSA
                     this.res234 = this.add.sprite(1187, 549, 'respuestas2');
                     this.res234.setFrame(8);
                     this.res234.setInteractive();
                     this.res234.on('pointerdown', () => {
                         this.textoPoke.play();       
                         this.textCK34.setFrame(17);           
                         
                     });
                } 
                //RESPUESTA 9 -------------------------------------------------------
                if (this.teclaEContador >= 62) {
                    this.res234.destroy();
                    this.res134.destroy();
                    this.textCK34.destroy();
                    this.tabla34.destroy();
                    this.chocolate.setFrame(8);
                    //TEXTO CONSTANTES
                    this.textCK35 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK35.setFrame(13);
                    //TABLA 
                    this.tabla35 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla35.setFrame(14);
                     //RESPUESTAS FALSA
                     this.res135 = this.add.sprite(961, 549, 'respuestas1');
                     this.res135.setFrame(9);
                     this.res135.setInteractive();
                     this.res135.on('pointerdown', () => {
                         this.textCK35.setFrame(17);  
                         this.textoPoke.play();
                                          
                     });
                     //RESPUESTAS VERDADERA
                     this.res235 = this.add.sprite(1187, 549, 'respuestas2');
                     this.res235.setFrame(9);
                     this.res235.setInteractive();
                     this.res235.on('pointerdown', () => {
                        this.daño.play(); 
                         this.chocolate.setFrame(9);     
                         this.res135.setFrame(0);
                         this.textCK35.setFrame(14);
                         this.res235.setFrame(0);
                         this.tabla35.setFrame(15);             
                     });
                } 
                if (this.teclaEContador >= 63) {
                    this.res235.destroy();
                    this.res135.destroy();
                    this.textCK35.destroy();
                    this.tabla35.destroy();
                    this.chocolate.setFrame(9);   
                    //TEXTO CONSTANTES
                    this.textCK36 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK36.setFrame(15);
                    //TABLA 
                    this.tabla36 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla36.setFrame(15);

                     this.res136 = this.add.sprite(961, 549, 'respuestas1');
                     this.res136.setFrame(0);
                     
                     this.res236 = this.add.sprite(1187, 549, 'respuestas2');
                     this.res236.setFrame(0);
                
                } 
                if (this.teclaEContador >= 64) {
                    this.res236.destroy();
                    this.res136.destroy();
                    this.textCK36.destroy();
                    this.tabla36.destroy();
                    //TEXTO CONSTANTES
                    this.textCK37 = this.add.sprite(423.5, 550, 'textCK');
                    this.textCK37.setFrame(16);
                    //TABLA 
                    this.tabla37 = this.add.sprite(1075.5, 250.5, 'tabla');
                    this.tabla37.setFrame(16);

                     this.res137 = this.add.sprite(961, 549, 'respuestas1');
                     this.res137.setFrame(0);
                     
                     this.res237 = this.add.sprite(1187, 549, 'respuestas2');
                     this.res237.setFrame(0);
                
                } 
                if (this.teclaEContador >= 65) {
                    this.res237.destroy();
                    this.res137.destroy();
                    this.textCK37.destroy();
                    this.tabla37.destroy();
                    //TEXTO FINAL
                    this.textF38 = this.add.sprite(423.5, 550, 'textF');
                    this.textF38.setFrame(0);
                    //TABLA FINAL
                    this.tablaF38 = this.add.sprite(1075.5, 250.5, 'tablaF');
                    this.tablaF38.setFrame(1);
                 
                     this.res138 = this.add.sprite(961, 549, 'respuestas1');
                     this.res138.setFrame(0);

                     this.res238 = this.add.sprite(1187, 549, 'respuestas2');
                     this.res238.setFrame(0);
                
                } 
                if (this.teclaEContador >= 66) {
                    this.res238.destroy();
                    this.res138.destroy();
                    this.textF38.destroy();
                    this.tablaF38.destroy();
                    //TEXTO FINAL
                    this.textF39 = this.add.sprite(423.5, 550, 'textF');
                    this.textF39.setFrame(1);
                    //TABLA FINAL
                    this.tablaF39 = this.add.sprite(1075.5, 250.5, 'tablaF');
                    this.tablaF39.setFrame(2);
                 
                     this.res139 = this.add.sprite(961, 549, 'respuestas1');
                     this.res139.setFrame(0);

                     this.res239 = this.add.sprite(1187, 549, 'respuestas2');
                     this.res239.setFrame(0);
                
                } 
                if (this.teclaEContador >= 67) {
                    this.res239.destroy();
                    this.res139.destroy();
                    this.textF39.destroy();
                    this.tablaF39.destroy();
                    //TEXTO FINAL
                    this.textF40 = this.add.sprite(423.5, 550, 'textF');
                    this.textF40.setFrame(2);
                    //TABLA FINAL
                    this.tablaF40 = this.add.sprite(1075.5, 250.5, 'tablaF');
                    this.tablaF40.setFrame(2);
                 
                     this.res140 = this.add.sprite(961, 549, 'respuestas1');
                     this.res140.setFrame(0);

                     this.res240 = this.add.sprite(1187, 549, 'respuestas2');
                     this.res240.setFrame(0);
                
                } 
                //RESPUESTA 10
                if (this.teclaEContador >= 68) {
                    this.res240.destroy();
                    this.res140.destroy();
                    this.textF40.destroy();
                    this.tablaF40.destroy();
                    //TEXTO FINAL
                    this.textF41 = this.add.sprite(423.5, 550, 'textF');
                    this.textF41.setFrame(3);
                    //TABLA FINAL
                    this.tablaF41 = this.add.sprite(1075.5, 250.5, 'tablaF');
                    this.tablaF41.setFrame(2);
                 
                     //RESPUESTAS VERDADERA
                     this.res141 = this.add.sprite(961, 549, 'respuestas1');
                     this.res141.setFrame(10);
                     this.res141.setInteractive();
                     this.res141.on('pointerdown', () => {
                        this.daño.play();
                         this.chocolate.setFrame(10); 
                         this.res141.setFrame(0);
                         this.textF41.setFrame(4); 
                         this.res241.setFrame(0);
                         this.tablaF41.setFrame(3);   
                                          
                     });
                     //RESPUESTAS FALSA
                     this.res241 = this.add.sprite(1187, 549, 'respuestas2');
                     this.res241.setFrame(10);
                     this.res241.setInteractive();
                     this.res241.on('pointerdown', () => {
                         this.textoPoke.play();    
                         this.textF41.setFrame(5);     
                                   
                     });
                     if (this.teclaEContador >= 69) {
                        this.res241.destroy();
                        this.res141.destroy();
                        this.textF41.destroy();
                        this.tablaF41.destroy();
                        this.chocolate.destroy();
                        this.fondoBatalla.destroy();
                        this.taza.destroy();
                        this.musicaB.destroy();
                        //TEXTO FINAL FINAL
                        this.textoPoke.play(); 
                        this.blanco = this.add.image(650, 300, 'blanco');
                        this.blanco.setScale(2);
                    
                                  
                    } 
                    if (this.teclaEContador >= 70) {
                        this.iniciarMusicaFinal();
                        this.pop.play();
                        
                        this.blanco.destroy();
                        
                        //Fondo
                        this.piso = this.add.sprite(650, 300, 'piso');
                        this.mesa1 = this.add.sprite(300, 380, 'mesa1');
                        this.pelota = this.add.sprite(1000, 250, 'pelota');
                        this.salida = this.add.sprite(650, 590, 'salida');
                        this.todo1 = this.add.sprite(650, 300, 'todo1'); 

                        this.nevera1 = this.physics.add.image(130, 110, 'nevera').setImmovable();
                        this.nevera1.body.allowGravity = false; 
        
                        this.sofa1 = this.physics.add.image(1200, 295, 'sofa').setImmovable();
                        this.sofa1.body.allowGravity = false; 

                        this.luzc = this.physics.add.image(1000, 100, 'luzCasa1').setImmovable();
                        this.luzc.body.allowGravity = false; 
                //MADRE
                        this.mare = this.physics.add.sprite(650, 300, 'personaje').setImmovable();
                        this.mare.body.allowGravity = false; 
                        this.mare.setScale(0.8);
                        this.anims.create({
                            key: 'neutral1',
                            frames: this.anims.generateFrameNumbers('personaje', { start: 0, end: 3 }),
                            frameRate: 4,
                            repeat: -1
                        });
                        this.mare.anims.play('neutral1');
                    //HIJA
                        this.hija1 = this.add.sprite(300, 110, 'hija');
                        this.hija1.setScale(0.8);
                        this.anims.create({
                            key: 'neutralHa',
                            frames: this.anims.generateFrameNumbers('hija', { start: 0, end: 3 }),
                            frameRate: 4,
                            repeat: -1
                        });
                        this.hija1.anims.play('neutralHa');

                        //TEXTO FINAL FINAL
                        this.textoFinal1 = this.add.sprite(650, 550, 'TextoFinal');
                        this.textoFinal1.setFrame(0);
                } 
                if (this.teclaEContador >= 71) {
                    this.textoPoke.play(); 
                    this.textoFinal1.destroy();
                    this.pop.stop();

                    //TEXTO FINAL FINAL
                    this.textoFinal2 = this.add.sprite(650, 550, 'TextoFinal');
                    this.textoFinal2.setFrame(1);
            } 
            if (this.teclaEContador >= 72) {
                this.textoPoke.play(); 
                this.textoFinal2.destroy();

                //TEXTO FINAL FINAL
                this.textoFinal3 = this.add.sprite(650, 550, 'TextoFinal');
                this.textoFinal3.setFrame(2);
        } 
        if (this.teclaEContador >= 73) {
            this.textoPoke.play(); 
            this.textoFinal3.destroy();

            //TEXTO FINAL FINAL
            this.textoFinal4 = this.add.sprite(650, 550, 'TextoFinal');
            this.textoFinal4.setFrame(3);
    } 
    if (this.teclaEContador >= 74) {
        this.textoPoke.play(); 
        this.textoFinal4.destroy();

        //TEXTO FINAL FINAL
        this.textoFinal5 = this.add.sprite(650, 550, 'TextoFinal');
        this.textoFinal5.setFrame(4);
} 
if (this.teclaEContador >= 75) {
    this.textoPoke.play(); 
    this.textoFinal5.destroy();

    //TEXTO FINAL FINAL
    this.textoFinal6 = this.add.sprite(650, 550, 'TextoFinal');
    this.textoFinal6.setFrame(5);
} 
if (this.teclaEContador >= 76) {
    this.textoPoke.play(); 
    this.textoFinal6.destroy();

    //TEXTO FINAL FINAL
    this.textoFinal7 = this.add.sprite(650, 550, 'TextoFinal');
    this.textoFinal7.setFrame(6);
} 
if (this.teclaEContador >= 77) {
    this.textoFinal7.destroy();

    //TEXTO FINAL FINAL
    this.textoFinal8 = this.add.sprite(650, 550, 'TextoFinal');
    this.textoFinal8.setFrame(7);
} 
if (this.teclaEContador >= 78) { 
    this.textoFinal8.destroy();

    //TEXTO FINAL FINAL
    this.textoFinal9 = this.add.sprite(650, 550, 'TextoFinal');
    this.textoFinal9.setFrame(8);
} 
if (this.teclaEContador >= 79) { 
    this.textoFinal9.destroy();
    this.win.play();
    //GRACIAS
    this.gracias = this.add.sprite(650, 300, 'gracias');
   
} 
if (this.teclaEContador >= 80) { 
    this.win.stop();
    //GRACIAS
    this.gracias = this.add.sprite(650, 300, 'gracias');
   
} 
            }
            } 
           
        } 
        
    } 
   }
   iniciarMusicaBatalla() {
    // Iniciar la música de batalla solo si no está sonando actualmente
    if (this.musicaB && !this.musicaB.isPlaying && !this.musicaBIniciada) {
        this.musicaB.play();
        this.musicaBIniciada = true;
    }
}
iniciarMusicaFinal() {
    // Iniciar la música de batalla solo si no está sonando actualmente
    if (this.musica1 && !this.musica1.isPlaying && !this.musica1Iniciada) {
        this.musica1.play();
        this.musica1Iniciada = true;
    }
}
 }

