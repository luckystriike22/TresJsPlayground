import { Vector3 } from "three";

export default class Hexagon {
  MAX_HEIGTH = 10;
  STONE_HEIGTH = this.MAX_HEIGTH * 0.8;
  DIRT_HEIGTH = this.MAX_HEIGTH * 0.7;
  GRASS_HEIGTH = this.MAX_HEIGTH * 0.5;
  SAND_HEIGTH = this.MAX_HEIGTH * 0.3;
  DIRT2_HEIGTH = this.MAX_HEIGTH * 0;

  height: number = 0;
  position: Vector3;
  type: number = 0; //  grass = 0,stone = 1,sand = 2, dirt =3, dirt2=4,
  texture: any;

  showCapybara: boolean = false;
  showTree: boolean = false;

  constructor(height: number, position: Vector3, textures: any) {
    this.position = position;
    this.height = height;
    this.initTypedProps(height, textures);
  }

  getRandomEnum(): number {
    const keys = [0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4]; //  grass = 0,stone = 1,sand = 2, dirt =3, dirt2=4,
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }

  initTypedProps(heigth: number, textures: any) {
    if (heigth > this.STONE_HEIGTH) {
      this.type = 2;
      this.texture = textures.stone;
    } else if (heigth > this.DIRT_HEIGTH) {
      this.type = 3;
      this.texture = textures.dirt;
    } else if (heigth > this.GRASS_HEIGTH) {
      this.type = 0;
      this.texture = textures.grass;
    } else if (heigth > this.SAND_HEIGTH) {
      this.type = 1;
      this.texture = textures.sand;
    } else {
      this.type = 4;
      this.texture = textures.dirt2;
    }

    // show a capybara or not?
    const randomCapy = Math.ceil(Math.random() * 10) 
    if(randomCapy> 9.0 && heigth > this.SAND_HEIGTH){
      this.showCapybara = true;
    }

    // show a tree or not?
    const randomTree = Math.ceil(Math.random() * 10) 
    if(randomTree> 7.0 && heigth > this.GRASS_HEIGTH && this.height < this.DIRT_HEIGTH){
      this.showTree = true;
    }
  }
}

export enum HexagonType {
  grass = 0,
  stone = 1,
  sand = 2,
  dirt = 3,
  dirt2 = 4,
}
