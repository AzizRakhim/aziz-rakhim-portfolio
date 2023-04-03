import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "mjrzgwbi",
  dataset: "production",
  token: process.env.REACT_APP_SANITY_TOKEN,
  useCdn: false,
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
