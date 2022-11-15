package com.imengyu.RNUiLib.pickerview;

import android.graphics.Color;
import android.view.ViewGroup;

import androidx.annotation.NonNull;

import com.imengyu.RNUiLib.pickerview.builder.OptionsPickerBuilder;
import com.imengyu.RNUiLib.pickerview.builder.TimePickerBuilder;
import com.imengyu.RNUiLib.pickerview.view.OptionsPickerView;
import com.imengyu.RNUiLib.pickerview.view.TimePickerView;
import com.imengyu.RNUiLib.whellview.view.WheelView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

public class PickerViewAndroidModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  @NonNull
  @Override
  public String getName() {
    return "PickerViewAndroid";
  }
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  public PickerViewAndroidModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  private boolean canNextDialogCallDismiss = true;

  /**
   * 显示时间选择器
   * @param options 参数
   *                {
   *                  textXOffset?: {
   *                    offsetYear: number,
   *                    offsetMonth: number,
   *                    offsetDay: number,
   *                    offsetHours: number,
   *                    offsetMinutes: number,
   *                    offsetSeconds: number,
   *                  },
   *                  label?: {
   *                    labelYear: number,
   *                    labelMonth: number,
   *                    labelDay: number,
   *                    labelHours: number,
   *                    labelMinutes: number,
   *                    labelSeconds: number,
   *                  },
   *                  range?: {
   *                    start: number,
   *                    end: number,
   *                  },
   *                  date?: number,
   *                  outSideCancelable?: boolean,
   *                  dividerType?: 'FILL'|'WARP'|'CIRCLE',
   *                  centerLabel?: boolean,
   *                  alphaGradient?: boolean,
   *                  cyclic?: boolean,
   *                  itemVisibleCount?: number,
   *                  bgColor?: string,
   *                  cancelColor?: string,
   *                  cancelText?: string,
   *                  contentTextSize?: number,
   *                  dividerColor?: string,
   *                  lineSpacingMultiplier?: number,
   *                  lunarCalendar?: boolean,
   *                  outSideColor?: string,
   *                  subCalSize?: number,
   *                  submitColor?: string,
   *                  submitText?: string,
   *                  textColorCenter?: string,
   *                  textColorOut?: string,
   *                  titleBgColor?: string,
   *                  titleColor?: string,
   *                  titleSize?: number,
   *                  titleText?: string,
   *                  type?: boolean[],
   *                  keyBackCancelable?: boolean,
   *                }
   * @param selectCallback 选择回调
   * @param dismissCallback 取消回调
   */
  @ReactMethod
  public void showTimePickerView(ReadableMap options, final Callback selectCallback, final Callback dismissCallback) {
    TimePickerBuilder timePickerBuilder = new TimePickerBuilder(reactContext.getCurrentActivity(), (date, v) -> {
      if(selectCallback != null)
        selectCallback.invoke((double)date.getTime()); //选择
      canNextDialogCallDismiss = false;
    });
    canNextDialogCallDismiss = true;
    if(options.hasKey("textXOffset")) {
      ReadableMap textXOffset = options.getMap("textXOffset");
      if(textXOffset != null)
        timePickerBuilder.setTextXOffset(
                textXOffset.getInt("offsetYear"),
                textXOffset.getInt("offsetMonth"),
                textXOffset.getInt("offsetDay"),
                textXOffset.getInt("offsetHours"),
                textXOffset.getInt("offsetMinutes"),
                textXOffset.getInt("offsetSeconds")
        );
    }
    if(options.hasKey("label")) {
      ReadableMap label = options.getMap("label");
      if(label != null)
        timePickerBuilder.setLabel(
                label.getString("labelYear"),
                label.getString("labelMonth"),
                label.getString("labelDay"),
                label.getString("labelHours"),
                label.getString("labelMinutes"),
                label.getString("labelSeconds")
        );
    }
    if(options.hasKey("range")) {
      ReadableMap range = options.getMap("range");
      if(range != null) {
        Calendar start = Calendar.getInstance();
        Calendar end = Calendar.getInstance();

        try {
          Calendar now = Calendar.getInstance();
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
          start.setTime(sdf.parse(options.getString("start")));
          end.setTime(sdf.parse(options.getString("end")));
        } catch (Exception e) {
          e.printStackTrace();
        }

        timePickerBuilder.setRangDate(start, end);
      }
    }
    if(options.hasKey("outSideCancelable"))
      timePickerBuilder.setOutSideCancelable(options.getBoolean("outSideCancelable"));
    if(options.hasKey("dividerType"))
      timePickerBuilder.setDividerType(WheelView.DividerType.valueOf(options.getString("dividerType")));
    if(options.hasKey("centerLabel"))
      timePickerBuilder.isCenterLabel(options.getBoolean("centerLabel"));
    if(options.hasKey("cyclic"))
      timePickerBuilder.isCyclic(options.getBoolean("cyclic"));
    if(options.hasKey("alphaGradient"))
      timePickerBuilder.isAlphaGradient(options.getBoolean("alphaGradient"));
    if(options.hasKey("itemVisibleCount"))
      timePickerBuilder.setItemVisibleCount(options.getInt("itemVisibleCount"));
    if(options.hasKey("bgColor"))
      timePickerBuilder.setBgColor(Color.parseColor(options.getString("bgColor")));
    if(options.hasKey("cancelColor"))
      timePickerBuilder.setCancelColor(Color.parseColor(options.getString("cancelColor")));
    if(options.hasKey("cancelText"))
      timePickerBuilder.setCancelText(options.getString("cancelText"));
    if(options.hasKey("contentTextSize"))
      timePickerBuilder.setContentTextSize(options.getInt("contentTextSize"));
    if(options.hasKey("dividerColor"))
      timePickerBuilder.setDividerColor(Color.parseColor(options.getString("dividerColor")));
    if(options.hasKey("lineSpacingMultiplier"))
      timePickerBuilder.setLineSpacingMultiplier((float)options.getDouble("lineSpacingMultiplier"));
    if(options.hasKey("lunarCalendar"))
      timePickerBuilder.setLunarCalendar(options.getBoolean("lunarCalendar"));
    if(options.hasKey("outSideColor"))
      timePickerBuilder.setOutSideColor(Color.parseColor(options.getString("outSideColor")));
    if(options.hasKey("subCalSize"))
      timePickerBuilder.setSubCalSize(options.getInt("subCalSize"));
    if(options.hasKey("submitColor"))
      timePickerBuilder.setSubmitColor(Color.parseColor(options.getString("submitColor")));
    if(options.hasKey("submitText"))
      timePickerBuilder.setSubmitText(options.getString("submitText"));
    if(options.hasKey("textColorCenter"))
      timePickerBuilder.setTextColorCenter(Color.parseColor(options.getString("textColorCenter")));
    if(options.hasKey("textColorOut"))
      timePickerBuilder.setTextColorOut(Color.parseColor(options.getString("textColorOut")));
    if(options.hasKey("titleBgColor"))
      timePickerBuilder.setTitleBgColor(Color.parseColor(options.getString("titleBgColor")));
    if(options.hasKey("titleColor"))
      timePickerBuilder.setTitleColor(Color.parseColor(options.getString("titleColor")));
    if(options.hasKey("titleSize"))
      timePickerBuilder.setTitleSize(options.getInt("titleSize"));
    if(options.hasKey("titleText"))
      timePickerBuilder.setTitleText(options.getString("titleText"));
    if(options.hasKey("type")) {
      ReadableArray typea = options.getArray("type");
      if(typea != null) {
        boolean[] type = new boolean[6];
        for (int i = 0; i < 6 && i < typea.size(); i++)
          type[i] = !typea.isNull(i) && typea.getBoolean(i);
        timePickerBuilder.setType(type);
      }
    }
    timePickerBuilder.setDecorView((ViewGroup) Objects.requireNonNull(reactContext.getCurrentActivity()).getWindow().getDecorView().findViewById(android.R.id.content));

    TimePickerView pvTime = timePickerBuilder.build();

    if(options.hasKey("date") && !options.isNull("date")) {
      try {
        Calendar now = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        now.setTime(sdf.parse(options.getString("date")));
        pvTime.setDate(now);
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    pvTime.setOnDismissListener(o -> {
      if(canNextDialogCallDismiss && dismissCallback != null)
        dismissCallback.invoke();
    });

    if(options.hasKey("keyBackCancelable"))
      pvTime.setKeyBackCancelable(options.getBoolean("keyBackCancelable"));

    //显示
    Objects.requireNonNull(reactContext.getCurrentActivity()).runOnUiThread(pvTime::show);

  }

  /**
   * 显示选择器
   * @param options 参数
   *                {
   *                  textXOffset?: {
   *                    offsetOne: number,
   *                    offsetTwo: number,
   *                    offsetThree: number,
   *                  },
   *                  cyclic?: {
   *                    cyclicOne: boolean,
   *                    cyclicTwo: boolean,
   *                    cyclicThree: boolean,
   *                  },
   *                  nPicker?: [
   *                     any[],
   *                     any[],
   *                     any[],
   *                  ], //不联动数据
   *                  picker?: [
   *                     any[],
   *                     any[][],
   *                     any[][][],
   *                  ], //联动数据
   *                  selectOptions?: number[],
   *                  outSideCancelable?: boolean,
   *                  dividerType?: 'FILL'|'WARP'|'CIRCLE',
   *                  centerLabel?: boolean,
   *                  alphaGradient?: boolean,
   *                  itemVisibleCount?: number,
   *                  bgColor?: string,
   *                  cancelColor?: string,
   *                  cancelText?: string,
   *                  contentTextSize?: number,
   *                  dividerColor?: string,
   *                  lineSpacingMultiplier?: number,
   *                  outSideColor?: string,
   *                  subCalSize?: number,
   *                  submitColor?: string,
   *                  submitText?: string,
   *                  textColorCenter?: string,
   *                  textColorOut?: string,
   *                  titleBgColor?: string,
   *                  titleColor?: string,
   *                  titleSize?: number,
   *                  titleText?: string,
   *                  keyBackCancelable?: boolean,
   *                }
   * @param callback 回调
   */
  @ReactMethod
  public void showOptionsPickerView(ReadableMap options, final Callback callback, final Callback dismissCallback) {
    OptionsPickerBuilder optionsPickerBuilder = new OptionsPickerBuilder(reactContext.getCurrentActivity(), (options1, options2, options3, v) -> {
      if (callback != null)
        callback.invoke(options1, options2, options3);
      canNextDialogCallDismiss = false;
    });

    canNextDialogCallDismiss = true;
    if(options.hasKey("textXOffset")) {
      ReadableMap textXOffset = options.getMap("textXOffset");
      if(textXOffset != null)
        optionsPickerBuilder.setTextXOffset(
                textXOffset.getInt("offsetOne"),
                textXOffset.getInt("offsetTwo"),
                textXOffset.getInt("offsetThree")
        );
    }
    if(options.hasKey("cyclic")) {
      ReadableMap cyclic = options.getMap("cyclic");
      if(cyclic != null)
        optionsPickerBuilder.setCyclic(
                cyclic.getBoolean("cyclicOne"),
                cyclic.getBoolean("cyclicTwo"),
                cyclic.getBoolean("cyclicThree")
        );
    }
    if(options.hasKey("outSideCancelable"))
      optionsPickerBuilder.setOutSideCancelable(options.getBoolean("outSideCancelable"));
    if(options.hasKey("dividerType"))
      optionsPickerBuilder.setDividerType(WheelView.DividerType.valueOf(options.getString("dividerType")));
    if(options.hasKey("centerLabel"))
      optionsPickerBuilder.isCenterLabel(options.getBoolean("centerLabel"));
    if(options.hasKey("alphaGradient"))
      optionsPickerBuilder.isAlphaGradient(options.getBoolean("alphaGradient"));
    if(options.hasKey("itemVisibleCount"))
      optionsPickerBuilder.setItemVisibleCount(options.getInt("itemVisibleCount"));
    if(options.hasKey("bgColor"))
      optionsPickerBuilder.setBgColor(Color.parseColor(options.getString("bgColor")));
    if(options.hasKey("cancelColor"))
      optionsPickerBuilder.setCancelColor(Color.parseColor(options.getString("cancelColor")));
    if(options.hasKey("cancelText"))
      optionsPickerBuilder.setCancelText(options.getString("cancelText"));
    if(options.hasKey("contentTextSize"))
      optionsPickerBuilder.setContentTextSize(options.getInt("contentTextSize"));
    if(options.hasKey("dividerColor"))
      optionsPickerBuilder.setDividerColor(Color.parseColor(options.getString("dividerColor")));
    if(options.hasKey("lineSpacingMultiplier"))
      optionsPickerBuilder.setLineSpacingMultiplier((float)options.getDouble("lineSpacingMultiplier"));
    if(options.hasKey("outSideColor"))
      optionsPickerBuilder.setOutSideColor(Color.parseColor(options.getString("outSideColor")));
    if(options.hasKey("subCalSize"))
      optionsPickerBuilder.setSubCalSize(options.getInt("subCalSize"));
    if(options.hasKey("submitColor"))
      optionsPickerBuilder.setSubmitColor(Color.parseColor(options.getString("submitColor")));
    if(options.hasKey("submitText"))
      optionsPickerBuilder.setSubmitText(options.getString("submitText"));
    if(options.hasKey("textColorCenter"))
      optionsPickerBuilder.setTextColorCenter(Color.parseColor(options.getString("textColorCenter")));
    if(options.hasKey("textColorOut"))
      optionsPickerBuilder.setTextColorOut(Color.parseColor(options.getString("textColorOut")));
    if(options.hasKey("titleBgColor"))
      optionsPickerBuilder.setTitleBgColor(Color.parseColor(options.getString("titleBgColor")));
    if(options.hasKey("titleColor"))
      optionsPickerBuilder.setTitleColor(Color.parseColor(options.getString("titleColor")));
    if(options.hasKey("titleSize"))
      optionsPickerBuilder.setTitleSize(options.getInt("titleSize"));
    if(options.hasKey("titleText"))
      optionsPickerBuilder.setTitleText(options.getString("titleText"));

    optionsPickerBuilder.setDecorView((ViewGroup) Objects.requireNonNull(reactContext.getCurrentActivity()).getWindow().getDecorView().findViewById(android.R.id.content));

    OptionsPickerView<String> pv = optionsPickerBuilder.build();


    //不连动数据
    if(options.hasKey("nPicker")) {
      ReadableArray nPicker = options.getArray("nPicker");
      if(nPicker != null) {

        //添加3个数组
        List<List<String>> nPickerValues = new ArrayList<>();
        for (int i = 0; i < 3; i++) nPickerValues.add(new ArrayList<>());

        //从JS传过来的数据填充
        for (int i = 0; i < nPicker.size(); i++) {
          if (!nPicker.isNull(i)) {
            ReadableArray valuesJs = nPicker.getArray(i);
            List<String> values = nPickerValues.get(i);
            //填充数据
            for (int j = 0; j < valuesJs.size(); j++) {
              if(!valuesJs.isNull(j))
                values.add(valuesJs.getString(j));
            }
          }
        }

        if (nPickerValues.get(2).size() > 0)
          pv.setNPicker(nPickerValues.get(0), nPickerValues.get(1), nPickerValues.get(2));
        else if (nPickerValues.get(1).size() > 0)
          pv.setNPicker(nPickerValues.get(0), nPickerValues.get(1), null);
        else
          pv.setNPicker(nPickerValues.get(0), null, null);
      }
    }
    //联动数据
    else if(options.hasKey("picker")) {
      ReadableArray picker = options.getArray("picker");
      if(picker != null) {
        List<String> pickerValueOne = new ArrayList<>();
        List<List<String>> pickerValueTwo = new ArrayList<>();
        List<List<List<String>>> pickerValueThird = new ArrayList<>();
        //从JS传过来的数据填充
        for (int i = 0; i < picker.size(); i++) {
          if (!picker.isNull(i)) {
            if(i == 0) {//0层
              ReadableArray valuesJs = picker.getArray(i);
              //填充数据
              for (int j = 0; j < valuesJs.size(); j++) {
                if (!valuesJs.isNull(j)) pickerValueOne.add(valuesJs.getString(j));
              }
            } else if(i == 1) {//1层
              ReadableArray valuesJs = picker.getArray(i);
              //填充数据
              for (int j = 0; j < valuesJs.size(); j++) {
                ReadableArray arrJs = valuesJs.getArray(j);
                List<String> arr = new ArrayList<>();
                for (int k = 0; k < arrJs.size(); k++)
                  if(!arrJs.isNull(k))
                    arr.add(arrJs.getString(k));
                pickerValueTwo.add(arr);
              }
            } else if(i == 2) {//2层
              ReadableArray valuesJs = picker.getArray(i);
              //填充数据
              for (int j = 0; j < valuesJs.size(); j++) {
                ReadableArray arrJs = valuesJs.getArray(j);
                List<List<String>> arr = new ArrayList<>();//1层数组
                for (int k = 0; k < arrJs.size(); k++) {
                  if (!arrJs.isNull(k)) {
                    ReadableArray arrInternalJs = arrJs.getArray(k);
                    List<String> arrInternal = new ArrayList<>();//2层数组
                    for (int l = 0; l < arrInternalJs.size(); l++)
                      if(!arrInternalJs.isNull(l))
                        arrInternal.add(arrInternalJs.getString(l));//最里面的数据
                    arr.add(arrInternal);
                  }
                }
                pickerValueThird.add(arr);
              }
            }
          }
        }
        if(picker.size() == 1)
          pv.setPicker(pickerValueOne);
        else if(picker.size() == 2)
          pv.setPicker(pickerValueOne, pickerValueTwo);
        else if(picker.size() == 3)
          pv.setPicker(pickerValueOne, pickerValueTwo, pickerValueThird);
      }
    }
    //初始选择数据
    List<Integer> select = new ArrayList<>();
    if(options.hasKey("selectOptions")) {
      ReadableArray selecta = options.getArray("selectOptions");
      if(selecta != null) {
        for (int i = 0; i < 3 && i < selecta.size(); i++)
          if(!selecta.isNull(i)) select.add(selecta.getInt(i));
      }
    }
    if(options.hasKey("keyBackCancelable"))
      pv.setKeyBackCancelable(options.getBoolean("keyBackCancelable"));
    pv.setOnDismissListener(o -> {
      if(canNextDialogCallDismiss && dismissCallback != null)
        dismissCallback.invoke();
    });

    //显示
    Objects.requireNonNull(reactContext.getCurrentActivity()).runOnUiThread(() -> {
      pv.show();

      if(select.size() == 1)
        pv.setSelectOptions(select.get(0));
      else if(select.size() == 2)
        pv.setSelectOptions(select.get(0), select.get(1));
      else if(select.size() == 3)
        pv.setSelectOptions(select.get(0), select.get(1), select.get(2));
    });
  }

}

