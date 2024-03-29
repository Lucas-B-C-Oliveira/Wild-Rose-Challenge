const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
  @property(cc.Node)
  machine = null;

  @property({ type: cc.AudioClip })
  audioClick = null;

  private block = false;

  private result = null;

  public luck = 0;
  
  public randomLine0 = 0
  public randomLine1 = 0;
  public randomLine2 = 0;

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

        this.luck = Math.floor(Math.random() * 100) + 1
        var r = Math.floor(Math.random() * 30); // r is Random Tiles
        var a = Math.floor(Math.random() * 30); // a is Random Tiles
        var n = Math.floor(Math.random() * 30); // n is Random Tiles

        this.randomLine0 = a; 
        this.randomLine1 = r;
        this.randomLine2 = n;

        if (this.luck > 93){

          // 7% of the time all lines should show equal tiles.
          cc.log("7% of the time all lines should show equal tiles.");

          slotResult = [ 
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5], 
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5], 
            [1, 2, 3, 4, 5]  ];

            for(let row = 0; row < 5; row += 1){ // Lines 

              for(let column = 0; column < 5; column += 1){ // Columns

                var auxRandom = Math.floor(Math.random() * 30)

                var column1Check = (row == 0 && column == 1) || (row == 2 && column == 1) || (row == 4 && column == 1)
                var column3Check = (row == 1 && column == 3) || (row == 3 && column == 3);

                var column2Check = (row == 0 && column == 2) || (row == 2 && column == 2) || (row == 4 && column == 2)
                var column4Check = (row == 1 && column == 4) || (row == 3 && column == 4);

                var column0Check = (row == 0 && column == 0) || (row == 2 && column == 0) || (row == 4 && column == 0)
                var column2nCheck = (row == 1 && column == 2) || (row == 3 && column == 2);

                var allColsFalse = ((!column1Check && !column3Check) && (!column2Check && !column4Check) && (!column0Check && !column2nCheck))

                if(column1Check) // Line 1 - Mid
                  slotResult[row][column] = r;

                else if(column3Check) // Line 1 - Mid 
                  slotResult[row][column] = r;

                else if(column2Check) // Line 2 - Bot
                  slotResult[row][column] = a;

                else if(column4Check) // Line 2 - Bot
                  slotResult[row][column] = a;
                
                else if(column0Check) // Line 0 - Top
                  slotResult[row][column] = n;
                
                else if(column2nCheck) // Line 0 - Top
                  slotResult[row][column] = n;
                
                else if((allColsFalse && auxRandom == r) || (allColsFalse && auxRandom == a) || (allColsFalse && auxRandom == n)){
                  
                  while(auxRandom == r || auxRandom == a || auxRandom == n){

                    auxRandom = Math.floor(Math.random() * 30);

                    if(auxRandom != r && auxRandom != a && auxRandom != n){
                      slotResult[row][column] = auxRandom;
                      break;
                    }

                  }
                }
                else if(allColsFalse && auxRandom != r && auxRandom != a && auxRandom != n)
                  slotResult[row][column] = auxRandom;
                
              }

            }
        }
        else if (this.luck > 83 && this.luck <= 93){

          // 10% of the time it should display two lines of equal tiles.
          cc.log("10% of the time it should display two lines of equal tiles.");
          this.randomLine2 = 100;

          slotResult = [ 
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5], 
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5], 
            [1, 2, 3, 4, 5]  ];

            for(let row = 0; row < 5; row += 1){ // Lines 

              for(let column = 0; column < 5; column += 1){ // Columns

                var auxRandom = Math.floor(Math.random() * 30)

                var column1Check = (row == 0 && column == 1) || (row == 2 && column == 1) || (row == 4 && column == 1)
                var column3Check = (row == 1 && column == 3) || (row == 3 && column == 3);

                var column2Check = (row == 0 && column == 2) || (row == 2 && column == 2) || (row == 4 && column == 2)
                var column4Check = (row == 1 && column == 4) || (row == 3 && column == 4);

                var allColsFalse = ((!column1Check && !column3Check) && (!column2Check && !column4Check))

                if(column1Check) // Line 1 - Mid
                  slotResult[row][column] = r;
                
                else if(column3Check) // Line 1 - Mid
                  slotResult[row][column] = r;
                
                else if(column2Check) // Line 2 - Bot
                  slotResult[row][column] = a;

                else if(column4Check) // Line 2 - Bot
                  slotResult[row][column] = a;
                
                else if((allColsFalse && auxRandom == r) || (allColsFalse && auxRandom == a) ){
                  
                  while(auxRandom == r || auxRandom == a){

                    auxRandom = Math.floor(Math.random() * 30);

                    if(auxRandom != r && auxRandom != a){
                      slotResult[row][column] = auxRandom;
                      break;
                    }

                  }
                }
                else if(allColsFalse && auxRandom != r && auxRandom != a) 
                  slotResult[row][column] = auxRandom;

              }

            }
        }
        else if (this.luck > 50 && this.luck <= 83){

          // 33% of the time it should display a single line of equal tiles.
          cc.log("33% of the time it should display a single line of equal tiles.");

          this.randomLine0 = 100; 
          this.randomLine2 = 100;

          slotResult = [ 
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5], 
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5], 
            [1, 2, 3, 4, 5]  ];

            for(let row = 0; row < 5; row += 1){ // Lines 

              for(let column = 0; column < 5; column += 1){ // Columns

                var auxRandom = Math.floor(Math.random() * 30)

                var column1Check = (row == 0 && column == 1) || (row == 2 && column == 1) || (row == 4 && column == 1)
                var column3Check = (row == 1 && column == 3) || (row == 3 && column == 3);

                if(column1Check)
                  slotResult[row][column] = r;
                
                else if(column3Check)
                  slotResult[row][column] = r;
                
                else if(!column1Check && !column3Check && auxRandom == r){
                  
                  while(auxRandom == r){

                    auxRandom = Math.floor(Math.random() * 30);

                    if(auxRandom != r){
                      slotResult[row][column] = auxRandom;
                      break;
                    }

                  }
                }
                else if(!column1Check && !column3Check && auxRandom != r) 
                  slotResult[row][column] = auxRandom;
                  
              }

            }
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

          this.randomLine0 = 100; 
          this.randomLine1 = 100;
          this.randomLine2 = 100;

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
