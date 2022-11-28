package com.imengyu.RNUiLib;

import androidx.annotation.NonNull;

import com.imengyu.RNUiLib.imagepicker.ImagePickerModule;
import com.imengyu.RNUiLib.pickerview.PickerViewAndroidViewManager;
import com.imengyu.RNUiLib.pickerview.PickerViewAndroidModule;
import com.imengyu.RNUiLib.dialog.DialogAndroidModule;
import com.imengyu.RNUiLib.dialog.ActionSheetAndroidModule;
import com.imengyu.RNUiLib.smartrefresh.smartrefreshlayout.SmartRefreshLayoutManager;
import com.imengyu.RNUiLib.smartrefresh.smartrefreshlayout.RCTSpinnerStyleModule;
import com.imengyu.RNUiLib.smartrefresh.header.ClassicsHeaderManager;
import com.imengyu.RNUiLib.smartrefresh.header.DefaultHeaderMananger;
import com.imengyu.RNUiLib.smartrefresh.header.MaterialHeaderManager;
import com.imengyu.RNUiLib.smartrefresh.header.AnyHeaderManager;
import com.imengyu.RNUiLib.toolbox.MeasureTextModule;
import com.imengyu.RNUiLib.toolbox.ToolboxAndroidModule;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

public class RNUiLibPackage implements ReactPackage {

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    List<ViewManager> modules = new ArrayList<>();
    modules.add(new SmartRefreshLayoutManager());
    modules.add(new ClassicsHeaderManager());
    modules.add(new MaterialHeaderManager());
    modules.add(new AnyHeaderManager());
    modules.add(new DefaultHeaderMananger());
    modules.add(new PickerViewAndroidViewManager(reactContext));
    return modules;
  }

  @NonNull
  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new ToolboxAndroidModule(reactContext));
    modules.add(new MeasureTextModule(reactContext));
    modules.add(new ActionSheetAndroidModule(reactContext));
    modules.add(new DialogAndroidModule(reactContext));
    modules.add(new PickerViewAndroidModule(reactContext));
    modules.add(new RCTSpinnerStyleModule(reactContext));
    modules.add(new ImagePickerModule(reactContext));
    return modules;
  }



}
