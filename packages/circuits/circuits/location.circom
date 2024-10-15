pragma circom 2.1.9;
include "../node_modules/circomlib/circuits/poseidon.circom";

template LocationChecker() {
    signal input latitude, longitude, nonce;
    signal output location_hash, nonce_hash;

    component poseidon2 = Poseidon(2);
    poseidon2.inputs[0] <== latitude;
    poseidon2.inputs[1] <== longitude;
    location_hash <== poseidon2.out;

    component poseidon3 = Poseidon(3);
    poseidon3.inputs[0] <== latitude;
    poseidon3.inputs[1] <== longitude;
    poseidon3.inputs[2] <== nonce;
    nonce_hash <== poseidon3.out;
}
