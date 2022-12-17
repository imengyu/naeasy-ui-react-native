import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { TestGroup } from '../components/TestGroup';
import { Uploader } from '../../lib/src/components/form';
import { Avatar, Dialog } from '../lib';

type Props = StackScreenProps<RootStackParamList, 'TestUploader'>;

export function TestUploaderScreen(props: Props) {

  return (
    <ScrollView>
      <TestPageHeader
        title="Uploader 文件/图片上传"
        desc="用于让用户上传文件或者图片，支持多选"
        navigation={props.navigation}
      />
      <TestHeader>基础用法</TestHeader>
      <TestGroup>
        <Uploader
          upload={(action) => {
            //测试完成上传，实际这里需要调用地址上传
            action.onFinish();
          }}
        />
      </TestGroup>
      <TestHeader desc="Uploader 根据文件后缀来判断是否为图片文件。如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明">预览图片</TestHeader>
      <TestGroup>
        <Uploader
          upload={(action) => {
            //测试完成上传，实际这里需要调用地址上传
            action.onFinish();
          }}
          intitalItems={[
            {
              filePath: '1.jpg',
              previewPath: 'https://imengyu.top/assets/images/test/1.jpg',
              state: 'success',
            },
            {
              filePath: '2.jpg',
              previewPath: 'https://imengyu.top/assets/images/test/2.jpg',
              state: 'success',
            },
          ]}
          maxUploadCount={6}
        />
      </TestGroup>
      <TestHeader desc="通过 status 属性可以标识上传状态，uploading 表示上传中，fail 表示上传失败，success 表示上传完成。">上传状态</TestHeader>
      <TestGroup>
        <Uploader
          upload={(action) => {
            //开始上传，这里是测试，实际这里需要调用地址上传
            action.onStart();

            //测试上传返回进度
            let pec = 0;
            const timer = setInterval(() => {
              pec = Math.min(100, pec + Math.floor(Math.random() * 25));
              action.onProgress(pec);

              if (pec >= 100) {
                clearInterval(timer);

                if (Math.random() < 0.2) {
                  //上传失败
                  action.onError('测试失败');
                }
                else {
                  //完成上传
                  action.onFinish();
                }
              }
            }, 500);
          }}
          intitalItems={[
            {
              filePath: '1.jpg',
              previewPath: 'https://imengyu.top/assets/images/test/1.jpg',
              state: 'fail',
            },
            {
              filePath: '2.jpg',
              previewPath: 'https://imengyu.top/assets/images/test/2.jpg',
              state: 'uploading',
            },
            {
              filePath: '2.jpg',
              previewPath: 'https://imengyu.top/assets/images/test/2.jpg',
              state: 'success',
            },
          ]}
          maxUploadCount={6}
        />
      </TestGroup>
      <TestHeader desc="通过 maxUploadCount 属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏上传区域。">限制上传数量</TestHeader>
      <TestGroup>
        <Uploader
          upload={(action) => {
            //测试完成上传，实际这里需要调用地址上传
            action.onFinish();
          }}
          intitalItems={[
            {
              filePath: '1.jpg',
              previewPath: 'https://imengyu.top/assets/images/test/1.jpg',
              state: 'success',
            },
            {
              filePath: '2.jpg',
              previewPath: 'https://imengyu.top/assets/images/test/2.jpg',
              state: 'success',
            },
          ]}
          maxUploadCount={3}
        />
      </TestGroup>
      <TestHeader desc="通过 maxFileSize 属性可以限制上传文件的大小，超过大小的文件会被自动过滤，这些文件信息可以通过 onOverSize 事件获取。注意，使用自定义选择器时必须获取文件大小才能正确判断。">限制上传大小</TestHeader>
      <TestGroup>
        <Uploader
          upload={(action) => {
            //测试完成上传，实际这里需要调用地址上传
            action.onFinish();
          }}
          maxUploadCount={6}
          maxFileSize={1024}
          onOverSize={(item) => {
            Dialog.alert({
              title: 'onOverSize',
              content: `文件${item.filePath}超出大小`,
            });
          }}
        />
      </TestGroup>
      <TestHeader desc="可以自定义渲染整个上传区域的样式。通常可以用在单独上传例如头像上传。">自定义上传样式</TestHeader>
      <TestGroup>
        <Uploader
          upload={(action) => {
            //测试完成上传，实际这里需要调用地址上传
            action.onFinish();
          }}
          maxUploadCount={1}
          renderUploader={(uploaderProps) => (
            <Avatar url={uploaderProps.items[0]?.filePath} onPress={uploaderProps.onPress} />
          )}
        />
      </TestGroup>
    </ScrollView>
  );
}

