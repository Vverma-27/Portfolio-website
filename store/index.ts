import Tree from "@/FileTree";
import { create } from "zustand";
interface IStore {
  history: string[];
  tabsOpen: { status: "open" | "minimized"; name: string }[];
  pushHistory: (path: string) => void;
  setHistory: (history: string[]) => void;
  setTabsOpen: (to: { status: "open" | "minimized"; name: string }[]) => void;
  fileStructure: Tree | null;
  setFileStructure: (tree: Tree) => void;
  currentHistoryIndex: number;
  currNotepadElem: string;
  setCurrentHistoryIndex: (index: number) => void;
  onOpen: (
    name: string,
    path?: string,
    from?: string,
    notCompulsory?: boolean,
    currNotepadElem?: string
  ) => void;
  onMinimize: (name: string) => void;
  onClose: (name: string) => void;
}
const useStore = create((set, get: () => IStore) => {
  return {
    history: [],
    tabsOpen: [],
    currNotepadElem: "about",
    pushHistory: (path: string) => set({ history: [...get().history, path] }),
    setHistory: (history: string[]) => set({ history }),
    setTabsOpen: (tabsOpen: { status: "open" | "minimized"; name: string }[]) =>
      set({ tabsOpen }),
    onMinimize: (name: string) => {
      // setTabsOpen((to) =>
      set({
        tabsOpen: get().tabsOpen.map((e) =>
          e.name === name ? { ...e, status: "minimized" } : { ...e }
        ),
      });
      // );
    },
    onClose: (name: string) => {
      // setTabsOpen((to) =>
      set({
        tabsOpen: get().tabsOpen.filter((e) => e.name !== name),
      });
      if (name === "explorer") set({ history: [], currentHistoryIndex: 0 });
      // );
    },
    onOpen: (
      name: string,
      path: string = "/",
      from?: string,
      notCompulsory?: boolean,
      notepadElem?: string
    ) => {
      const tabsOpen = get().tabsOpen;
      const pushHistory = get().pushHistory;
      const setCurrentHistoryIndex = get().setCurrentHistoryIndex;
      // const tabsOpen = get().tabsOpen;
      const currentHistoryIndex = get().currentHistoryIndex;
      const history = get().history;
      const setHistory = get().setHistory;
      if (name === "explorer") {
        // if (path === "/") {
        if (!tabsOpen.map((e) => e.name).includes(name) || !notCompulsory) {
          if (history.slice(-1)[0] !== path) {
            if (history.length === currentHistoryIndex) {
              pushHistory(path);
            } else {
              setHistory([...history.slice(0, currentHistoryIndex), path]);
            }
            setCurrentHistoryIndex(currentHistoryIndex + 1);
          } else {
            setCurrentHistoryIndex(history.length);
          }
        }
        // }
      }
      if (name === "notepad") {
        set({ currNotepadElem: notepadElem || "about" });
      }
      if (tabsOpen.map((e) => e.name).includes(name))
        set({
          tabsOpen: tabsOpen.map(
            (e) =>
              e.name === name
                ? {
                    ...e,
                    status:
                      e.status === "open" && path === "/"
                        ? "minimized"
                        : "open",
                  }
                : // : from === "start" && e.name === "start"
                  // ?
                  { ...e, status: "minimized" }
            // : { ...e }
          ),
        });
      else
        set({
          tabsOpen: [
            //@ts-ignore
            ...tabsOpen
              .filter((e) => e.name !== "start")
              .map((e) => ({ ...e, status: "minimized" })),
            //@ts-ignore
            { name, status: "open" },
            //@ts-ignore
            name !== "start" ? { name: "start", status: "minimized" } : {},
          ],
        });
    },
    fileStructure: null,
    setFileStructure: (tree: Tree) => set({ fileStructure: tree }),
    currentHistoryIndex: 0,
    setCurrentHistoryIndex: (index: number) =>
      set({ currentHistoryIndex: index }),
  };
});
export default useStore;
