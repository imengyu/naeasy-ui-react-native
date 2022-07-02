package com.imengyu.RNUiLib.smartrefresh.header;

import android.graphics.Color;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.imengyu.RNUiLib.smartrefresh.smartrefreshlayout.SpinnerStyleConstants;
import com.scwang.smart.refresh.header.ClassicsHeader;

public class ClassicsHeaderManager extends SimpleViewManager<ClassicsHeader> {
    @Override
    public String getName() {
        return "RCTClassicsHeader";
    }

    @Override
    protected ClassicsHeader createViewInstance(ThemedReactContext reactContext) {
        return new ClassicsHeader(reactContext);
    }

    /**
     * 设置主题颜色
     * @param view
     * @param primaryColor
     */
    @ReactProp(name = "primaryColor")
    public void setPrimaryColor(ClassicsHeader view,String primaryColor){
        view.setPrimaryColor(Color.parseColor(primaryColor));
    }

    /**
     * 设置强调颜色
     * @param view
     * @param accentColor
     */
    @ReactProp(name = "accentColor")
    public void setAccentColor(ClassicsHeader view,String accentColor){
        view.setAccentColor(Color.parseColor(accentColor));
    }

    /**
     * 设置spinnerStyle
     * @param view
     * @param spinnerStyle
     */
    @ReactProp(name = "spinnerStyle")
    public void setSpinnerStyle(ClassicsHeader view,String spinnerStyle){
        view.setSpinnerStyle(SpinnerStyleConstants.SpinnerStyleMap.get(spinnerStyle));
    }
}
