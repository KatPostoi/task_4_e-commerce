import { storageKeys } from '../../../shared/config/storage-keys';
import { usePersistentState } from '../../../shared/hooks/usePersistentState';
import {
  createEmptyCustomFramesState,
  normalizeCustomFramesState,
  type ConstructorDraft,
  type CustomFrame,
  type CustomFramesState,
} from '../model/constructor-types';
import {
  createCustomFrameRecord,
  insertCustomFrame,
  removeCustomFrameRecord,
} from '../storage/custom-frames-storage';

export const useCustomFrames = () => {
  const [customFramesState, setCustomFramesState] =
    usePersistentState<CustomFramesState>(storageKeys.customFrames, {
      initialValue: createEmptyCustomFramesState,
      normalize: normalizeCustomFramesState,
    });

  const createFrame = (draft: ConstructorDraft): CustomFrame => {
    const frame = createCustomFrameRecord(draft);

    setCustomFramesState((currentState) => insertCustomFrame(currentState, frame));

    return frame;
  };

  const removeFrame = (frameId: string) => {
    setCustomFramesState((currentState) =>
      removeCustomFrameRecord(currentState, frameId),
    );
  };

  return {
    frames: customFramesState.items,
    createFrame,
    removeFrame,
  };
};
