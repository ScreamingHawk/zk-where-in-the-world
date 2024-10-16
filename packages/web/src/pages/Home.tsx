import { useAccount } from "wagmi";

import { Footer } from "../components/Footer";
import Connector from "../components/Wallet/Connector";
import MainConnected from "../components/Wallet/MainConnected";
import "./Home.css";

const Home = () => {
  const { isConnected } = useAccount();

  return (
    <div>
      <h1>Where in the world?</h1>
      <h2 className="homepage__marginBtNormal">A ZK enabled game</h2>
      {isConnected ? <MainConnected /> : <Connector />}
      <Footer />
    </div>
  );
};

export default Home;
