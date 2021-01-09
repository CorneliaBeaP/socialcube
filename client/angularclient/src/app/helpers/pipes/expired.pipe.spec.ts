import { ExpiredPipe } from './expired.pipe';

describe('ExpiredPipe', () => {
  it('create an instance', () => {
    const pipe = new ExpiredPipe();
    expect(pipe).toBeTruthy();
  });
});
