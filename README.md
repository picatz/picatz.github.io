# My Personal Website

[This](https://picatz.github.io) is a static website built with 
[Svelte](https://svelte.dev) and [Vite](https://vitejs.dev). [Deployment](./github/workflows/deploy.yml)
is handled with GitHub Actions.

## Build Locally

Requires `npm` is installed (version 16 or greater).

```console
$ npm install

up to date, audited 25 packages in 596ms

4 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
$ npm run build

  picatz-app@0.0.0 build
  vite build

vite v3.2.4 building for production...
✓ 10 modules transformed.
11:37:58 PM [vite-plugin-svelte] dom compile done.
package         files    time      avg
picatz-app          5   0.11s   21.7ms
dist/index.html                 2.56 KiB
dist/assets/index.bac1b708.js   9.61 KiB / gzip: 3.41 KiB
$ npm run preview

  picatz-app@0.0.0 preview
  vite preview

  ➜  Local:   http://127.0.0.1:4173/
  ➜  Network: use --host to expose
```
