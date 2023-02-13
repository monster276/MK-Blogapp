import { IconEye, IconEyeClose } from "../icon";
import React, { Fragment, useState } from "react";
import Input from "./Input";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        control={control}
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEye onClick={() => setTogglePassword(false)}></IconEye>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
