import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Grid, GridItem, Color, rpx } from '../lib';
import { ScrollView, Image } from 'react-native';
import { RootStackParamList } from '../navigation';
import { TestHeader, TestPageHeader } from '../components/TestHeader';
import { showTestMessage, TestGroup } from '../components/TestGroup';

type Props = StackScreenProps<RootStackParamList, 'TestGrid'>;

export class TestGridScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <TestPageHeader
          title="Grid 宫格"
          desc="宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。"
          navigation={this.props.navigation}
        />
        <TestHeader desc="通过 icon 属性设置格子内的图标，title 属性设置文字内容。">基础用法</TestHeader>
        <TestGroup noHorizontalPadding>
          <Grid>
            <GridItem title="可点击" icon="picture-filling" onPress={() => showTestMessage('点击')} />
            <GridItem title="本地图片" icon={require('../images/defaultAvatar.png')} iconSize={20} />
            <GridItem title="URL图片" icon="https://imengyu.top/assets/images/test/icon.png"  />
            <GridItem title="颜色" icon="picture-filling" iconColor={Color.primary} titleColor={Color.primary} />
            <GridItem title="文字" icon="picture-filling" iconColor={Color.danger} />
            <GridItem title="文字" icon="picture-filling" iconColor={Color.success} />
            <GridItem title="文字" icon="picture-filling" iconColor={Color.warning} />
            <GridItem title="文字" icon="picture-filling" iconColor="#f60" />
          </Grid>
        </TestGroup>

        <TestHeader desc="默认一行展示四个格子，可以通过 columnNum 自定义列数。">自定义列数</TestHeader>
        <TestGroup noHorizontalPadding>
          <Grid columnNum={3}>
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
          </Grid>
        </TestGroup>

        <TestHeader desc="设置 square 属性后，格子的高度会和宽度保持一致。">正方形格子</TestHeader>
        <TestGroup noHorizontalPadding>
          <Grid columnNum={4} square>
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
          </Grid>
        </TestGroup>

        <TestHeader desc="将 direction 属性设置为 horizontal，可以让宫格的内容呈横向排列。">内容横排</TestHeader>
        <TestGroup noHorizontalPadding>
          <Grid columnNum={3} direction="horizontal">
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
          </Grid>
        </TestGroup>

        <TestHeader>无边框</TestHeader>
        <TestGroup noHorizontalPadding>
          <Grid columnNum={3} border={false}>
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
          </Grid>
        </TestGroup>

        <TestHeader>自定义渲染内容</TestHeader>
        <TestGroup noHorizontalPadding>
          <Grid columnNum={3} direction="horizontal">
            <GridItem>
              <Image source={require('../images/apple-1.jpeg')} style={{ width: rpx(200), height: rpx(200) }} resizeMode="contain" />
            </GridItem>
            <GridItem>
              <Image source={require('../images/apple-2.jpeg')} style={{ width: rpx(200), height: rpx(200) }} resizeMode="contain" />
            </GridItem>
            <GridItem>
              <Image source={require('../images/apple-3.jpeg')} style={{ width: rpx(200), height: rpx(200) }} resizeMode="contain" />
            </GridItem>
          </Grid>
        </TestGroup>
      </ScrollView>
    );
  }
}

