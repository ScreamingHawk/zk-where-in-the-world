pragma circom 2.1.9;
include "../node_modules/circomlib/circuits/poseidon.circom";

template LocationChecker() {
    signal input latitude, longitude;
    signal output hash_out;

    component poseidon = Poseidon(2);

    poseidon.inputs[0] <== latitude;
    poseidon.inputs[1] <== longitude;
    hash_out <== poseidon.out;
}
