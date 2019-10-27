const { ccclass, property } = cc._decorator;

@ccclass
export default class Tile extends cc.Component {
  @property({ type: [cc.SpriteFrame], visible: true })
  private textures = [];

  @property(cc.Node)
  private glowAnim = null;

  private readyToAnim = false;

  private tileIndex = 0;

  start(): void {
    this.glowAnim = this.node.getChildByName("glow");
  }

  async onLoad(): Promise<void> {
    await this.loadTextures();
  }

  async resetInEditor(): Promise<void> {
    await this.loadTextures();
    this.setRandom();
  }

  async loadTextures(): Promise<boolean> {
    const self = this;
    return new Promise<boolean>(resolve => {
      cc.loader.loadResDir('gfx/Square', cc.SpriteFrame, function afterLoad(err, loadedTextures) {
        self.textures = loadedTextures;
        resolve(true);
      });
    });
  }

  setActiveAnim(value: boolean): void {
    this.glowAnim.active = value;
  }

  getStateGlowAnim(): boolean {
    return this.glowAnim.active;
  }

  setReadyToAnim(value: boolean): void {
    this.readyToAnim = value;
  }

  getReadyToAnim(): boolean {
    return this.readyToAnim;
  }

  getTileIndex(): number {
    return this.tileIndex;
  }

  

  setTile(index: number): void {
    this.node.getComponent(cc.Sprite).spriteFrame = this.textures[index];
    this.tileIndex = index;
  }

  setRandom(): void {
    const randomIndex = Math.floor(Math.random() * this.textures.length);
    this.setTile(randomIndex);
  }
}
