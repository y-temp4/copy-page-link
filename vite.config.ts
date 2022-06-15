import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default {
  // @ts-expect-error
  plugins: [crx({ manifest })],
};
