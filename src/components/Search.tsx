import React from "react";
import SearchInput from "./SearchInput";
// import WhatHappend from "./WhatHappend";
import WhoToFollow from "./WhoToFollow";
import { headers } from "next/headers";

export default async function Search() {
  const usersRes = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") || "",
    },
  });
  const users = await usersRes.json();

  return (
    <div className="mt-3">
      <SearchInput users={users} />
      {/* <WhatHappend /> */}
      <WhoToFollow usersSer={users} />
    </div>
  );
}
