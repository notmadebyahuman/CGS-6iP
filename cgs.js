/* Just a Example */

(function (global) {
    const CryptoLib = {
        chaves: [],

        gerarChaves: function () {
            this.chaves = [];
            for (let i = 0; i < 17; i++) {
                const chave = crypto.getRandomValues(new Uint8Array(255))
                    .reduce((acc, val) => acc + String.fromCharCode(val % 94 + 33), '');
                this.chaves.push(chave);
            }
            return this.chaves;
        },


        criptografar: function (texto) {
            if (this.chaves.length === 0) {
                throw new Error("As chaves ainda não foram geradas. Use gerarChaves() antes.");
            }


            const base64 = btoa(texto);


            const picotes = base64.match(/.{1,4}/g);
            const embaralhado = picotes.map((picote, index) => {
                const chave = this.chaves[index % this.chaves.length];
                return [...picote].reverse().join(''); // Exemplo simples de embaralhamento
            });

            return embaralhado.join('');
        },

      
        descriptografar: function (texto) {
            if (this.chaves.length === 0) {
                throw new Error("As chaves ainda não foram geradas. Use gerarChaves() antes.");
            }

            const picotes = texto.match(/.{1,4}/g);
            const original = picotes.map((picote, index) => {
                const chave = this.chaves[index % this.chaves.length];
                return [...picote].reverse().join('');
            });

            return atob(original.join(''));
        }
    };

    // Expor a biblioteca no escopo global
    global.CryptoLib = CryptoLib;
})(this);
