# Cloudflare workers

gRPC requests are translated to gRPC-Web request before they hit worker. The proxy seems to parse the grpc-web trailers (part of the body) incorrectly. The trailer take the form of `Grpc-Status: 0`. The proxy is parsing the `Grpc-Status` as the name and ` 0` as the value. This is incorrect. The proxy should parse the `Grpc-Status` as the name and `0` as the value. This is causing gRPC requests to fail.

Run the `go` script using `go run ./main.go` and you will see the gRPC-Web request succeeding and the gRPC request failing.