import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CellGroup, ColumnView, Result } from '../lib';
import { ScrollView } from 'react-native';
import { RootStackParamList } from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'TestResult'>;
interface State {
  loading: boolean;
}

export class TestResultScreen extends React.PureComponent<Props, State> {

  state: Readonly<State> = {
    loading: false,
  };

  render(): React.ReactNode {
    return (
      <ScrollView>
        <ColumnView center>
          <CellGroup title="成功状态" inset>
            <ColumnView padding={15}>
              <Result
                status="success"
                title="操作成功"
                description="请耐心等待结果，结果会以手机号、邮箱或其他方式通知您，请保持联系方式畅通"
              />
            </ColumnView>
          </CellGroup>
          <CellGroup title="等待状态" inset>
            <ColumnView padding={15}>
              <Result
                status="waiting"
                title="等待处理"
                description="请耐心等待结果，结果会以手机号、邮箱或其他方式通知您，请保持联系方式畅通"
              />
            </ColumnView>
          </CellGroup>
          <CellGroup title="提示状态" inset>
            <ColumnView padding={15}>
              <Result
                status="info"
                title="信息提示"
                description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
              />
            </ColumnView>
          </CellGroup>
          <CellGroup title="警告状态" inset>
            <ColumnView padding={15}>
              <Result
                status="warning"
                title="警告提示"
                description="您没有权限访问此页面"
              />
            </ColumnView>
          </CellGroup>
          <CellGroup title="失败状态" inset>
            <ColumnView padding={15}>
              <Result
                status="error"
                title="无法完成操作"
                description="因为某某原因您无法执行此操作，请参考某某解决方法"
              />
            </ColumnView>
          </CellGroup>
          <CellGroup title="自定义图标" inset>
            <ColumnView padding={15}>
              <Result
                icon="smile"
                title="我们真诚聆听您的建议"
                description="内容详情可折行，建议不超过两行建议不超过两行建议不超过两行"
              />
            </ColumnView>
          </CellGroup>
        </ColumnView>
      </ScrollView>
    );
  }
}

