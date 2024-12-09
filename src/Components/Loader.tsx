import styled from "styled-components";
import { Spin } from "antd";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
    return ( <Wrapper>
        <Spin />
      </Wrapper>)
}
export default Loader;