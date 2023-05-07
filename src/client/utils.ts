
export const defaultBackground = { r: 20, g: 20, b: 20, a: 0.3 };

export const formatRgba = (rgba: { r: number, g: number, b: number, a: number }) => {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}