import { NotStaked } from '@/components/dialogs';
import { Actions, Balance, Chart, Header, Stats } from './components';

const Home = () => {
  return (
    <div className="h-[100vh] w-full">
      <Header />
      <Balance />
      <Chart />
      <Stats />
      <Actions />
      <NotStaked />
    </div>
  );
};

export default Home;
