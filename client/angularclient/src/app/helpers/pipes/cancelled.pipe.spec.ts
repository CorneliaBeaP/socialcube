import { CancelledPipe } from './cancelled.pipe';

describe('CancelledPipe', () => {
  it('create an instance', () => {
    const pipe = new CancelledPipe();
    expect(pipe).toBeTruthy();
  });
});
