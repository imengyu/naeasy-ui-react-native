import { Color, DynamicColor, DynamicThemeStyleSheet } from '../lib';

export const TestStyles = DynamicThemeStyleSheet.create({
  TitleText: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginTop: 5,
    color: DynamicColor(Color.darkGrey),
  },
  PaddingS: {
    padding: 10,
  },
});
