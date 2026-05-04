import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { materials } from '../../modules/catalog/data/materials';
import { styles } from '../../modules/catalog/data/styles';
import { parseMaterialId } from '../../modules/catalog/lib/parse-material-id';
import { useCart } from '../../modules/cart/model/use-cart';
import { useCustomFrames } from '../../modules/constructor/hooks/useCustomFrames';
import { useConstructorForm } from '../../modules/constructor/model/use-constructor-form';
import { ConstructorForm, type ConstructorFormMessage } from '../../modules/constructor/ui/ConstructorForm';
import { CustomFramesList } from '../../modules/constructor/ui/CustomFramesList';
import { Header } from '../../modules/layout/ui/Header';
import { MainWrapper } from '../../modules/layout/ui/MainWrapper';
import './design-page.css';

const DesignPage = () => {
  const [searchParams] = useSearchParams();
  const initialMaterialId = parseMaterialId(searchParams.get('materialId'));
  const [statusMessage, setStatusMessage] = useState<ConstructorFormMessage | null>(null);
  const constructorForm = useConstructorForm({
    materials,
    styles,
    initialMaterialId,
  });
  const { frames, createFrame } = useCustomFrames();
  const { addCustomFrame, isProductInCart, toggleCustomFrame } = useCart();

  useEffect(() => {
    setStatusMessage(null);
  }, [
    constructorForm.values.widthInput,
    constructorForm.values.heightInput,
    constructorForm.values.materialId,
    constructorForm.values.styleId,
  ]);

  const handleSave = () => {
    if (!constructorForm.draft) {
      setStatusMessage({
        tone: 'error',
        text: 'Заполните размеры, материал и стиль.',
      });
      return;
    }

    const frame = createFrame(constructorForm.draft);

    addCustomFrame(frame);
    setStatusMessage({
      tone: 'success',
      text: 'Рама сохранена и добавлена в корзину.',
    });
  };

  return (
    <div className="DesignPage">
      <MainWrapper>
        <Header />

        <ConstructorForm
          canSave={constructorForm.canSave}
          heightInput={constructorForm.values.heightInput}
          materialOptions={constructorForm.materialOptions}
          onHeightInputChange={constructorForm.setHeightInput}
          onMaterialSelect={constructorForm.setSelectedMaterialOption}
          onStyleSelect={constructorForm.setSelectedStyleOption}
          onSubmit={handleSave}
          onWidthInputChange={constructorForm.setWidthInput}
          price={constructorForm.price}
          selectedMaterial={constructorForm.selectedMaterialOption}
          selectedStyle={constructorForm.selectedStyleOption}
          statusMessage={statusMessage}
          styleOptions={constructorForm.styleOptions}
          widthInput={constructorForm.values.widthInput}
        />

        <CustomFramesList frames={frames} isInCart={isProductInCart} onToggleCart={toggleCustomFrame} />
      </MainWrapper>
    </div>
  );
};

export default DesignPage;
