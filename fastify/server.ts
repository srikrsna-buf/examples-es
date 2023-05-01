// Copyright 2021-2023 Buf Technologies, Inc.
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

import { fastify } from "fastify";
import { fastifyConnectPlugin } from "@bufbuild/connect-fastify";
import { cors as connectCors } from "@bufbuild/connect";
import fastifyCors from "@fastify/cors";
import { readFileSync } from "fs";
import * as esbuild from "esbuild";
import routes from "./connect";

const server = fastify();

// Options for configuring CORS. The @bufbuild/connect package exports
// convenience variables for configuring a CORS setup.
await server.register(fastifyCors, {
  // Reflects the request origin. This should only be used for development.
  // Production should explicitly specify an origin
  origin: true,
  methods: [...connectCors.allowedMethods],
  allowedHeaders: [...connectCors.allowedHeaders],
  exposedHeaders: [...connectCors.exposedHeaders],
});

await server.register(fastifyConnectPlugin, { routes });

server.get("/", (_, reply) => {
  reply.type("text/html");
  reply.send(readFileSync("./www/index-fullstack.html", "utf8"));
});

server.get("/app.css", (_, reply) => {
  reply.type("text/css");
  reply.send(readFileSync("./www/app.css", "utf8"));
});

server.get("/webclient.js", (_, reply) => {
  void esbuild
    .build({
      entryPoints: ["./webclient.ts"],
      bundle: true,
      write: false,
      globalName: "eliza",
    })
    .then((result) => {
      reply.type("application/javascript");
      reply.send(result.outputFiles[0].text);
    });
});

await server.listen({ host: "localhost", port: 3000 });
console.log("The app is running on ", server.addresses());
console.log("Run `npm run client` for a terminal client.");
console.log("Run `npm run serve` for a web client using CORS.");