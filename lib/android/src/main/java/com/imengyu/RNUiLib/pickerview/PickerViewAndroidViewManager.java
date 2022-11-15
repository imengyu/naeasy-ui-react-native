package com.imengyu.RNUiLib.pickerview;

import android.graphics.Color;
import android.view.Gravity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.imengyu.RNUiLib.whellview.adapter.ArrayWheelAdapter;
import com.imengyu.RNUiLib.whellview.view.WheelView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PickerViewAndroidViewManager extends SimpleViewManager<WheelView> {
  public static final String REACT_CLASS = "RCTPickerWheelView";

  ReactApplicationContext mCallerContext;

  public PickerViewAndroidViewManager(ReactApplicationContext reactContext) {
    mCallerContext = reactContext;
  }
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("GravityBOTTOM", Gravity.BOTTOM);
    constants.put("GravityCENTER", Gravity.CENTER);
    constants.put("GravityCENTER_HORIZONTAL", Gravity.CENTER_HORIZONTAL);
    constants.put("GravityCENTER_VERTICAL", Gravity.CENTER_VERTICAL);
    constants.put("GravityTOP", Gravity.TOP);
    constants.put("GravityLEFT", Gravity.LEFT);
    constants.put("GravityRIGHT", Gravity.RIGHT);
    return constants;
  }

  @Nullable
  @Override
  public Map<String, Integer> getCommandsMap() {
    return super.getCommandsMap();
  }

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Nullable
  @Override
  public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
    return MapBuilder.<String, Object>builder()
            .put("onItemSelected", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onItemSelected")))
            .build();
  }

  private int id = 0;

  @NonNull
  @Override
  protected WheelView createViewInstance(@NonNull ThemedReactContext reactContext) {
    RCTEventEmitter eventEmitter = reactContext.getJSModule(RCTEventEmitter.class);

    WheelView wheelView = new WheelView(reactContext);
    wheelView.setAlphaGradient(true);
    wheelView.setCyclic(false);
    wheelView.setTextColorCenter(Color.BLACK);
    wheelView.setOnItemSelectedListener(index -> {
      WritableMap event = Arguments.createMap();
      event.putInt("index", index);
      eventEmitter.receiveEvent(wheelView.getId(),"onItemSelected", event);
    });
    wheelView.setMinimumHeight(100);
    return wheelView;
  }

  private final Map<Integer,List<String>> optionsMap = new HashMap<>();

  @Override
  public void onDropViewInstance(@NonNull WheelView view) {
    super.onDropViewInstance(view);
    optionsMap.remove(view.getId());
  }

  @ReactProp(name = "options")
  public void setOptions(WheelView view, @Nullable ReadableArray sources) {
    List<String> mOptionsItems = optionsMap.get(view.getId());
    if (mOptionsItems == null) {
      mOptionsItems = new ArrayList<>();
      ArrayWheelAdapter<String> adapter = new ArrayWheelAdapter<>(mOptionsItems);
      optionsMap.put(view.getId(), mOptionsItems);
      view.setAdapter(adapter);
    }
    if (sources == null) {
      mOptionsItems.clear();
    } else {
      mOptionsItems.clear();
      for (int i = 0; i < sources.size(); i++)
        mOptionsItems.add(sources.getString(i));
    }
    view.invalidate();
  }

  @ReactProp(name = "alphaGradient", defaultBoolean = true)
  public void setAlphaGradient(WheelView view, boolean alphaGradient) {
    view.setAlphaGradient(alphaGradient);
  }
  @ReactProp(name = "centerLabel", defaultBoolean = false)
  public void isCenterLabel(WheelView view, boolean v) {
    view.isCenterLabel(v);
  }
  @ReactProp(name = "cyclic", defaultBoolean = false)
  public void setCyclic(WheelView view, boolean cyclic) {
    view.setCyclic(cyclic);
  }
  @ReactProp(name = "currentItem", defaultInt = 0)
  public void setCurrentItem(WheelView view, int currentItem) {
    view.setCurrentItem(currentItem);
  }
  @ReactProp(name = "itemsVisibleCount", defaultInt = 0)
  public void setItemsVisibleCount(WheelView view, int value) {
    view.setItemsVisibleCount(value);
  }
  @ReactProp(name = "dividerColor")
  public void setDividerColor(WheelView view, String value) {
    if(value != null)
      view.setDividerColor(Color.parseColor(value));
  }
  @ReactProp(name = "dividerType", defaultInt = 0)
  public void setDividerType(WheelView view, String value) {
    if(value != null)
      switch (value) {
        case "CIRCLE": view.setDividerType(WheelView.DividerType.CIRCLE); break;
        case "FILL": view.setDividerType(WheelView.DividerType.FILL); break;
        case "WRAP": view.setDividerType(WheelView.DividerType.WRAP); break;
      }
  }
  @ReactProp(name = "dividerWidth", defaultInt = 0)
  public void setDividerWidth(WheelView view, int value) {
    if(value != 0)
      view.setDividerWidth(value);
  }
  @ReactProp(name = "gravity", defaultInt = 0)
  public void setGravity(WheelView view, int value) {
    if(value != 0)
      view.setGravity(value);
  }
  @ReactProp(name = "label")
  public void setLabel(WheelView view, String value) {
    if(value != null)
      view.setLabel(value);
  }
  @ReactProp(name = "lineSpacingMultiplier")
  public void setLineSpacingMultiplier(WheelView view, double value)
  {
    if(value != 0)
      view.setLineSpacingMultiplier((float)value);
  }
  @ReactProp(name = "textColorCenter")
  public void setTextColorCenter(WheelView view, String value) {
    if(value != null)
      view.setTextColorCenter(Color.parseColor(value));
  }
  @ReactProp(name = "textColorOut")
  public void setTextColorOut(WheelView view, String value) {
    if(value != null)
      view.setTextColorOut(Color.parseColor(value));
  }
  @ReactProp(name = "textSize")
  public void setTextSize(WheelView view, int value) {
    if(value != 0)
      view.setTextSize(value);
  }
  @ReactProp(name = "textXOffset")
  public void setTextXOffset(WheelView view, int value) {
    view.setTextXOffset(value);
  }
  @ReactProp(name = "totalScrollY")
  public void setTotalScrollY(WheelView view, int value) {
    if(value != 0)
      view.setTotalScrollY(value);
  }
}
