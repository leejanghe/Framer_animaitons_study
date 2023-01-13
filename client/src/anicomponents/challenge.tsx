import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  height: 80px;
  width: 80px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Button = styled(motion.button)`
  background-color: rgba(255, 255, 255, 1);
  height: 50px;
  width: 140px;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 1rem;
  position: absolute;
  bottom: 200px;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const boxVariants = {
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.5,
      yoyo: Infinity,
      positionTransition: true,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.2,
    color: "orange",
    transition: {
      duration: 0.5,
      yoyo: Infinity,
      positionTransition: true,
    },
  },
};

function Challenge() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  return (
    <>
      <Wrapper>
        <Grid>
          {["1", "2", "3", "4"].map((n) => (
            <Box
              variants={boxVariants}
              whileHover="hover"
              onClick={() => setId(n)}
              key={n}
              layoutId={n}
            >
              {!clicked && n === "2" ? (
                <Circle layoutId="circle" />
              ) : clicked && n === "3" ? (
                <Circle layoutId="circle" />
              ) : null}
            </Box>
          ))}
        </Grid>
        <AnimatePresence>
          {id ? (
            <Overlay
              variants={overlay}
              onClick={() => setId(null)}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Box
                layoutId={id}
                style={{
                  width: 400,
                  height: 250,
                  backgroundColor: "rgba(225, 225, 225, 1)",
                }}
              />
            </Overlay>
          ) : null}

          <Button
            variants={buttonVariants}
            whileHover="hover"
            onClick={toggleClicked}
          >
            Switch
          </Button>
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

export default Challenge;
