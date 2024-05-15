export class Texto extends Phaser.Scene {
    constructor() {
        super({ key: 'TEXTO'});
        this.textoCount = 0; // Inicializamos el contador de veces que se ha presionado la tecla 'E'
    }

    preload() {
        this.load.spritesheet('texto', 'img/Texto.png', { frameWidth: 847, frameHeight: 100 });
        this.load.audio('texto', 'Sonido/Sound POke.mp3');
    }

    create() {
        this.texto = this.physics.add.sprite(650, 550, 'texto');
        this.texto.body.allowGravity = false;
        this.currentFrame = 0; 
        this.texto.setFrame(this.currentFrame);
        
        this.keys = this.input.keyboard.addKeys('E');
        this.interactable = true; 

        this.textoPoke = this.sound.add('texto');
    }

    update() {
        if (this.keys.E.isDown && this.interactable) {
            this.FotogramaTexto();
            this.interactable = false; // Evita múltiples activaciones
            if (this.textoCount < 2) {
                this.textoPoke.play();
                this.textoCount++;
            }
            this.time.delayedCall(500, () => {
                this.interactable = true;
            });
        }
    }

    FotogramaTexto() {
        if (this.currentFrame === 0) {
            this.currentFrame = 1;
            this.texto.setFrame(this.currentFrame);
            this.interactable = false; 
        } else {
            this.texto.visible = false;
            this.interactable = false;
        }
    }
}
