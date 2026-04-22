import framePreviewImage from '../../../shared/assets/images/frame.png';
import { createLocalId, createTimestamp } from '../../../shared/lib/ids';
import type {
  ConstructorDraft,
  CustomFrame,
  CustomFramesState,
} from '../model/constructor-types';

const createFrameTitle = (
  widthCm: number,
  heightCm: number,
): string => {
  return `Рама ${widthCm}×${heightCm}`;
};

export const createCustomFrameRecord = ({
  material,
  style,
  dimensions,
  note,
  price,
}: ConstructorDraft): CustomFrame => {
  const timestamp = createTimestamp();
  const id = createLocalId('custom-frame');
  const title = createFrameTitle(dimensions.widthCm, dimensions.heightCm);

  return {
    id,
    slug: id,
    source: 'custom',
    title,
    description: `${material.title}, ${style.name}`,
    size: dimensions,
    price,
    image: {
      src: framePreviewImage,
      alt: title,
    },
    material: {
      id: material.id,
      title: material.title,
      pricePerCm: material.pricePerCm,
      swatchHex: material.swatchHex,
    },
    style: {
      id: style.id,
      name: style.name,
      coefficient: style.coefficient,
    },
    note: note.trim() || null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const insertCustomFrame = (
  state: CustomFramesState,
  frame: CustomFrame,
): CustomFramesState => {
  return {
    ...state,
    items: [frame, ...state.items],
    updatedAt: createTimestamp(),
  };
};

export const removeCustomFrameRecord = (
  state: CustomFramesState,
  frameId: string,
): CustomFramesState => {
  return {
    ...state,
    items: state.items.filter((frame) => frame.id !== frameId),
    updatedAt: createTimestamp(),
  };
};
