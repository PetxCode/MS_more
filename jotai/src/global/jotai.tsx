import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// const pleadID = atom("");
const statePlead = atomWithStorage("stateID", "");

export const usePlead = () => {
  return useAtom(statePlead);
};
