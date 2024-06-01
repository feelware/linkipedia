import useData from "../../store/useData";
import { Affix, Button } from "@mantine/core";

const ResetButton = () => {
  const { resetGraph } = useData();

  return (
    <Affix top={20} right={20}>
      <Button color="red" onClick={resetGraph}>Reset</Button>
    </Affix>
  );
};

export default ResetButton;
