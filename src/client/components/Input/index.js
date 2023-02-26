import React from "react";
import { Wrapper, AffixWrapper, InputEle } from "./styled";

function Input({ suffix, prefix, width, ...props }) {
  return (
    <Wrapper width={width}>
      {prefix && <AffixWrapper left>{prefix}</AffixWrapper>}
      <InputEle suffix={suffix} prefix={prefix} {...props} />
      {suffix && <AffixWrapper right>{suffix}</AffixWrapper>}
    </Wrapper>
  );
}

export default Input;
