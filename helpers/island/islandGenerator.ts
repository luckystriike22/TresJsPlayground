import * as THREE from "three";
import type { HexagonIsland } from "~/types/islandTypes/HexagonIsland";
import SimplexNoise from "simplex-noise";

type hexagonInfo = {
  position: THREE.Vector3;
  heigth: number;
};

type modelInfo = {
  position: THREE.Vector3;
};

export default class IslandGenerator {
  MAX_HEIGTH = 10;
  STONE_HEIGTH = this.MAX_HEIGTH * 0.8;
  DIRT_HEIGTH = this.MAX_HEIGTH * 0.7;
  GRASS_HEIGTH = this.MAX_HEIGTH * 0.5;
  SAND_HEIGTH = this.MAX_HEIGTH * 0.3;
  DIRT2_HEIGTH = this.MAX_HEIGTH * 0;

  island: HexagonIsland | null = null;
  treesLocations: modelInfo[] = [];
  capybaraLocations: modelInfo[] = [];

  textures: any;
  constructor(textures: any) {
    this.textures = textures;
  }

  GetIslandHexagons(islandSizeFactor:number): HexagonIsland {
    const amount = 15 * islandSizeFactor;
    const powYNumber = 1.5;
    const MAX_HEIGHT = 10;
    const simplex = new SimplexNoise();

    const stone: hexagonInfo[] = [];
    const dirt: hexagonInfo[] = [];
    const grass: hexagonInfo[] = [];
    const sand: hexagonInfo[] = [];
    const baseDirt: hexagonInfo[] = [];

    let stoneInstance: THREE.InstancedMesh;
    let dirtInstance: THREE.InstancedMesh;
    let grassInstance: THREE.InstancedMesh;
    let sandInstance: THREE.InstancedMesh;
    let baseDirtInstance: THREE.InstancedMesh;

    for (var i = -amount; i < amount; i++) {
      for (var j = -amount; j < amount; j++) {
        const position = this.tileToPosition(new THREE.Vector2(i, j));

        // return if more than 16 to make a circle
        if (position.length() > 16 * islandSizeFactor) continue;

        // Make geo
        let noise = (simplex.noise2D(i * 0.1, j * 0.1) + 1) * 0.5;
        noise = Math.pow(noise, powYNumber);
        const height = noise * MAX_HEIGHT;

        const info: hexagonInfo = {
          position: new THREE.Vector3(
            position.x,
            noise * MAX_HEIGHT * 0.5,
            position.y
          ),
          heigth: height,
        };
        if (height > this.STONE_HEIGTH) {
          stone.push(info);
        } else if (height > this.DIRT_HEIGTH) {
          dirt.push(info);
        } else if (height > this.GRASS_HEIGTH) {
          grass.push(info);
        } else if (height > this.SAND_HEIGTH) {
          sand.push(info);
        } else {
          baseDirt.push(info);
        }

        // add trees
        const randomTree = Math.ceil(Math.random() * 10);
        if (
          randomTree > 5.0 &&
          height > this.GRASS_HEIGTH &&
          height < this.DIRT_HEIGTH
        ) {
          this.treesLocations.push({
            position: new THREE.Vector3(position.x, height, position.y),
          });
        }

        // add capybara's
        const randomCapy = Math.ceil(Math.random() * 10);
        if (randomCapy > 9.0 && height > this.SAND_HEIGTH) {
          this.capybaraLocations.push({
            position: new THREE.Vector3(position.x, height, position.y),
          });
        }
      }
    }

    // set stones
    const stoneGeo = new THREE.CylinderGeometry(1, 1, 1, 6, 1, false);
    const stoneMaterial = new THREE.MeshPhysicalMaterial();
    stoneMaterial.map = this.textures.stone.map;
    stoneInstance = new THREE.InstancedMesh(
      stoneGeo,
      stoneMaterial,
      stone.length
    );

    stone.forEach((s, i) => {
      const matrix = new THREE.Matrix4();
      matrix.setPosition(s.position);
      matrix.scale(new THREE.Vector3(1, s.heigth, 1));
      stoneInstance.setMatrixAt(i++, matrix);
    });

    // set dirt
    const dirtGeo = new THREE.CylinderGeometry(1, 1, 1, 6, 1, false);
    const dirtMaterial = new THREE.MeshPhysicalMaterial();
    dirtMaterial.map = this.textures.dirt.map;
    dirtInstance = new THREE.InstancedMesh(dirtGeo, dirtMaterial, dirt.length);

    dirt.forEach((s, i) => {
      const matrix = new THREE.Matrix4();
      matrix.setPosition(s.position);
      matrix.scale(new THREE.Vector3(1, s.heigth, 1));
      dirtInstance.setMatrixAt(i, matrix);
    });

    // set grass
    const grassGeo = new THREE.CylinderGeometry(1, 1, 1, 6, 1, false);
    const grassMaterial = new THREE.MeshPhysicalMaterial();
    grassMaterial.map = this.textures.grass.map;
    grassInstance = new THREE.InstancedMesh(
      grassGeo,
      grassMaterial,
      grass.length
    );

    grass.forEach((s, i) => {
      const matrix = new THREE.Matrix4();
      matrix.setPosition(s.position);
      matrix.scale(new THREE.Vector3(1, s.heigth, 1));
      grassInstance.setMatrixAt(i, matrix);
    });

    // set sand
    const sandGeo = new THREE.CylinderGeometry(1, 1, 1, 6, 1, false);
    const sandMaterial = new THREE.MeshPhysicalMaterial();
    sandMaterial.map = this.textures.sand.map;
    sandInstance = new THREE.InstancedMesh(sandGeo, sandMaterial, sand.length);

    sand.forEach((s, i) => {
      const matrix = new THREE.Matrix4();
      matrix.setPosition(s.position);
      matrix.scale(new THREE.Vector3(1, s.heigth, 1));
      sandInstance.setMatrixAt(i, matrix);
    });

    // set baseDirt
    const baseDirtGeo = new THREE.CylinderGeometry(1, 1, 1, 6, 1, false);
    const baseDirtMaterial = new THREE.MeshPhysicalMaterial();
    baseDirtMaterial.map = this.textures.dirt2.map;
    baseDirtInstance = new THREE.InstancedMesh(
      baseDirtGeo,
      baseDirtMaterial,
      baseDirt.length
    );

    baseDirt.forEach((s, i) => {
      const matrix = new THREE.Matrix4();
      matrix.setPosition(s.position);
      matrix.scale(new THREE.Vector3(1, s.heigth, 1));
      baseDirtInstance.setMatrixAt(i, matrix);
    });

    return {
      stone: stoneInstance,
      Dirt: dirtInstance,
      grass: grassInstance,
      sand: sandInstance,
      baseDirt: baseDirtInstance,
    };
  }

  //Make sure the hexagons have a small space between eachother
  tileToPosition(tilePosition: THREE.Vector2) {
    return new THREE.Vector2(
      (tilePosition.x + (tilePosition.y % 2) * 0.5) * 1.77,
      tilePosition.y * 1.535
    );
  }
}
