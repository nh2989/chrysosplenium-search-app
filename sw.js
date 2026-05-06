// =====================================================
// sw.js  — ネコノメソウ検索 Service Worker
// キャッシュバージョンを上げると全ファイルが再取得される
// 属データを追加・更新したときは CACHE_VERSION を変更する
// =====================================================

const CACHE_VERSION = 'v20260506-1827';
const CACHE_NAME    = `chrysosplenium-search-${CACHE_VERSION}`;

// インストール時にキャッシュするファイル一覧
const PRECACHE_FILES = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './data/genera.js',
    './data/chrysosplenium.js',
];

// ---- インストール: 全ファイルをキャッシュ ----
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_FILES))
            .then(() => self.skipWaiting())
    );
});

// ---- アクティベート: 古いキャッシュを削除 ----
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// ---- フェッチ: キャッシュ優先（オフライン対応）----
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request).then(response => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const toCache = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
                return response;
            });
        })
    );
});
