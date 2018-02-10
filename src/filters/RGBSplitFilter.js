class RGBSplitFilter extends Phaser.Filter {
    constructor() {
        super();
        this.passes = [this];

        this.uniforms = {
            red: {type: '2f', value: {x:5, y:5}},
            green: {type: '2f', value: {x:-5, y:5}},
            blue: {type: '2f', value: {x:5, y:-5}},
            offset: {type: '1f', value: 5},
            dimensions:   {type: '4fv', value:[0,0,0,0]}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform vec2 red;',
            'uniform vec2 green;',
            'uniform vec2 blue;',
            'uniform float offset;',
            'uniform vec4 dimensions;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   gl_FragColor.r = texture2D(uSampler, vTextureCoord + vec2(offset, offset)/dimensions.xy).r;',
            '   gl_FragColor.g = texture2D(uSampler, vTextureCoord + vec2(-offset, offset)/dimensions.xy).g;',
            '   gl_FragColor.b = texture2D(uSampler, vTextureCoord + vec2(offset, -offset)/dimensions.xy).b;',
            '   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;',
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
}

export default RGBSplitFilter;