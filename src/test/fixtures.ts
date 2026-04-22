import type {
  CatalogItem,
  CatalogMaterial,
  StyleSnapshot,
} from '../modules/catalog/model/catalog-types';
import type {
  CartViewItem,
  DeliverySelection,
  ProductSnapshot,
} from '../modules/cart/model/cart-types';

const baseImage = {
  src: '/test-image.png',
  alt: 'Test image',
};

const baseMaterial: CatalogMaterial = {
  id: 1,
  title: 'Дерево',
  material: 'wood',
  description: 'Тестовый материал',
  pricePerCm: 25,
  swatchHex: '#AA7744',
  image: baseImage,
};

const baseStyle: StyleSnapshot = {
  id: 'classic',
  name: 'Классика',
  coefficient: 1.2,
};

export const createCatalogItem = (
  overrides: Partial<CatalogItem> = {},
): CatalogItem => {
  return {
    id: 'catalog-item',
    slug: 'catalog-item',
    title: 'Тестовая рама',
    description: 'Описание тестовой рамы',
    source: 'default',
    colorLabel: 'Орех',
    size: {
      widthCm: 30,
      heightCm: 40,
    },
    price: 2500,
    stock: 5,
    image: baseImage,
    material: baseMaterial,
    style: baseStyle,
    ...overrides,
  };
};

export const createProductSnapshot = (
  overrides: Partial<ProductSnapshot> = {},
): ProductSnapshot => {
  return {
    id: 'product-1',
    source: 'default',
    slug: 'product-1',
    title: 'Тестовый товар',
    description: 'Описание тестового товара',
    image: baseImage,
    size: {
      widthCm: 30,
      heightCm: 40,
    },
    colorLabel: 'Орех',
    unitPrice: 2500,
    material: {
      id: baseMaterial.id,
      title: baseMaterial.title,
      pricePerCm: baseMaterial.pricePerCm,
      swatchHex: baseMaterial.swatchHex,
    },
    style: baseStyle,
    ...overrides,
  };
};

export const createCartViewItem = (
  overrides: Partial<CartViewItem> = {},
): CartViewItem => {
  const frame = overrides.frame ?? createProductSnapshot();
  const quantity = overrides.quantity ?? 2;

  return {
    id: 'cart-item-1',
    productId: frame.id,
    source: frame.source,
    quantity,
    snapshot: frame,
    frame,
    subtotal: quantity * frame.unitPrice,
    createdAt: '2026-04-22T10:00:00.000Z',
    updatedAt: '2026-04-22T10:00:00.000Z',
    ...overrides,
  };
};

export const createDeliverySelection = (
  overrides: Partial<DeliverySelection> = {},
): DeliverySelection => {
  return {
    serviceId: 'city-courier',
    title: 'Доставка',
    price: 600,
    ...overrides,
  };
};
