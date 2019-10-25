const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Node)
  machine = null;

  @property({ type: cc.AudioClip })
  audioClick = null;

  private block = false;

  private result = null;

  private luck = 0;

  start(): void {
    this.machine.getComponent('Machine').createMachine();
  }

  update(): void {
    if (this.block && this.result != null) {
      this.informStop();
      this.result = null;
    }
  }

  click(): void {
    cc.audioEngine.playEffect(this.audioClick, false);

    if (this.machine.getComponent('Machine').spinning === false) {
      this.block = false;
      this.machine.getComponent('Machine').spin();
      this.requestResult();
    } else if (!this.block) {
      this.block = true;
      this.machine.getComponent('Machine').lock();
    }
  }

  async requestResult(): Promise<void> {
    this.result = null;
    this.result = await this.getAnswer();
  }

  getAnswer(): Promise<Array<Array<number>>> {
    var slotResult = [];
    return new Promise<Array<Array<number>>>(resolve => {
      setTimeout(() => {

        this.luck = Math.random() * 100;
        var r = Math.floor(Math.random() * 30); // r is Random Tiles
        var a = Math.floor(Math.random() * 30); // r is Random Tiles
        var n = Math.floor(Math.random() * 30); // r is Random Tiles

        if (this.luck > 93){

          // 7% of the time all lines should show equal tiles.
          cc.log("7% of the time all lines should show equal tiles.");

          slotResult = [ 
            [n, r, a, n, n],
            [n, r, n, r, a], 
            [n, r, a, n, n],
            [n, r, n, r, a], 
            [n, r, a, n, n]  ];

        }
        else if (this.luck > 83 && this.luck <= 93){

          // 10% of the time it should display two lines of equal tiles.
          cc.log("10% of the time it should display two lines of equal tiles.");

          slotResult = [ 
            [Math.floor(Math.random() * 30), r, a, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
            [Math.floor(Math.random() * 30), r, a, r, a], 
            [Math.floor(Math.random() * 30), r, a, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
            [Math.floor(Math.random() * 30), r, a, r, a], 
            [Math.floor(Math.random() * 30), r, a, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]  ];

        }
        else if (this.luck > 50 && this.luck <= 83){

          // 33% of the time it should display a single line of equal tiles.
          cc.log("33% of the time it should display a single line of equal tiles.");

          slotResult = [ 
            [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
            [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30)], 
            [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
            [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30)], 
            [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]  ];

        }
        else if (this.luck <= 50){

          // 50% of the time it should return this random configuration of tiles.
          cc.log("50% of the time it should return this random configuration of tiles.");

          slotResult = [ 
          [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
          [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)], 
          [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
          [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)], 
          [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]  ];

        }

        resolve(slotResult);
      }, 1000 + 500 * Math.random());
    });
  }

  informStop(): void {
    const resultRelayed = this.result;
    this.machine.getComponent('Machine').stop(resultRelayed);
  }
}
