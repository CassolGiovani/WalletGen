// importando dependecias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// definir a rede
//bitcoin - rede principal -mainnet
//testnet - rede de teste - testnet
const network = bitcoin.networks.testnet

//derivaçã ode carteiras HD
const path = `m/49'/1'/0'/0`

//criando as palavras mnemonic para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criadno raiz da carteira HD
let root = bip32.fromSeed(seed, network)

// Criando uma conta (par de chaves privada e pública)
let account = root.derivePath(path)
let node = account .derive(0).derive(0)

// Verificando se a chave pública é válida
if (!node.publicKey || node.publicKey.length === 0) {
    throw new Error('Chave pública não gerada corretamente.');
}

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network:network,
}).address

console.log('carteira gerada')
console.log('Endereço: ', btcAddress)
console.log('Chave privada:', node.toWIF())
console.log("Seed", mnemonic)



