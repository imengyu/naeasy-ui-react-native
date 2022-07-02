package com.imengyu.RNUiLib.smartrefresh.header;

import android.graphics.Color;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.imengyu.RNUiLib.smartrefresh.smartrefreshlayout.SpinnerStyleConstants;

/**
 * Created by painter.g on 2018/3/12.
 */

public class DefaultHeaderMananger extends SimpleViewManager<DefaultHeader> {
    @Override
    public String getName() {
        return "RCTDefaultHeader";
    }

    @Override
    protected DefaultHeader createViewInstance(ThemedReactContext reactContext) {
        return new DefaultHeader(reactContext);
    }
    /**
     * 设置主题颜色
     * @param view
     * @param primaryColor
     */
    @ReactProp(name = "primaryColor")
    public void setPrimaryColor(DefaultHeader view,String primaryColor){
        view.setPrimaryColor(Color.parseColor(primaryColor));
    }

    /**
     * 设置强调颜色
     * @param view
     * @param accentColor
     */
    @ReactProp(name = "accentColor")
    public void setAccentColor(DefaultHeader view,String accentColor){
        view.setAccentColor(Color.parseColor(accentColor));
    }

    /**
     * 设置spinnerStyle
     * @param view
     * @param spinnerStyle
     */
    @ReactProp(name = "spinnerStyle")
    public void setSpinnerStyle(DefaultHeader view,String spinnerStyle){
        view.setSpinnerStyle(SpinnerStyleConstants.SpinnerStyleMap.get(spinnerStyle));
    }
}
