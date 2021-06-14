import './App.css';
import Button from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css'; 
import { Flex, WhiteSpace } from 'antd-mobile';

function App() {
  return (
    <div className="App">
      <Flex>
      <Flex.Item>t</Flex.Item>
      <Flex.Item>t</Flex.Item>
    </Flex>
      <Button type="primary">This is a button</Button>
    </div>
  );
}

export default App;
