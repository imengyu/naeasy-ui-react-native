package com.imengyu.RNUiLib.whellview.adapter;

import java.util.List;

/**
 * The simple Array wheel adapter
 * @param <T> the element type
 */
public class ArrayWheelAdapter<T> implements WheelAdapter<T> {

  // items
  private final List<T> items;

  /**
   * Constructor
   * @param items the items
   */
  public ArrayWheelAdapter(List<T> items) {
    this.items = items;

  }

  @Override
  public T getItem(int index) {
    if (index >= 0 && index < items.size()) {
      return items.get(index);
    }
    return null;
  }

  @Override
  public int getItemsCount() {
    return items.size();
  }

  @Override
  public int indexOf(T o){
    return items.indexOf(o);
  }

}

