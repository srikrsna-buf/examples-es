// Copyright 2021-2024 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createTransport as createConnectTransportBase } from '@connectrpc/connect/protocol-connect';
import { createTransport as createGrpcTransportBase } from '@connectrpc/connect/protocol-grpc';
import { createTransport as createGrpcWebTransportBase } from '@connectrpc/connect/protocol-grpc-web';
import { createFetchClient } from '@connectrpc/connect/protocol';
import type { CommonTransportOptions } from '@connectrpc/connect/protocol';

interface TransportOptions extends Partial<CommonTransportOptions> {
	baseUrl: string;
}

export function createConnectTransport(options: TransportOptions) {
	return createConnectTransportBase(validateTransportOptions(options));
}

export function createGrpcTransport(options: TransportOptions) {
	return createGrpcTransportBase(validateTransportOptions(options));
}

export function createGrpcWebTransport(options: TransportOptions) {
	return createGrpcWebTransportBase(validateTransportOptions(options));
}

function validateTransportOptions(options: TransportOptions): CommonTransportOptions {
	return {
		...options,
		httpClient: options.httpClient ?? createFetchClient(fetch),
		useBinaryFormat: options.useBinaryFormat ?? false,
		interceptors: options.interceptors ?? [],
		acceptCompression: options.acceptCompression ?? [],
		sendCompression: options.sendCompression ?? null,
		readMaxBytes: options.readMaxBytes ?? 0xffffffff,
		writeMaxBytes: options.writeMaxBytes ?? 0xffffffff,
		compressMinBytes: options.compressMinBytes ?? -1,
	};
}
