import { cache } from "react";

export const getRenderNow = cache(() => Date.now());
