export default class BitReader {
    private acc = 0;
    private bits = 0;
    private offset = 0;

    constructor(private bytes: Uint8Array) {}

    read(bitCount: number): number {
        let result = 0;

        while (bitCount > 0) {
            if (this.bits === 0) {
                this.acc = this.bytes[this.offset++];
                this.bits = 8;
            }
            const take = Math.min(this.bits, bitCount);
            result = (result << take) |
                ((this.acc >>> (this.bits - take)) & ((1 << take) - 1));

            this.bits -= take;
            bitCount -= take;
        }
        return result;
    }

    readVarint(): number {
        this.alignByte();

        let num = 0;
        let shift = 0;
        let b: number;

        do {
            b = this.bytes[this.offset++];
            num |= (b & 0x7F) << shift;
            shift += 7;
        } while (b & 0x80);

        return num;
    }

    private alignByte(): void {
        if (this.bits > 0) {
            this.bits = 0;
        }
    }

    get finished(): boolean {
        return this.offset >= this.bytes.length;
    }
}
