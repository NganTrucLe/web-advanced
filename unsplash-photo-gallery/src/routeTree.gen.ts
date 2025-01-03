/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as PhotosIndexImport } from './routes/photos/index'
import { Route as PhotosPhotoIdImport } from './routes/photos/$photoId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PhotosIndexRoute = PhotosIndexImport.update({
  path: '/photos/',
  getParentRoute: () => rootRoute,
} as any)

const PhotosPhotoIdRoute = PhotosPhotoIdImport.update({
  path: '/photos/$photoId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/photos/$photoId': {
      id: '/photos/$photoId'
      path: '/photos/$photoId'
      fullPath: '/photos/$photoId'
      preLoaderRoute: typeof PhotosPhotoIdImport
      parentRoute: typeof rootRoute
    }
    '/photos/': {
      id: '/photos/'
      path: '/photos'
      fullPath: '/photos'
      preLoaderRoute: typeof PhotosIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/photos/$photoId': typeof PhotosPhotoIdRoute
  '/photos': typeof PhotosIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/photos/$photoId': typeof PhotosPhotoIdRoute
  '/photos': typeof PhotosIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/photos/$photoId': typeof PhotosPhotoIdRoute
  '/photos/': typeof PhotosIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/photos/$photoId' | '/photos'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/photos/$photoId' | '/photos'
  id: '__root__' | '/' | '/photos/$photoId' | '/photos/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PhotosPhotoIdRoute: typeof PhotosPhotoIdRoute
  PhotosIndexRoute: typeof PhotosIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PhotosPhotoIdRoute: PhotosPhotoIdRoute,
  PhotosIndexRoute: PhotosIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/photos/$photoId",
        "/photos/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/photos/$photoId": {
      "filePath": "photos/$photoId.tsx"
    },
    "/photos/": {
      "filePath": "photos/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
