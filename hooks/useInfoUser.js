import React, { useState } from "react";

const useInfoUser = () => {
  const [saveUser, setSaveUser] = useState("");
  return {
    saveUser,
    setSaveUser,
  };
};

export default useInfoUser;
