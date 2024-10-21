import { Box, Button, Text } from "@0xsequence/design-system";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { Footer } from "../components/Footer";
import Connector from "../components/Wallet/Connector";
import MainConnected from "../components/Wallet/MainConnected";
import "./Home.css";

const Home = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Where in the world?</h1>
      <h2 className="homepage__marginBtNormal">A ZK enabled game</h2>
      {isConnected ? <MainConnected /> : <Connector />}
      <Box display="flex" flexDirection="column" gap="4" alignItems="center">
        <Button
          variant="feature"
          onClick={() => navigate("/play")}
          shape="square"
          label={
            <Text variant="xlarge" fontWeight="bold">
              Play
            </Text>
          }
        />
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
