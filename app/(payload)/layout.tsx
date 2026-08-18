/* THIS FILE IS GENERATED BOILERPLATE — see Payload's docs before editing.
 * It is the admin panel's root layout and owns its own <html>/<body>, which is
 * why the site had to move into `app/(frontend)/`: a shared root layout would
 * wrap /admin in the site's fonts, chrome and LanguageProvider.
 */
import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";
import React from "react";

import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
