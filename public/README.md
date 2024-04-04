# Quick start

Open the `client.html` file in a web browser

## Setting a permanent API key

If you are tired of constantly entering the API key, then change `client.html` as follows:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SD client</title>
    <script src="./index.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      const key = 'YOUR API KEY'
      SD.mount('#app', key)
    </script>
  </body>
</html>
```
