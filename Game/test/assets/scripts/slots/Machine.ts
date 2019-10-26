import Aux from '../SlotEnum';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Machine extends cc.Component {
  @property(cc.Node)
  public button: cc.Node = null;

  @property(cc.Prefab)
  public _reelPrefab = null;

  @property(cc.Node)
  gameManager = null;

  @property({ type: cc.Prefab })
  get reelPrefab(): cc.Prefab {
    return this._reelPrefab;
  }

  set reelPrefab(newPrefab: cc.Prefab) {
    this._reelPrefab = newPrefab;
    this.node.removeAllChildren();

    if (newPrefab !== null) {
      this.createMachine();
    }
  }

  @property({ type: cc.Integer })
  public _numberOfReels = 3;

  @property({ type: cc.Integer, range: [3, 6], slide: true })
  get numberOfReels(): number {
    return this._numberOfReels;
  }

  set numberOfReels(newNumber: number) {
    this._numberOfReels = newNumber;

    if (this.reelPrefab !== null) {
      this.createMachine();
    }
  }

  private reels = [];

  public spinning = false;

  private gm = null

  createMachine(): void {
    this.gm = this.gameManager.getComponent('GameManager')
    this.node.destroyAllChildren();
    this.reels = [];

    let newReel: cc.Node;
    for (let i = 0; i < this.numberOfReels; i += 1) {
      newReel = cc.instantiate(this.reelPrefab);
      this.node.addChild(newReel);
      this.reels[i] = newReel;

      const reelScript = newReel.getComponent('Reel');
      reelScript.shuffle();
      reelScript.reelAnchor.getComponent(cc.Layout).enabled = false;
    }

    this.node.getComponent(cc.Widget).updateAlignment();
  }

  spin(): void {
    this.spinning = true;
    this.button.getChildByName('Label').getComponent(cc.Label).string = 'STOP';

    for (let i = 0; i < this.numberOfReels; i += 1) {
      const theReel = this.reels[i].getComponent('Reel');

      if (i % 2) {
        theReel.spinDirection = Aux.Direction.Down;
      } else {
        theReel.spinDirection = Aux.Direction.Up;
      }

      theReel.doSpin(0.03 * i);
    }
  }

  lock(): void {
    this.button.getComponent(cc.Button).interactable = false;
  }

  stop(result: Array<Array<number>> = null): void {
    setTimeout(() => {
      this.spinning = false;
      this.button.getComponent(cc.Button).interactable = true;
      this.button.getChildByName('Label').getComponent(cc.Label).string = 'SPIN';
    }, 2500);

    const rngMod = Math.random() / 2;
    for (let i = 0; i < this.numberOfReels; i += 1) {
      const spinDelay = i < 2 + rngMod ? i / 4 : rngMod * (i - 2) + i / 4;
      const theReel = this.reels[i].getComponent('Reel');

      setTimeout(() => {
        theReel.readyStop(result[i]);
        
        if (this.gm.luck > 93){

          // 7% of the time all lines should show equal tiles.
          this.gm.animLine0.active = true;
          this.gm.animLine1.active = true;
          this.gm.animLine2.active = true;

        }
        else if (this.gm.luck > 83 && this.gm.luck <= 93){

          // 10% of the time it should display two lines of equal tiles.
          this.gm.animLine1.active = true;
          this.gm.animLine2.active = true;

        }
        else if (this.gm.luck > 50 && this.gm.luck <= 83){

          // 33% of the time it should display a single line of equal tiles.
          this.gm.animLine1.active = true;

        }
        else if (this.gm.luck <= 50){

          // 50% of the time it should return this random configuration of tiles.

        }



      }, spinDelay * 1000);
    }
  }
}
