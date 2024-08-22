import React from 'react';
import { create } from 'zustand';
import { ByBit } from '../custom-pages/finance/trading/bybit';
import { Steps } from '../custom-pages/health/steps';
import { BodyComp } from '../custom-pages/health/body-comp';
import { Listening } from '../custom-pages/social/communication/listening';

export const navigation: Navigation = {
  curChild: 'Health',
  children: {
    Brainstorm: {
      isPage: false,
      navigation: {
        curChild: 'Images',
        children: {
          Images: {isPage: true, page: () => <div>images pages</div>},
        }
      }
    },
    Health: {
      isPage: false,
      navigation: {
        curChild: 'Workouts',
        children: {
          Workouts: {isPage: true, page: () => <div>workouts page</div>},
          Steps: {isPage: true, page: Steps},
          'Body Comp': {isPage: true, page: BodyComp}
        }
      }
    },
    Finance: {
      isPage: false,
      navigation: {
        curChild: 'Trading',
        children: {
          Trading: {
            isPage: false,
            navigation: {
              curChild: 'Bybit',
              children: {
                Leverage: {isPage: true, page: () => <div>leverage page</div>},
                Bybit: {isPage: true, page: ByBit},
                Charting: {isPage: true, page: () => <div>trading view chart??</div>}
              }
            }
          },
          Taxes: {isPage: true, page: () => <div>taxes page</div>},
          Debt: {isPage: true, page: () => <div>page showing all my debts</div>},
          Subscriptions: {isPage: true, page: () => <div>page showing all my subscriptions</div>},
          "Net Worth": {isPage: true, page: () => <div>Net worth tracker</div>}
        }
      }
    },
    Social: {
      isPage: false,
      navigation: {
        curChild: 'Contacts',
        children: {
          Contacts: {isPage: true, page: () => <div>Contacts page</div>},
          Communication: {
            isPage: false,
            navigation: {
              curChild: 'Listening',
              children: {
                Listening: {isPage: true, page: Listening},
                Sharing: {isPage: true, page: () => <div></div>}
              }
            }
          }
        }
      }
    },
    Tasks: {
      isPage: true, page: () => <div>Todo page</div>
    }
  }
} as const;

export interface Navigation {
  curChild: string;
  children: {
    [k: string]: Page | NavNode;
  };
}

export type Page = {
  isPage: true;
  page: () => React.JSX.Element;
};

export type NavNode = {
  isPage: false;
  navigation: Navigation;
};

export type Store = {
  navigation: Navigation;
  curPage: Page;
  updateNav: (navNodePath: string[], newChild: string, skipLocalStorage?: boolean) => void;
  loadFromLocal: () => void;
}

function cloneNavigation(navigation: Navigation) {
  const clone: Navigation = {
    curChild: navigation.curChild,
    children: {}
  };
  for (const child in navigation.children) {
    const curChild = navigation.children[child];
    if (curChild.isPage) {
      clone.children[child] = {
        isPage: true,
        page: curChild.page
      };
    } else {
      clone.children[child] = {
        isPage: false,
        navigation: cloneNavigation(curChild.navigation)
      }
    }
  }
  return clone;
}

function getPage(nav: Navigation) {
  const child = nav.children[nav.curChild];
  if (child.isPage) return child;
  else return getPage(child.navigation);
}

const LOCAL_STORAGE_KEY = 'local-state';

type LocalStorageState = {
  curPath: string[];
}

function baseLocalState(): LocalStorageState {
  return {
    curPath: []
  };
}

function localGet(): LocalStorageState {
  const stored = window?.localStorage?.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : baseLocalState();
}

function localSet(newLocalState: LocalStorageState) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocalState));
}

export const useStore = create<Store>((set, get) => ({
  navigation,
  curPage: getPage(navigation),
  updateNav: (navNodePath, newChild, skipLocalStorage) => {
    const newNav = cloneNavigation(get().navigation);
    let navNode = newNav;
    for (const pathSegment of navNodePath) {
      navNode = (navNode.children[pathSegment] as NavNode).navigation;
    }
    navNode.curChild = newChild;
    set({navigation: newNav, curPage: getPage(newNav)});
    if (skipLocalStorage) return;
    const fullPath = [...navNodePath];
    while (true) {
      fullPath.push(navNode.curChild);
      const next = navNode.children[navNode.curChild];
      if (next.isPage) break;
      navNode = next.navigation;
    }
    const curLocalState = localGet();
    const newLocalState: LocalStorageState = {...curLocalState, curPath: fullPath};
    localSet(newLocalState);
  },
  loadFromLocal() {
    const localState: LocalStorageState = localGet();
    if (!localState.curPath.length) return;
    const navNodePath: string[] = [];
    const {updateNav} = get();
    for (const curNode of localState.curPath) {
      updateNav(navNodePath, curNode, true);
      navNodePath.push(curNode);
    }
  }
}));
