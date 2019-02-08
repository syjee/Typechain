import * as CryptoJS from "crypto-js";

class Block {
    static calculateHash = (
        index: number,
        data: string,
        previousHash: string,
        timeStamp: number
    ): string => CryptoJS.SHA256(index + data + previousHash + timeStamp).toString();

    static isValidStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.data === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.timeStamp === "number";

    public index: number;
    public data: string;
    public previousHash: string;
    public hash: string;
    public timeStamp: number;

    constructor(index: number, data: string, previousHash: string, timeStamp: number) {
        this.index = index;
        this.data = data;
        this.previousHash = previousHash;
        this.timeStamp = timeStamp;
    }
}

const getNewTimeStamp = (): number => Math.round(new Date().getTime());

const genesisBlock: Block = new Block(0, "hello", "", getNewTimeStamp());
genesisBlock.hash = Block.calculateHash(
    genesisBlock.index,
    genesisBlock.data,
    genesisBlock.previousHash,
    genesisBlock.timeStamp
);

let Blockchain: Block[] = [genesisBlock];
const getBlockchain = (): Block[] => Blockchain;
const getLatestBlock = (): Block => Blockchain[Blockchain.length - 1];

const getHashForBlock = (aBlock: Block): string =>
    Block.calculateHash(aBlock.index, aBlock.data, aBlock.previousHash, aBlock.timeStamp);

const isValidBlock = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (Block.isValidStructure(candidateBlock)) {
        return false;
    } else if (candidateBlock.index !== previousBlock.index + 1) {
        return false;
    } else if (candidateBlock.previousHash !== previousBlock.hash) {
        return false;
    } else if (candidateBlock.hash !== getHashForBlock(candidateBlock)) {
        return false;
    } else return true;
};

const createNewBlock = (data: string) => {
    const previousBlock = getLatestBlock();

    const newIndex = previousBlock.index + 1;
    const newData = data;
    const previousHash = previousBlock.hash;
    const newTimeStamp = getNewTimeStamp();

    const newBlock: Block = new Block(newIndex, newData, previousHash, newTimeStamp);
    newBlock.hash = Block.calculateHash(newIndex, newData, previousHash, newTimeStamp);

    if (isValidBlock) getBlockchain().push(newBlock);
};

createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("fourth Block");
createNewBlock("fifth Block");

console.log(getBlockchain());

export {};
