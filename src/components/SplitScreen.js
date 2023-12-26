import { styled } from "styled-components";

//parent container
const Container = styled.div`
    display: flex;
    height: 100%;
`;

//child container
const Pane = styled.div`
    flex: ${props => props.weight};
    width: 100%;
    height: 100%;
`;

const SplitScreen = ({
    children,
    leftWeight=1,
    rightWeight=1,
    className='vert-screen'
}) => {
   /**
   * @description This component allows component distribution on right and left panel of the screen
   * @param {children} list of components to be displayed on left and right side of screen
   * @param {number} leftWeight is ratio proportion for the left component
   * @param {number} rightWeight is ratio proportion for the left component
   * @param {string} className is the class name for the container div
   * @returns {ReactNode} A React element which renders an organized hierarchy of div components
   */
    const [left, right] = children;
    return (
        <Container className={className}>
            <Pane weight={leftWeight}>
                {left}
            </Pane>
            <Pane weight={rightWeight}>
                {right}
            </Pane>
        </Container>
    )
};

export default SplitScreen;