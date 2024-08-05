// Different than jest. Globals are off by default.
import { describe, test } from 'vitest';

const wait = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

/**
 * When running concurrent tests, Snapshots and Assertions must use `expect`
 * from the local Test Context to ensure the right test is detected.
 */
describe.concurrent('suite', () => {
  test('concurrent test 1', async ({ expect }) => {
    expect(1).toBe(1);

    await wait(500);

    // eslint-disable-next-line no-console
    console.log('concurrent-test-examples.test | test 1');
  });
  test('concurrent test 2', async ({ expect }) => {
    expect(2).toBe(2);

    await wait(400);

    // eslint-disable-next-line no-console
    console.log('concurrent-test-examples.test | test 2');
  });
  test('concurrent test 3', async ({ expect }) => {
    expect(3).toBe(3);

    await wait(300);

    // eslint-disable-next-line no-console
    console.log('concurrent-test-examples.test | test 3');
  });
});
