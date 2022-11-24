import React, { } from 'react';
import { Color } from '../../styles';
import { Icon } from '../basic/Icon';
import { ColumnView } from '../layout/ColumnView';
import { WhiteSpace } from '../space/WhiteSpace';
import { Text } from '../typography/Text';

export interface ResultProps {
  /**
   * 标题
   */
  title?: string|React.ReactElement,
  /**
   * 描述
   */
  description?: string|React.ReactElement,
  /**
   * 标题
   */
  icon?: string|React.ReactElement,
  /**
   * 状态类型
   */
  status?: 'success' | 'error' | 'info' | 'waiting' | 'warning';
}

/**
 * Result 结果显示组件。对前一步操作的结果进行反馈。
 */
export function Result(props: ResultProps) {
  const {
    status = 'info',
    title,
    description,
    icon,
  } = props;

  function getDefaultIconByStatus() {
    switch (status) {
      default:
      case 'info': return 'prompt-filling';
      case 'success': return 'success-filling';
      case 'error': return 'delete-filling';
      case 'waiting': return 'clock-filling';
      case 'warning': return 'warning-filling';
    }
  }
  function getDefaultIconColor() {
    switch (status) {
      default:
      case 'info': return Color.primary;
      case 'success': return Color.success;
      case 'error': return Color.danger;
      case 'waiting': return Color.primary;
      case 'warning': return Color.warning;
    }
  }

  return (
    <ColumnView center>
      {
        icon && typeof icon === 'string' ?
          <Icon size={55} icon={icon} /> :
          (icon ? icon : <Icon size={55} icon={getDefaultIconByStatus()} color={getDefaultIconColor()} />) }
      <WhiteSpace size={15} />
      <Text size={20} color={Color.black} bold align="center">{title}</Text>
      <WhiteSpace size={5} />
      <Text size={14} color={Color.textSecond} align="center">{description}</Text>
    </ColumnView>
  );
}
