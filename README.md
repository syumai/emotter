# emotter

example PR

- Emotter is an app to post and share single emoji.
- This is an example app of [connect](https://connect.build).

## Example

https://emotter.syumai.com

![Screen shot of emotter](https://user-images.githubusercontent.com/6882878/188297849-937fa64a-56d0-48b1-8684-5b3b09a07420.png)

- API: Cloud Run
- Web client: Cloudflare Pages

## Development

### Directory structures

- emotter
  - Protocol Buffer schema
- api
  - API server (Go)
- web
  - Web client app (React + Vite)

### Requirements

- buf
- protoc-gen-go
- protoc-gen-connect-go
- other generators for web

```console
$ go install github.com/bufbuild/buf/cmd/buf@latest
$ go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
$ go install github.com/bufbuild/connect-go/cmd/protoc-gen-connect-go@latest
$ cd web && npm ci
```

### Commands

```console
# code generation from protobuf
$ buf generate
```

## License

MIT

## Author

syumai
