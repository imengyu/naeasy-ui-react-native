import React, { createRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { Cell, Toast, Dialog, CellGroup, ColumnView,
  Color, Text, Field, Rate, SimpleList, Button, rpx } from '../lib';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestDialog'>;

export function TestDialogScreen(_props: Props) {

  const [ show1, setShow1 ] = useState(false);
  const [ show2, setShow2 ] = useState(false);
  const [ show3, setShow3 ] = useState(false);
  const [ show4, setShow4 ] = useState(false);
  const [ show5, setShow5 ] = useState(false);
  const [ show6, setShow6 ] = useState(false);
  const [ show7, setShow7 ] = useState(false);

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
          show={show6}
          onClose={() => setShow6(false)}
          icon="success-filling"
          iconColor={Color.success}
          closeable
          content="已成功提交，请注意查收信息"
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
          title="确认执行操作? "
          content="返回一个 Promise 可以异步关闭对话框"
          onConfirm={() => new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          })}
        />
        <Dialog
          show={show7}
          onClose={() => setShow7(false)}
          showConfirm={false}
          customButtons={[
            {
              name: '1',
              text: '选项1',
              color: Color.primary,
            },
            {
              name: '2',
              text: '选项2',
              color: Color.primary,
            },
            {
              name: '3',
              text: '选项3',
            },
            {
              name: '4',
              text: '危险选项',
              color: Color.danger,
              bold: true,
            },
          ]}
          bottomVertical
          closeable
          title="提示"
          content="确认执行操作?"
        />

        <CellGroup title="对话框" inset>
          <Text style={{ padding: 10 }}>一个对话框封装组件。</Text>
          <Cell title="简单对话框" showArrow onPress={() => setShow1(true)} />
          <Cell title="图标对话框" showArrow onPress={() => setShow6(true)} />
          <Cell title="确认对话框" showArrow onPress={() => setShow2(true)} />
          <Cell title="多选项对话框" showArrow onPress={() => setShow7(true)} />
          <Cell title="超长文字" showArrow onPress={() => setShow3(true)} />
          <Cell title="异步关闭" showArrow onPress={() => setShow5(true)} />
        </CellGroup>
        <CellGroup title="自定义" inset>
          <Cell title="自定义对话框内容" showArrow onPress={() => setShow4(true)} />
          <Cell title="示例：输入对话框" showArrow onPress={() => {
            const ref = createRef<InputDialogContentRef>();
            Dialog.show({
              title: '拒绝理由',
              content: <InputDialogContent ref={ref} />,
              showCancel: true,
              width: rpx(650),
              onConfirm() {
                Toast.info('拒绝理由输入内容：' + ref.current?.getText());
              },
            });
          }} />
          <Cell title="示例：选择对话框" showArrow onPress={() => {
            //这里给出了一个选择对话框示例，你可根据这个示例进一步封装做一个自己的选择对话框
            const ref = createRef<ChooseDialogContentRef>();
            Dialog.show({
              title: '请选择产品',
              contentScroll: false,
              contentPadding: [ 20, 0, 0, 0 ],
              //自定义按扭
              bottomContent: (onConfirm) => (<ColumnView padding={[15, 20]}>
                <Button type="primary" shape="round" radius={5} onPress={onConfirm} text="确认选择" />
              </ColumnView>),
              content: <ChooseDialogContent ref={ref} />,
              showCancel: true,
              width: rpx(650),
              onConfirm() {
                Toast.info('选择：' + JSON.stringify(ref.current?.getValue()));
              },
            });
          }} />
          <Cell title="示例：评价对话框" showArrow onPress={() => {
            const ref = createRef<RateDialogContentRef>();
            Dialog.show({
              title: '请为我们的服务评价',
              content: <RateDialogContent ref={ref} />,
              showCancel: true,
              width: rpx(650),
              onConfirm() {
                Toast.info('评价：' + ref.current?.getValue() + ' ' + ref.current?.getText());
              },
            });
          }} />
        </CellGroup>
        <CellGroup title="指令式对话框" inset>
          <Text style={{ padding: 10 }}>可以通过指令式的方式使用 Dialog：</Text>
          <Cell title="指令式对话框" showArrow onPress={() => {
            Dialog.show({
              title: '提示',
              content: (<ColumnView center padding={10}>
                <Image source={{ uri: 'https://imengyu.top/assets/images/test/1.jpg' }} style={{ width: 200, height: 100 }} />
                <Text>这是一个指令式对话框，用法与组件式完全一致</Text>
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
              if (confirm) {
                Toast.info('点击了确定');
              }
              else {
                Toast.info('点击了取消');
              }
            });
          }} />
        </CellGroup>
      </ColumnView>
    </ScrollView>
  );
}


//自定义对话框内容：输入框

interface InputDialogContentRef {
  getText: () => string
}
const InputDialogContent = forwardRef<InputDialogContentRef, {}>((props, ref) => {
  const [ text, setText ] = useState('');

  useImperativeHandle(ref, () => ({
    getText: () => text,
  }));

  return <ColumnView center>
    <Field value={text} onChangeText={setText} placeholder="请输入" inputStyle={styles.myInput} />
  </ColumnView>;
});

//自定义对话框内容：评价框

interface RateDialogContentRef {
  getValue: () => number;
  getText: () => string;
}
const RateDialogContent = forwardRef<RateDialogContentRef, {}>((props, ref) => {
  const [ value, setValue ] = useState(0);
  const [ text, setText ] = useState('');

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    getText: () => text,
  }));

  return <ColumnView center flex={1}>
    <Rate value={value} onValueChange={setValue} size={30} />
    <Field value={text} onChangeText={setText} placeholder="输入您的评价吧" inputStyle={styles.myInput} />
  </ColumnView>;
});

//自定义对话框内容：选择框

interface ChooseDialogContentRef {
  getValue: () => string[];
}
const ChooseDialogContent = forwardRef<ChooseDialogContentRef, {}>((props, ref) => {
  const value = useRef<string[]>([]);

  useImperativeHandle(ref, () => ({
    getValue: () => value.current,
  }));

  return (
    <SimpleList<string>
      style={styles.myList}
      mode="mulit-check"
      data={[
        'Spirit 1.0 Plus 电动船外机',
        'Spirit 1.0 R 电动船外机',
        'Spirit 电池 Plus',
        'Navy 3.0 Evo 电动船外机',
        'Navy 6.0 Evo 电动船外机',
        'F10 电动舷外挂机',
        'F25 电动舷外挂机',
        '吊舱推进器 1.0 Evo',
        '吊舱推进器 3.0 Evo',
        '吊舱推进器 6.0 Evo',
        'E系列电池',
        '定制机',
        '其他',
      ]}
      onSelectedItemChanged={(sel) => { value.current = sel; }}
    />
  );
});

const styles = StyleSheet.create({
  myInput: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    flex: 1,
    borderColor: '#efefef',
    borderWidth: 1,
    borderRadius: 5,
  },
  myList: {
    height: rpx(500),
  },
});
