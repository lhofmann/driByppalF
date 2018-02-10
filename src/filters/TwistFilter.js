class TwistFilter extends Phaser.Filter {
    constructor() {
        super();
        this.passes = [this];

        this.uniforms = {
            radius: {type: '1f', value: 0.5},
            angle: {type: '1f', value: 5},
            offset: {type: '2f', value: {x:0.0, y:0.0}}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform vec4 dimensions;',
            'uniform sampler2D uSampler;',

            'uniform float radius;',
            'uniform float angle;',
            'uniform vec2 offset;',

            'void main(void) {',
            '   vec2 coord = vTextureCoord - offset;',
            '   float distance = length(coord);',

            '   if (distance < radius) {',
            '       float ratio = (radius - distance) / radius;',
            '       float angleMod = ratio * ratio * angle;',
            '       float s = sin(angleMod);',
            '       float c = cos(angleMod);',
            '       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);',
            '   }',

            '   gl_FragColor = texture2D(uSampler, coord+offset);',
            '}'
        ];
    }

    get offset() {
        return this.uniforms.offset.value;
    }

    set offset(value) {
        this.dirty = true;
        this.uniforms.offset.value = value;
    }

    get radius() {
        return this.uniforms.radius.value;
    }

    set radius(value) {
        this.dirty = true;
        this.uniforms.radius.value = value;
    }

    get angle() {
        return this.uniforms.angle.value;
    }

    set angle(value) {
        this.dirty = true;
        this.uniforms.angle.value = value;
    }
}

export default TwistFilter;