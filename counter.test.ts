import { counter} from './counter';

describe('testing counter file', () => {
    test('empty params should result in zero', () => {
      expect(counter()).toBe(0);
    });
  });