import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
  Heading,
} from '@chakra-ui/react';

import './App.css';

import DepthChartDashboard from './components/depth-chart-dashboard';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
});

const system = createSystem(defaultConfig, config);

function App() {
  return (
    <ChakraProvider value={system}>
      <div className="App">
        <header className="App-header">
          <Heading>Player Depth Chart</Heading>
        </header>

        <DepthChartDashboard />
      </div>
    </ChakraProvider>
  );
}

export default App;
