package main

import (
	"context"
	"log"
	"net/http"

	"buf.build/gen/go/connectrpc/eliza/connectrpc/go/connectrpc/eliza/v1/elizav1connect"
	elizav1 "buf.build/gen/go/connectrpc/eliza/protocolbuffers/go/connectrpc/eliza/v1"
	"connectrpc.com/connect"
)

const (
	baseURL = "https://cftest.connectrpcconformance.com"
)

func main() {
	log.SetFlags(0)
	ctx := context.Background()
	grpcWebClient := newClient(
		connect.WithGRPCWeb(),
	)
	res, err := grpcWebClient.Say(ctx, connect.NewRequest(&elizav1.SayRequest{
		Sentence: "using grpc-web",
	}))
	if err != nil {
		log.Fatalln("grpc-web error ", err)
	}
	log.Println("grpc-web response ", res.Msg)
	grpcClient := newClient(
		connect.WithGRPC(),
	)
	res, err = grpcClient.Say(ctx, connect.NewRequest(&elizav1.SayRequest{
		Sentence: "using grpc",
	}))
	if err != nil {
		log.Fatalln("grpc error ", err)
	}
	log.Println("grpc response ", res.Msg)
}

func newClient(
	options ...connect.ClientOption,
) elizav1connect.ElizaServiceClient {
	return elizav1connect.NewElizaServiceClient(
		http.DefaultClient,
		baseURL,
		options...,
	)
}
