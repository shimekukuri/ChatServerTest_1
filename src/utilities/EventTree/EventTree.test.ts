import { EventTree } from './EventTree.js';

describe('Testing Tree Methods', () => {
  test('Create Tree Intance', () => {
    const tree = new EventTree();
    const instance = tree instanceof EventTree;
    expect<boolean>(instance).toBe(true);
  });
});
