import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ColumnView, Grid, GridItem } from 'imengyu-ui-lib';
import { ScrollView, Text } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestGrid'>;

export class TestGridScreen extends React.PureComponent<Props> {
  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <Text style={{ padding: 10 }}>通过 icon 属性设置格子内的图标，title 属性设置文字内容。</Text>
          <Grid>
            <GridItem title="文字" icon="picture-filling" onPress={() => console.log('test')} />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
          </Grid>
          <Text style={{ padding: 10 }}>自定义列数。默认一行展示四个格子，可以通过 columnNum 自定义列数。</Text>
          <Grid columnNum={3}>
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
          </Grid>
          <Text style={{ padding: 10 }}>正方形格子. 设置 square 属性后，格子的高度会和宽度保持一致。</Text>
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
          <Text style={{ padding: 10 }}>内容横排. 将 direction 属性设置为 horizontal，可以让宫格的内容呈横向排列。</Text>
          <Grid columnNum={3} direction="horizontal">
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
            <GridItem title="文字" icon="picture-filling" />
          </Grid>
        </ColumnView>
      </ScrollView>
    );
  }
}

