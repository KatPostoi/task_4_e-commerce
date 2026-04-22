import type { Material } from '../model/catalog-types';
import frameWoodImg from '../../../shared/assets/images/frame_wood.png';
import frameMdfImg from '../../../shared/assets/images/frame_mdf.png';
import framePlasticImg from '../../../shared/assets/images/frame_plastic.png';
import frameAluminumImg from '../../../shared/assets/images/frame_aluminum.png';

export const materials: Material[] = [
  {
    id: 1,
    title: 'Деревянный багет',
    material: 'Дерево',
    description:
      'Изготавливается из различных пород дерева (сосна, ель, дуб, бук, берёза и др.). Характеризуется естественной текстурой, теплотой и благородным видом.',
    pricePerCm: 20,
    swatchHex: '#c89f6a',
    image: {
      src: frameWoodImg,
      alt: 'Деревянный багет',
    },
  },
  {
    id: 2,
    title: 'Пластиковый багет',
    material: 'Пластик',
    description:
      'Изготавливается из полимеров (полистирол, полиуретан). Лёгкий, недорогой, устойчив к влаге и перепадам температур.',
    pricePerCm: 10,
    swatchHex: '#d9c5a1',
    image: {
      src: framePlasticImg,
      alt: 'Пластиковый багет',
    },
  },
  {
    id: 3,
    title: 'МДФ багет',
    material: 'МДФ',
    description:
      'Изготавливается из мелкодисперсной древесноволокнистой плиты, спрессованной под высоким давлением. Обладает плотностью, прочностью и стабильностью формы.',
    pricePerCm: 12,
    swatchHex: '#6f4b33',
    image: {
      src: frameMdfImg,
      alt: 'МДФ багет',
    },
  },
  {
    id: 4,
    title: 'Алюминиевый багет',
    material: 'Алюминий',
    description:
      'Изготавливается из экструдированного алюминия. Лёгкий, прочный, устойчивый к коррозии.',
    pricePerCm: 18,
    swatchHex: '#2d2f35',
    image: {
      src: frameAluminumImg,
      alt: 'Алюминиевый багет',
    },
  },
];

export const materialById = new Map(
  materials.map((material) => [material.id, material] as const),
);
