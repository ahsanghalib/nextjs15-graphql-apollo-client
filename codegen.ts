// import * as dotenv from "dotenv";
import type { CodegenConfig } from "@graphql-codegen/cli";
import { GRAPHQL_ENDPOINT } from "./utils/constants";

// dotenv.config({ path: ".env.local" });

const config: CodegenConfig = {
  overwrite: true,
  schema: GRAPHQL_ENDPOINT,
  ignoreNoDocuments: true,
  documents: ["queries/*.graphql"],
  generates: {
    "./__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
