import framePreviewImage from '../../../shared/assets/images/frame.png';
import { storageKeys } from '../../../shared/config/storage-keys';
import { usePersistentState } from '../../../shared/hooks/usePersistentState';
import { createLocalId, createTimestamp } from '../../../shared/lib/ids';
import type { Material, Style } from '../../catalog/model/catalog-types';
import {
  createEmptyCustomFramesState,
  normalizeCustomFramesState,
  type CustomFrame,
  type CustomFramesState,
} from '../model/constructor-types';

type CreateCustomFrameInput = {
  material: Material;
  style: Style;
  widthCm: number;
  heightCm: number;
  note: string;
  price: number;
};

const createCustomFrameRecord = ({
  material,
  style,
  widthCm,
  heightCm,
  note,
  price,
}: CreateCustomFrameInput): CustomFrame => {
  const timestamp = createTimestamp();
  const id = createLocalId('custom-frame');
  const title = `Рама ${widthCm}×${heightCm}`;

  return {
    id,
    slug: id,
    source: 'custom',
    title,
    description: `${material.title}, ${style.name}`,
    size: {
      widthCm,
      heightCm,
    },
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

export const useCustomFrames = () => {
  const [customFramesState, setCustomFramesState] =
    usePersistentState<CustomFramesState>(storageKeys.customFrames, {
      initialValue: createEmptyCustomFramesState,
      normalize: normalizeCustomFramesState,
    });

  const createFrame = (input: CreateCustomFrameInput) => {
    const frame = createCustomFrameRecord(input);

    setCustomFramesState((currentState) => ({
      ...currentState,
      items: [frame, ...currentState.items],
      updatedAt: createTimestamp(),
    }));

    return frame;
  };

  const removeFrame = (frameId: string) => {
    setCustomFramesState((currentState) => ({
      ...currentState,
      items: currentState.items.filter((frame) => frame.id !== frameId),
      updatedAt: createTimestamp(),
    }));
  };

  return {
    frames: customFramesState.items,
    createFrame,
    removeFrame,
  };
};
