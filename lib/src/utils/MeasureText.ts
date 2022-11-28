import { NativeModules } from "react-native";

export interface MeasureOptions {
  fontFamily: string,
  fontSize: number,
  fontWeight?: string,
  text: string,
}

export default {
  async measureText(options: MeasureOptions) {
    return new Promise<number>((resolve) => {
      NativeModules.NaMeasureTextModule.measureText(options, (width: number) => resolve(width));
    });
  },
};
