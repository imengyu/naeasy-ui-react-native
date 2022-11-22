import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Dialog, ImagePicker, Cell, CellGroup, ColumnView } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestPageHeader } from '../components/TestHeader';

type Props = StackScreenProps<RootStackParamList, 'TestImagePicker'>;
interface State {
  showTag: boolean
}

export class TestImagePickerScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    showTag: true,
  };

  render() {
    return (
      <ScrollView>
        <ColumnView>
          <TestPageHeader
            title="ImagePicker 图片选择器"
            desc="用于选择相册图片。Android 基于 https://github.com/LuckSiege/PictureSelector/ 封装， iOS 基于 https://github.com/SilenceLove/HXPHPicker 封装。"
            navigation={this.props.navigation}
          />
          <CellGroup title="基础用法" inset>
            <Cell title="选择图片" showArrow onPress={() => {
              ImagePicker.pick({
                maxSelectNum: 1,
                type: 'image',
              }).then((res) => {
                Dialog.alert({
                  title: 'choosed',
                  content: '' + JSON.stringify(res.result),
                });
              }).catch((e) => {
                Dialog.alert({
                  title: 'error',
                  content: '' + e,
                });
              });
            }} />
            <Cell title="选择多图" showArrow onPress={() => {
              ImagePicker.pick({
                maxSelectNum: 12,
                type: 'image',
              }).then((res) => {
                Dialog.alert({
                  title: 'choosed',
                  content: '' + JSON.stringify(res.result),
                });
              }).catch((e) => {
                Dialog.alert({
                  title: 'error',
                  content: '' + e,
                });
              });
            }} />
            <Cell title="选择图片和视频" showArrow onPress={() => {
              ImagePicker.pick({
                maxSelectNum: 12,
                type: 'all',
              }).then((res) => {
                Dialog.alert({
                  title: 'choosed',
                  content: '' + JSON.stringify(res.result),
                });
              }).catch((e) => {
                Dialog.alert({
                  title: 'error',
                  content: '' + e,
                });
              });
            }} />
            <Cell title="选择图片并裁剪" showArrow onPress={() => {
              ImagePicker.pick({
                maxSelectNum: 1,
                type: 'image',
                crop: {
                  circleDimmedLayer: true,
                  showCropFrame: true,
                },
              }).then((res) => {
                Dialog.alert({
                  title: 'choosed',
                  content: '' + JSON.stringify(res.result),
                });
              }).catch((e) => {
                Dialog.alert({
                  title: 'error',
                  content: '' + e,
                });
              });
            }} />
            <Cell title="拍照" showArrow onPress={() => {
              ImagePicker.camera({
                type: 'image',
              }).then((res) => {
                Dialog.alert({
                  title: 'choosed',
                  content: '' + JSON.stringify(res.result),
                });
              }).catch((e) => {
                Dialog.alert({
                  title: 'error',
                  content: '' + e,
                });
              });
            }} />
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

