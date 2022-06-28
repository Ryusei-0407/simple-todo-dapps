import { ethers, providers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import artifact from './abi/TodoList.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

type Task = {
  id: string;
  content: string;
  isCompleted: boolean;
};

const useContent = (Contract: ethers.Contract) => {
  const { taskCount, tasks } = Contract.functions;
  const [taskCountValue, setTaskCountValue] = useState<string>('');
  const [tasksValue, setTasksValue] = useState<Array<Task>>([]);

  useEffect(() => {
    const getTasks = async () => {
      const _taskCount = await taskCount();
      setTaskCountValue(_taskCount);

      const _tasks = [];
      for (let i = 1; i <= _taskCount; ++i) {
        const _task = await tasks(i);
        _tasks.push({ ..._task, id: i });
      }
      setTasksValue(_tasks);
    };
    getTasks();
  }, []);

  return {
    taskCount: taskCountValue,
    tasks: tasksValue,
  };
};

const Content = ({ contract }) => {
  const { taskCount, tasks } = useContent(contract);

  return (
    <div>
      <p>{`taskCount ... ${taskCount}`}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, index) => (
            <tr key={`task.${index}`}>
              <td>{t.id}</td>
              <td>{t.content}</td>
              <td>{t.isCompleted ? 'Completed' : 'Not Completed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const provider = new ethers.providers.JsonRpcProvider();
  const contract = new ethers.Contract(contractAddress, artifact.abi, provider);

  return (
    <div>
      <h1>Hello, World</h1>
      <Content contract={contract} />
    </div>
  );
};

export default App;
