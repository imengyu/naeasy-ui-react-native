import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, Text, Image } from 'react-native';
import { Cell, Toast, Dialog, CellGroup, ColumnView } from '@imengyu-ui-lib-debug';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestDialog'>;

export function TestDialogScreen(_props: Props) {

  const [ show1, setShow1 ] = useState(false);
  const [ show2, setShow2 ] = useState(false);
  const [ show3, setShow3 ] = useState(false);
  const [ show4, setShow4 ] = useState(false);
  const [ show5, setShow5 ] = useState(false);

  return (
    <ScrollView>
      <ColumnView center>
        <Dialog
          show={show1}
          onClose={() => setShow1(false)}
          closeable
          title="提示"
          content="这是一个对话框"
        />
        <Dialog
          show={show2}
          onClose={() => setShow2(false)}
          showCancel
          closeable
          title="提示"
          content="确认执行操作?"
        />
        <Dialog
          show={show3}
          onClose={() => setShow3(false)}
          showCancel
          closeable
          title="超长文字"
          content="视频提供了功能强大的方法帮助您证明您的观点。当您单击联机视频时，可以在想要添加的视频的嵌入代码中进行粘贴。您也可以键入一个关键字以联机搜索最适合您的文档的视频。
          为使您的文档具有专业外观，Word 提供了页眉、页脚、封面和文本框设计，这些设计可互为补充。例如，您可以添加匹配的封面、页眉和提要栏。单击“插入”，然后从不同库中选择所需元素。
          主题和样式也有助于文档保持协调。当您单击设计并选择新的主题时，图片、图表或 SmartArt 图形将会更改以匹配新的主题。当应用样式时，您的标题会进行更改以匹配新的主题。
          使用在需要位置出现的新按钮在 Word 中保存时间。若要更改图片适应文档的方式，请单击该图片，图片旁边将会显示布局选项按钮。当处理表格时，单击要添加行或列的位置，然后单击加号。
          在新的阅读视图中阅读更加容易。可以折叠文档某些部分并关注所需文本。如果在达到结尾处之前需要停止读取，Word 会记住您的停止位置 - 即使在另一个设备上。视频提供了功能强大的方法帮助您证明您的观点。当您单击联机视频时，可以在想要添加的视频的嵌入代码中进行粘贴。您也可以键入一个关键字以联机搜索最适合您的文档的视频。
          为使您的文档具有专业外观，Word 提供了页眉、页脚、封面和文本框设计，这些设计可互为补充。例如，您可以添加匹配的封面、页眉和提要栏。单击“插入”，然后从不同库中选择所需元素。
          主题和样式也有助于文档保持协调。当您单击设计并选择新的主题时，图片、图表或 SmartArt 图形将会更改以匹配新的主题。当应用样式时，您的标题会进行更改以匹配新的主题。
          使用在需要位置出现的新按钮在 Word 中保存时间。若要更改图片适应文档的方式，请单击该图片，图片旁边将会显示布局选项按钮。当处理表格时，单击要添加行或列的位置，然后单击加号。
          在新的阅读视图中阅读更加容易。可以折叠文档某些部分并关注所需文本。如果在达到结尾处之前需要停止读取，Word 会记住您的停止位置 - 即使在另一个设备上。
          ?"
        />
        <Dialog
          show={show4}
          onClose={() => setShow4(false)}
          showCancel
          closeable
          title="自定义对话框内容"
          content={(
            <ColumnView center padding={10}>
              <Image source={{ uri: 'https://imengyu.top/assets/images/test/1.jpg' }} style={{ width: 100, height: 200 }} />
              <Text>视频提供了功能强大的方法帮助您证明您的观点。当您单击联机视频时，可以在想要添加的视频的嵌入代码中进行粘贴。您也可以键入一个关键字以联机搜索最适合您的文档的视频。
          为使您的文档具有专业外观，Word 提供了页眉、页脚、封面和文本框设计，这些设计可互为补充。</Text>
            </ColumnView>
          )}
        />
        <Dialog
          show={show5}
          onClose={() => setShow5(false)}
          showCancel
          closeable
          title="提示"
          content="确认执行操作? 返回一个 Promise 可以异步关闭对话框"
          onConfirm={() => new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          })}
        />

        <CellGroup title="对话框" inset>
          <Text style={{ padding: 10 }}>一个对话框封装组件。</Text>
          <Cell title="简单对话框" showArrow onPress={() => setShow1(true)} />
          <Cell title="确认对话框" showArrow onPress={() => setShow2(true)} />
          <Cell title="超长文字" showArrow onPress={() => setShow3(true)} />
          <Cell title="自定义对话框内容" showArrow onPress={() => setShow4(true)} />
          <Cell title="异步关闭" showArrow onPress={() => setShow5(true)} />
        </CellGroup>
        <CellGroup title="指令式对话框" inset>
          <Text style={{ padding: 10 }}>可以通过指令式的方式使用 Dialog：</Text>
          <Cell title="指令式对话框" showArrow onPress={() => {
            Dialog.show({
              title: '提示',
              content: (<ColumnView center padding={10}>
                <Image source={{ uri: 'https://imengyu.top/assets/images/test/1.jpg' }} style={{ width: 200, height: 100 }} />
                <Text>这是一个指令式对话框</Text>
              </ColumnView>),
            });
          }} />
          <Cell title="alert" showArrow onPress={() => {
            Dialog.alert({
              title: '提示',
              content: '这是一个 alert 对话框',
            });
          }} />
          <Cell title="confirm" showArrow onPress={() => {
            Dialog.confirm({
              title: '提示',
              content: '这是一个 confirm 对话框',
            }).then((confirm) => {
              if (confirm)
                Toast.info('点击了确定');
              else
                Toast.info('点击了取消');
            });
          }} />
        </CellGroup>
      </ColumnView>
    </ScrollView>
  );
}

