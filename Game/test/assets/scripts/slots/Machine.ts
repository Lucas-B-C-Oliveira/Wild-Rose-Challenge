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

  public reelScript

  createMachine(): void {
    this.gm = this.gameManager.getComponent('GameManager')
    this.node.destroyAllChildren();
    this.reels = [];

    let newReel: cc.Node;
    for (let i = 0; i < this.numberOfReels; i += 1) {
      newReel = cc.instantiate(this.reelPrefab);
      this.node.addChild(newReel);
      this.reels[i] = newReel;

      this.reelScript = newReel.getComponent('Reel');
      this.reelScript.shuffle();
      this.reelScript.reelAnchor.getComponent(cc.Layout).enabled = false;
    }

    this.node.getComponent(cc.Widget).updateAlignment();
  }

  spin(): void {

    if(this.reels.length > 0){
      this.reels.forEach((el, index) => {

        if(el != null && el.getComponent('Tile') != null){
         el.getComponent('Tile').setActiveAnim(false);

        }
  
      });
    }

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
        theReel.gmLuck = this.gm.luck
        theReel.gmRandomLine0 = this.gm.randomLine0;
        theReel.gmRandomLine1 = this.gm.randomLine1;
        theReel.gmRandomLine2 = this.gm.randomLine2;

        theReel.readyStop(result[i]);
      }, spinDelay * 1000);
    }
  }
}
