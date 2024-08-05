// Different than jest. Globals are off by default.
import { expect, test, vi } from 'vitest';

import { myFunction, originalImplementationFunction } from '~to-be-mocked';

vi.mock(import('~to-be-mocked'), async (importOriginal) => {
  // before:
  // const mod = await importOriginal<
  //  typeof import('~to-be-mocked')
  // >();

  // now:
  const mod = await importOriginal(); // type is inferred
  return {
    ...mod,
    myFunction: vi.fn(() => 'hello world'),
  };
});

const myFunctionMocked = vi.mocked(myFunction);

test('almost-empty-test', () => {
  expect(originalImplementationFunction()).toBe('original-implementation');

  expect(myFunction()).toBe('hello world');

  myFunctionMocked.mockImplementationOnce(() => 'hello there general kenobi');

  expect(myFunction()).toBe('hello there general kenobi');

  expect(myFunction()).toBe('hello world');
});
