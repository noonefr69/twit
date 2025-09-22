import React from "react";
import SearchInput from "./SearchInput";
import WhatHappend from "./WhatHappend";
import WhoToFollow from "./WhoToFollow";

export default function Search() {
  return (
    <div className="mt-3">
      <SearchInput />
      <WhatHappend />
      <WhoToFollow />
    </div>
  );
}
