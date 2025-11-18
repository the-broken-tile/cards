import BitReader from "./BitReader"
import BitWriter from "./BitWriter"

export class IDCodec {
    private static SMALL_DELTA_MAX = 15; // fits in 4 bits

    static encode(ids: number[]): Uint8Array {
        const sorted = ids.slice().sort((a, b) => a - b);
        const deltas = sorted.map((v, i) => (i === 0 ? v : v - sorted[i - 1]));

        const writer = new BitWriter();
        writer.write(IDCodec.SMALL_DELTA_MAX, 8);

        for (const d of deltas) {
            if (d <= IDCodec.SMALL_DELTA_MAX) {
                writer.write(0, 1);  // small delta marker
                writer.write(d, 4);
            } else {
                writer.write(1, 1);  // large delta marker
                writer.writeVarint(d);
            }
        }
        return writer.finish();
    }

    static decode(bytes: Uint8Array): number[] {
        const reader = new BitReader(bytes);
        const smallMax = reader.read(8);

        const ids: number[] = [];

        while (!reader.finished) {
            const marker = reader.read(1);
            let delta: number;

            if (marker === 0) {
                delta = reader.read(4);
            } else {
                delta = reader.readVarint();
            }

            ids.push(ids.length === 0 ? delta : ids[ids.length - 1] + delta);
        }

        return ids;
    }

    // --- Convert to/from URL-safe Base64 ---

    static encodeToString(ids: number[]): string {
        const bytes = IDCodec.encode(ids);

        let binary = "";
        for (const b of bytes) binary += String.fromCharCode(b);

        return btoa(binary)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    static decodeFromString(str: string): number[] {
        // restore padding
        str = str.replace(/-/g, "+").replace(/_/g, "/");
        while (str.length % 4) str += "=";

        const binary = atob(str);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }

        return IDCodec.decode(bytes);
    }
}
