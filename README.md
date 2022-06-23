# copy-page-link

Copy page title and URL.

Chrome Web Store: https://chrome.google.com/webstore/detail/copy-page-link/cgbbegcmdjobachbnlinejnidbaeakli

## Development

```shell
$ yarn
$ yarn build
```

Then test the extension at `chrome://extensions` .

## Deploy

```shell
$ yarn build
$ zip -r dist.zip dist
```

Then add the item from https://chrome.google.com/webstore/devconsole .
