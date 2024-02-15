module cftest

go 1.21.7

require (
	buf.build/gen/go/connectrpc/eliza/connectrpc/go v1.14.0-20230913231627-233fca715f49.1
	buf.build/gen/go/connectrpc/eliza/protocolbuffers/go v1.32.0-20230913231627-233fca715f49.1
	connectrpc.com/connect v1.14.0
)

require google.golang.org/protobuf v1.32.0 // indirect
