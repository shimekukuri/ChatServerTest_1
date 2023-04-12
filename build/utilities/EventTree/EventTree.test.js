import { EventTree } from './EventTree.js';
describe('Testing Tree Methods', () => {
    test('Create Tree Intance', () => {
        const tree = new EventTree();
        const instance = tree instanceof EventTree;
        expect(instance).toBe(true);
    });
    test('method addTrunk', () => {
        const tree = new EventTree();
        tree.addTrunk('test', 'test', 'test');
        //@ts-ignore
        expect(Object.entries(tree.trunks).length).toBe(1);
    });
});
