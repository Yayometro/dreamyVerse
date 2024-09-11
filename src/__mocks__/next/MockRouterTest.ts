import { NextRouter } from "next/router";

export function createMockRouter(router:Partial<NextRouter>) : NextRouter {
  return {
    basePath: "",
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: false,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router,
  } as NextRouter
}
