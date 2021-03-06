'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "31bd4cc48e14cb969579a495d0070fdc",
"assets/FontManifest.json": "4a531ad55255908783eadbc54418fd11",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/fonts/Montserrat-Bold.ttf": "d14ad1035ae6da4e5a71eca362a8d696",
"assets/fonts/Montserrat-ExtraBold.ttf": "dc2f156b60f53c591fc0d2b98cbf01bf",
"assets/fonts/Montserrat-Italic.ttf": "df17124cad6f4767f3bf115f961a14b4",
"assets/fonts/Montserrat-Light.ttf": "a17f43cc60643d965636985afc00a221",
"assets/fonts/Montserrat-Medium.ttf": "aca6287f22eef510c1e622c97bb1e1e1",
"assets/fonts/Montserrat-Regular.ttf": "34de1239b12123b85ff1a68b58835a1f",
"assets/fonts/Montserrat-SemiBold.ttf": "7ffeec2b4edb434d393875ffbe633c30",
"assets/fonts/Montserrat-Thin.ttf": "426a4b74bf1d6920508384899bfb695b",
"assets/fonts/Montserrat-ThinItalic.ttf": "13cf2c4a5e253cf43b82a7d3f8485c88",
"assets/images/android.png": "29f15bec3b7552f3508e18e25ee4e39b",
"assets/images/app-store.png": "671cd61a346b8e679de2d8a6d4d44f4a",
"assets/images/background.png": "68a8e8580134f25da69a5689f879e104",
"assets/images/behance.png": "945683290850526c1cf1892c4e0eb99b",
"assets/images/bg.webp": "c682de9af31e29d9115e0e7627cf98e4",
"assets/images/bg2ndImage.png": "a85408f387dc42a053c9c82f91e9ebcd",
"assets/images/dart.png": "65c2aa86d62a098b21702842034e016d",
"assets/images/figma.png": "ac00fa7b6768286ad44283e4595dd07e",
"assets/images/flutter.png": "47e4c5ea380dc3b9241ee7b4f8b65c20",
"assets/images/gmail.png": "ba06ff64c7f71d9583c1aa4898d64e71",
"assets/images/instagram.png": "923e0b56889f352cd1013ead94149280",
"assets/images/java.png": "1e1ba20cfa4a4c86d66437632e35df2f",
"assets/images/keyboard1.webp": "37cd4ba28180eabfae9f67ab98b52998",
"assets/images/laptop1.webp": "343eb7ed7df4feedd2c2cb30b598c198",
"assets/images/portfolio_image.png": "983db03529f81c0852563be3e80a7bb1",
"assets/images/profile.jpg": "ef88260cd7578c067b4d69de087be852",
"assets/images/project1.png": "5506793713ec4d91aaefb4905e4e3740",
"assets/images/project2a.png": "7972e36781782b8c2c2c5ee4252181c6",
"assets/images/project2b.png": "ac66755d4fa2f74c820d5cd99164c746",
"assets/images/project2c.png": "d319ed0d595eb6866c6e333c009b526c",
"assets/images/project3a.png": "bd3a959b531547a15db5561fa0c4cba8",
"assets/images/project3b.png": "c35013d944c82a52dda5617893d3987d",
"assets/images/project3c.png": "5511246a46fcbda4b0d46627ddb9b5e3",
"assets/images/swift.png": "f80169225dfb4313a0a39ef107f55d50",
"assets/images/whatsapp.png": "8ce48eacdf482ef4657fe8ca6a6fd7ab",
"assets/NOTICES": "be2b75e821ebbac7a986b011df118232",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/glass/images/noise.png": "326f70bd3633c4bb951eac0da073485d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "de5f7fa09a1e292664fa10c822f53a2f",
"/": "de5f7fa09a1e292664fa10c822f53a2f",
"main.dart.js": "9b82c5f792d2f323fd70304eaa20a440",
"manifest.json": "35bbfc7c9149dfea480897592b60a5b6",
"version.json": "18604ee7e3d0bcfe1369d56d1fcbe626"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
