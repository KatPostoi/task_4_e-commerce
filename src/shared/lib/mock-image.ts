import type { ImageAsset } from '../types/domain';

type MockImagePalette = {
  background: string;
  foreground: string;
  accent: string;
};

const defaultPalette: MockImagePalette = {
  background: '#f4e5d1',
  foreground: '#8a5b2b',
  accent: '#d8b07b',
};

const escapeXml = (value: string) => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
};

const toDataUri = (svgMarkup: string) => {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarkup)}`;
};

export const createMockImage = (
  label: string,
  palette: Partial<MockImagePalette> = {},
): ImageAsset => {
  const resolvedPalette = { ...defaultPalette, ...palette };
  const safeLabel = escapeXml(label);

  const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-labelledby="title">
      <title>${safeLabel}</title>
      <rect width="800" height="600" rx="48" fill="${resolvedPalette.background}" />
      <rect x="72" y="72" width="656" height="456" rx="28" fill="${resolvedPalette.accent}" opacity="0.28" />
      <path d="M176 176h448v248H176z" fill="none" stroke="${resolvedPalette.foreground}" stroke-width="22" />
      <path d="M214 214h372v172H214z" fill="none" stroke="${resolvedPalette.foreground}" stroke-width="8" opacity="0.4" />
      <text x="50%" y="76%" fill="${resolvedPalette.foreground}" font-family="Avenir Next, Segoe UI, sans-serif" font-size="42" font-weight="700" text-anchor="middle">${safeLabel}</text>
    </svg>
  `;

  return {
    src: toDataUri(svgMarkup),
    alt: label,
  };
};
