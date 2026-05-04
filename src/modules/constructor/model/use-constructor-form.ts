import { useEffect, useMemo, useState } from 'react';
import type { Material, Style } from '../../catalog/model/catalog-types';
import {
  buildMaterialOptions,
  buildStyleOptions,
  type MaterialOption,
  type StyleOption,
} from '../../catalog/lib/catalog-options';
import { calculateFramePrice } from '../lib/calculate-frame-price';
import { normalizeDimensions } from '../lib/normalize-dimensions';
import type {
  ConstructorDraft,
  ConstructorFormValues,
} from './constructor-types';

type UseConstructorFormInput = {
  materials: readonly Material[];
  styles: readonly Style[];
  initialMaterialId?: Material['id'] | null;
};

const resolveInitialMaterialId = (
  materials: readonly Material[],
  initialMaterialId?: Material['id'] | null,
) => {
  if (initialMaterialId == null) {
    return null;
  }

  return materials.some((item) => item.id === initialMaterialId)
    ? initialMaterialId
    : null;
};

export const useConstructorForm = ({
  materials,
  styles,
  initialMaterialId = null,
}: UseConstructorFormInput) => {
  const materialOptions = useMemo(() => buildMaterialOptions(materials), [materials]);
  const styleOptions = useMemo(() => buildStyleOptions(styles), [styles]);

  const [values, setValues] = useState<ConstructorFormValues>(() => ({
    widthInput: '',
    heightInput: '',
    materialId: resolveInitialMaterialId(materials, initialMaterialId),
    styleId: null,
    note: '',
  }));

  useEffect(() => {
    const nextMaterialId = resolveInitialMaterialId(materials, initialMaterialId);

    if (nextMaterialId == null) {
      return;
    }

    setValues((currentValues) => {
      if (currentValues.materialId === nextMaterialId || currentValues.materialId !== null) {
        return currentValues;
      }

      return {
        ...currentValues,
        materialId: nextMaterialId,
      };
    });
  }, [initialMaterialId, materials]);

  const selectedMaterial = useMemo(() => {
    return materials.find((item) => item.id === values.materialId) ?? null;
  }, [materials, values.materialId]);

  const selectedStyle = useMemo(() => {
    return styles.find((item) => item.id === values.styleId) ?? null;
  }, [styles, values.styleId]);

  const selectedMaterialOption = useMemo<MaterialOption | null>(() => {
    return materialOptions.find((item) => item.id === values.materialId) ?? null;
  }, [materialOptions, values.materialId]);

  const selectedStyleOption = useMemo<StyleOption | null>(() => {
    return styleOptions.find((item) => item.id === values.styleId) ?? null;
  }, [styleOptions, values.styleId]);

  const dimensions = useMemo(() => {
    return normalizeDimensions({
      widthInput: values.widthInput,
      heightInput: values.heightInput,
    });
  }, [values.heightInput, values.widthInput]);

  const price = useMemo(() => {
    if (!selectedMaterial || !selectedStyle || !dimensions) {
      return null;
    }

    return calculateFramePrice({
      widthCm: dimensions.widthCm,
      heightCm: dimensions.heightCm,
      materialPricePerCm: selectedMaterial.pricePerCm,
      styleCoefficient: selectedStyle.coefficient,
    });
  }, [dimensions, selectedMaterial, selectedStyle]);

  const draft = useMemo<ConstructorDraft | null>(() => {
    if (!selectedMaterial || !selectedStyle || !dimensions || price === null) {
      return null;
    }

    return {
      material: selectedMaterial,
      style: selectedStyle,
      dimensions,
      note: values.note,
      price,
    };
  }, [dimensions, price, selectedMaterial, selectedStyle, values.note]);

  const setWidthInput = (nextValue: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      widthInput: nextValue,
    }));
  };

  const setHeightInput = (nextValue: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      heightInput: nextValue,
    }));
  };

  const setSelectedMaterialOption = (option: MaterialOption) => {
    setValues((currentValues) => ({
      ...currentValues,
      materialId: option.id,
    }));
  };

  const setSelectedStyleOption = (option: StyleOption) => {
    setValues((currentValues) => ({
      ...currentValues,
      styleId: option.id,
    }));
  };

  return {
    values,
    materialOptions,
    styleOptions,
    selectedMaterialOption,
    selectedStyleOption,
    selectedMaterial,
    selectedStyle,
    dimensions,
    price,
    draft,
    canSave: draft !== null,
    setWidthInput,
    setHeightInput,
    setSelectedMaterialOption,
    setSelectedStyleOption,
  };
};
