export default class BitWriter {
    private bytes: number[] = [];
    private acc = 0;
    private bits = 0;

    write(value: number, bitCount: number): void {
        while (bitCount > 0) {
            const space = 8 - this.bits;
            const take = Math.min(space, bitCount);
            const shifted = (value >>> (bitCount - take)) & ((1 << take) - 1);

            this.acc |= shifted << (space - take);
            this.bits += take;
            bitCount -= take;

            if (this.bits === 8) {
                this.bytes.push(this.acc);
                this.acc = 0;
                this.bits = 0;
            }
        }
    }

    writeVarint(num: number): void {
        this.flush();
        while (num >= 0x80) {
            this.bytes.push((num & 0x7F) | 0x80);
            num >>= 7;
        }
        this.bytes.push(num);
    }

    finish(): Uint8Array {
        this.flush();
        return new Uint8Array(this.bytes);
    }

    private flush(): void {
        if (this.bits > 0) {
            this.bytes.push(this.acc);
            this.acc = 0;
            this.bits = 0;
        }
    }
}