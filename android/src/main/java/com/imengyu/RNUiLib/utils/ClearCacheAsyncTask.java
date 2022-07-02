package com.imengyu.RNUiLib.utils;

import android.content.Context;
import android.os.AsyncTask;
import com.facebook.react.bridge.Callback;

public class ClearCacheAsyncTask extends AsyncTask<Integer,Integer,String> {
  private final Context context;
  private final Callback callback;

  public ClearCacheAsyncTask(Context context, Callback callback) {
    super();
    this.context = context;
    this.callback = callback;
  }

  @Override
  protected void onPreExecute() {
    super.onPreExecute();
  }

  @Override
  protected void onPostExecute(String s) {
    super.onPostExecute(s);
    callback.invoke();
  }

  @Override
  protected String doInBackground(Integer... params) {
    CacheUtils.clearCache(context);
    return null;
  }


}