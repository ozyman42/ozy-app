import React from 'react';
import { create } from 'zustand';

export const navigation: Navigation = {
  curChild: 'Health',
  children: {
    Health: {
      isPage: false,
      navigation: {
        curChild: 'Workouts',
        children: {
          Workouts: {isPage: true, page: () => <div>workouts page</div>},
          Steps: {isPage: true, page: () => <div>steps page</div>},
          'Body Comp': {isPage: true, page: () => <div>body composition page</div>}
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
                Bybit: {isPage: true, page: () => <div>bybit time</div>},
                TradingView: {isPage: true, page: () => <div>trading view chart??</div>}
              }
            }
          },
          Taxes: {isPage: true, page: () => <div>taxes page</div>},
          Debt: {isPage: true, page: () => <div>page showing all my debts</div>},
          Subscriptions: {isPage: true, page: () => <div>page showing all my subscriptions</div>}
        }
      }
    },
    Social: {
      isPage: false,
      navigation: {
        curChild: 'Contacts',
        children: {
          Contacts: {isPage: true, page: () => <div>Contacts page</div>}
        }
      }
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
  updateNav: (navNodePath: string[], newChild: string) => void
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

export const useStore = create<Store>((set, get) => ({
  navigation,
  curPage: getPage(navigation),
  updateNav: (navNodePath, newChild) => {
    const newNav = cloneNavigation(get().navigation);
    let navNode = newNav;
    for (const pathSegment of navNodePath) {
      navNode = (navNode.children[pathSegment] as NavNode).navigation;
    }
    navNode.curChild = newChild;
    set({navigation: newNav, curPage: getPage(newNav)});
  }
}))