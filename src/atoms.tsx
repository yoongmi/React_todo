import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "dragableTodo",
  storage: localStorage,
});

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    toDo: [],
    doing: [],
    done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const BoardState = atom<string[]>({
  key: "Board",
  default: ["toDo", "doing", "done"],
  effects_UNSTABLE: [persistAtom],
});
