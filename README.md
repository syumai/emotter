# emotter

- Emotter is an app to post and share single emoji.
- This is an example app of [connect](https://connect.build).

## Development

### Directory structures

- emotter
  - Protocol Buffer schema
- api
  - API server (Go)
- web
  - Frontend app (React + Vite)

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
