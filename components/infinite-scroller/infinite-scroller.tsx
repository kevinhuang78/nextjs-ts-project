import styled, { keyframes } from "styled-components";
import { PropsWithChildren } from "react";
import colors from "../../constants/colors";
import { minWidth } from "../../utils/mixins";

const infiniteScroll = keyframes`
  from { transform: translateX(0); }
  /*
   * 50% because we duplicate the same content
   * twice, it'll do a "fake" infinite loop
   */
  to { transform: translateX(-50%); }
`;

const Container = styled.div`
  background-color: ${colors.primary};
  color: ${colors.white};
`;

const Slider = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  animation: ${infiniteScroll} 120s linear infinite;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${minWidth.sm`
    flex-wrap: nowrap;
  `}
`;

const Text = styled.p`
  white-space: nowrap;
  padding: 0 15px;
`;

const InfiniteScroller = ({ children }: PropsWithChildren) => (
  <Container>
    <Slider>
      <ContentContainer>
        {Array.from(Array(2).keys()).map((val) => (
          <Content key={val}>
            <Text>{children}</Text>
          </Content>
        ))}
      </ContentContainer>
    </Slider>
  </Container>
);

export default InfiniteScroller;
