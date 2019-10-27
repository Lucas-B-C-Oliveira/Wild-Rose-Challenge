const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Node)
  machine = null;

  @property({ type: cc.AudioClip })
  audioClick = null;

  @property(cc.Node)
  animLine0 = null;

  @property(cc.Node)
  animLine1 = null;

  @property(cc.Node)
  animLine2 = null;

  @property(cc.Node)
  TileAnimation = null;

  private block = false;

  private result = null;

  public luck = 0;
  
  public randomLine0 = 0
  public randomLine1 = 0;
  public randomLine2 = 0;

  start(): void {
    this.machine.getComponent('Machine').createMachine();
    this.checkLinesAnim();
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
      this.checkLinesAnim();
      this.block = false;
      this.machine.getComponent('Machine').spin();
      this.requestResult();
    } else if (!this.block) {
      this.block = true;
      this.machine.getComponent('Machine').lock();
    }
  }

  checkLinesAnim(): void {

    if( !this.animLine0 && !this.animLine1 && !this.animLine2 ){
      this.animLine0 = this.node.getChildByName("Line0");
      this.animLine1 = this.node.getChildByName("Line1");
      this.animLine2 = this.node.getChildByName("Line2");
    }

    this.animLine0.active = false;
    this.animLine1.active = false;
    this.animLine2.active = false;
  }

  async requestResult(): Promise<void> {
    this.result = null;
    this.result = await this.getAnswer();
  }

  getAnswer(): Promise<Array<Array<number>>> {
    var slotResult = [];
    return new Promise<Array<Array<number>>>(resolve => {
      setTimeout(() => {

        this.luck = 83 //Math.random() * 100;
        var r = Math.floor(Math.random() * 30); // r is Random Tiles
        var a = Math.floor(Math.random() * 30); // r is Random Tiles
        var n = Math.floor(Math.random() * 30); // r is Random Tiles

        this.randomLine0 = a; 
        this.randomLine1 = r;
        this.randomLine2 = n;

        

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
            [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), r, a], 
            [Math.floor(Math.random() * 30), r, a, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
            [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), r, a], 
            [Math.floor(Math.random() * 30), r, a, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]  ];

        }
        else if (this.luck > 50 && this.luck <= 83){

          // 33% of the time it should display a single line of equal tiles.
          cc.log("33% of the time it should display a single line of equal tiles.");

          slotResult = [ 
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5], 
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5], 
            [1, 2, 3, 4, 5]  ];

            for(let row = 0; row < 5; row += 1){

              for(let column = 0; column < 5; column += 1){

                var auxRandom = Math.floor(Math.random() * 30)
                var column1Check = (row == 0 && column == 1) || (row == 2 && column == 1) || (row == 4 && column == 1)
                var column3Check = (row == 1 && column == 3) || (row == 3 && column == 3);

                if(column1Check){
                  slotResult[row][column] = r;

                }

                if(column3Check){
                  slotResult[row][column] = r;
                }

                if(!column1Check && !column3Check && auxRandom == r){
                  
                  while(auxRandom == r){

                    auxRandom = Math.floor(Math.random() * 30);

                    if(auxRandom != r){
                      slotResult[row][column] = auxRandom;
                      break;
                    }

                  }
                }
                else if(!column1Check && !column3Check && auxRandom != r) {

                  slotResult[row][column] = auxRandom;
                }

              }

            }


          // slotResult = [ 
          //   [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
          //   [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30)], 
          //   [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)],
          //   [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30)], 
          //   [Math.floor(Math.random() * 30), r, Math.floor(Math.random() * 30), Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)]  ];

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
