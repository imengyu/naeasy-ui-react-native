package com.imengyu.RNUiLib.imagepicker;

import android.text.InputType;
import android.widget.LinearLayout;

import androidx.annotation.Keep;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.imengyu.RNUiLib.R;
import com.imengyu.RNUiLib.dialog.DialogXUtils;
import com.kongzue.dialogx.dialogs.InputDialog;
import com.kongzue.dialogx.dialogs.MessageDialog;
import com.kongzue.dialogx.dialogs.PopTip;
import com.kongzue.dialogx.dialogs.TipDialog;
import com.kongzue.dialogx.dialogs.WaitDialog;
import com.kongzue.dialogx.interfaces.DialogLifecycleCallback;
import com.kongzue.dialogx.util.InputInfo;
import com.luck.picture.lib.basic.PictureSelectionCameraModel;
import com.luck.picture.lib.basic.PictureSelectionModel;
import com.luck.picture.lib.basic.PictureSelector;
import com.luck.picture.lib.config.SelectMimeType;
import com.luck.picture.lib.entity.LocalMedia;
import com.luck.picture.lib.interfaces.OnResultCallbackListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ImagePickerModule extends ReactContextBaseJavaModule {

  private ReactApplicationContext reactContext;

  @NonNull
  @Override
  public String getName() {
    return "RCTDCImagePicker";
  }
  public ImagePickerModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  private ReadableArray javaLocalMediaToJsArray(ArrayList<LocalMedia> result) {
    WritableArray array = new WritableNativeArray();
    for (LocalMedia m : result) {
      WritableMap map = new WritableNativeMap();
      map.putDouble("id", m.getId());
      map.putDouble("bucketId", m.getBucketId());
      map.putString("path", m.getAvailablePath());
      map.putString("contentPath", m.getPath());
      map.putString("oOriginalPath", m.getOriginalPath());
      map.putString("mimeType", m.getMimeType());
      map.putString("videoThumbnailPath", m.getVideoThumbnailPath());
      map.putDouble("duration", m.getDuration());
      map.putDouble("width", m.getWidth());
      map.putDouble("height", m.getHeight());
      map.putDouble("size", m.getSize());
    }
    return array;
  }

  /**
   *
   */
  @Keep
  @ReactMethod
  public void camera(ReadableMap options, Callback callback, Callback cancelCallback) {
    String type = options.getString("type");

    int chooseMode = 0;
    if (type == null || type.equals("image"))
      chooseMode = SelectMimeType.ofImage();
    else if (type.equals("video"))
      chooseMode = SelectMimeType.ofVideo();
    else if (type.equals("all"))
      chooseMode = SelectMimeType.ofAll();

    PictureSelectionCameraModel model = PictureSelector.create(reactContext).openCamera(chooseMode);

    if (options.hasKey("minFileSize"))
      model.setSelectMinFileSize(options.getInt("minFileSize"));
    if (options.hasKey("maxFileSize"))
      model.setSelectMaxFileSize(options.getInt("maxFileSize"));
    if (options.hasKey("minDurationSecond"))
      model.setSelectMinDurationSecond(options.getInt("minDurationSecond"));
    if (options.hasKey("maxDurationSecond"))
      model.setSelectMaxDurationSecond(options.getInt("maxDurationSecond"));
    if (options.hasKey("recordVideoMaxSecond"))
      model.setRecordVideoMaxSecond(options.getInt("recordVideoMaxSecond"));
    if (options.hasKey("recordVideoMinSecond"))
      model.setRecordVideoMinSecond(options.getInt("recordVideoMinSecond"));

    model.forResult(new OnResultCallbackListener<LocalMedia>() {
      @Override
      public void onResult(ArrayList<LocalMedia> result) {
        callback.invoke(javaLocalMediaToJsArray(result));
      }
      @Override
      public void onCancel() {
        cancelCallback.invoke();
      }
    });
  }

  /**
   *
   */
  @Keep
  @ReactMethod
  public void pick(ReadableMap options, Callback callback, Callback cancelCallback) {

    String type = options.getString("type");

    int chooseMode = 0;
    if (type == null || type.equals("image"))
      chooseMode = SelectMimeType.ofImage();
    else if (type.equals("video"))
      chooseMode = SelectMimeType.ofVideo();
    else if (type.equals("all"))
      chooseMode = SelectMimeType.ofAll();

    int minSelectNum = 1;
    int maxSelectNum = 9;
    int minVideoSelectNum = 1;
    int maxVideoSelectNum = 9;
    boolean showCamera = false;

    if (options.hasKey("showCamera"))
      showCamera = options.getBoolean("showCamera");
    if (options.hasKey("minSelectNum"))
      minSelectNum = options.getInt("minSelectNum");
    if (options.hasKey("maxSelectNum"))
      maxSelectNum = options.getInt("maxSelectNum");
    if (options.hasKey("minVideoSelectNum"))
      minVideoSelectNum = options.getInt("minVideoSelectNum");
    if (options.hasKey("maxVideoSelectNum"))
      maxVideoSelectNum = options.getInt("maxVideoSelectNum");

    PictureSelectionModel model = PictureSelector.create(reactContext).openGallery(chooseMode);

    model.setImageEngine(GlideEngine.createGlideEngine())
    .setMinSelectNum(minSelectNum)
    .setMaxSelectNum(maxSelectNum)
    .setMaxVideoSelectNum(maxVideoSelectNum)
    .setMinVideoSelectNum(minVideoSelectNum)
    .isDisplayCamera(showCamera);

    if (options.hasKey("selectedData")) {
      ReadableArray arr = options.getArray("selectedData");
      List<LocalMedia> list = new ArrayList<>();

      for (int i = 0; i < arr.size(); i++) {
        LocalMedia media = new LocalMedia();
        ReadableMap data = arr.getMap(i);
        media.setId((long)data.getDouble("id"));
        media.setPath(data.getString("path"));
        list.add(media);
      }
      model.setSelectedData(list);
    }
    if (options.hasKey("minFileSize"))
      model.setSelectMinFileSize(options.getInt("minFileSize"));
    if (options.hasKey("maxFileSize"))
      model.setSelectMaxFileSize(options.getInt("maxFileSize"));
    if (options.hasKey("minDurationSecond"))
      model.setSelectMinDurationSecond(options.getInt("minDurationSecond"));
    if (options.hasKey("maxDurationSecond"))
      model.setSelectMaxDurationSecond(options.getInt("maxDurationSecond"));
    if (options.hasKey("imageSpanCount"))
      model.setImageSpanCount(options.getInt("imageSpanCount"));
    if (options.hasKey("filterMaxFileSize"))
      model.setFilterMaxFileSize(options.getInt("filterMaxFileSize"));
    if (options.hasKey("filterMinFileSize"))
      model.setFilterMinFileSize(options.getInt("filterMinFileSize"));
    if (options.hasKey("filterVideoMaxSecond"))
      model.setFilterVideoMaxSecond(options.getInt("filterVideoMaxSecond"));
    if (options.hasKey("filterVideoMinSecond"))
      model.setFilterVideoMinSecond(options.getInt("filterVideoMinSecond"));
    if (options.hasKey("recordVideoMaxSecond"))
      model.setRecordVideoMaxSecond(options.getInt("recordVideoMaxSecond"));
    if (options.hasKey("recordVideoMinSecond"))
      model.setRecordVideoMinSecond(options.getInt("recordVideoMinSecond"));

    model.forResult(new OnResultCallbackListener<LocalMedia>() {
      @Override
      public void onResult(ArrayList<LocalMedia> result) {
        callback.invoke(javaLocalMediaToJsArray(result));
      }
      @Override
      public void onCancel() {
        cancelCallback.invoke();
      }
    });
  }
}

