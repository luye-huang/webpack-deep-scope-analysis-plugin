import { Scope } from './scope';

export class WithScope extends Scope {
  constructor(scopeManager, upperScope, block) {
    super(scopeManager, 'with', upperScope, block, false);
  }

  __close(scopeManager) {
    if (this.__shouldStaticallyClose(scopeManager)) {
      return super.__close(scopeManager);
    }

    for (let i = 0, iz = this.__left.length; i < iz; ++i) {
      const ref = this.__left[i];

      ref.tainted = true;
      this.__delegateToUpperScope(ref);
    }
    this.__left = null;

    return this.upper;
  }
}
