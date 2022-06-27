import { ethers } from 'hardhat';

async function main() {
  const TodoList = await ethers.getContractFactory('TodoList');
  const todoList = await TodoList.deploy();

  await todoList.deployed();

  console.log(`todoList deployed to: ${todoList.address}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
