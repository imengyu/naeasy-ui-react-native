import React, { } from 'react';
import { Color } from '../../styles';
import { ThemeColor, useThemeContext } from '../../theme/Theme';
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

  const themeContext = useThemeContext();
  const {
    status = 'info',
    title,
    description,
    icon,
  } = props;

  function getDefaultIconByStatus() {
    switch (status) {
      default:
      case 'info': return themeContext.getThemeVar('ResultIconInfo', 'prompt-filling');
      case 'success': return themeContext.getThemeVar('ResultIconSuccess', 'success-filling');
      case 'error': return themeContext.getThemeVar('ResultIconError', 'delete-filling');
      case 'waiting': return themeContext.getThemeVar('ResultIconWaiting', 'clock-filling');
      case 'warning': return themeContext.getThemeVar('ResultIconWarning', 'warning-filling');
    }
  }
  function getDefaultIconColor() {
    switch (status) {
      default:
      case 'info': return themeContext.getThemeVar('ResultColorInfo', Color.primary);
      case 'success': return themeContext.getThemeVar('ResultColorSuccess', Color.success);
      case 'error': return themeContext.getThemeVar('ResultColorError', Color.danger);
      case 'waiting': return themeContext.getThemeVar('ResultColorWaiting', Color.primary);
      case 'warning': return themeContext.getThemeVar('ResultColorWarning', Color.warning);
    }
  }

  const themeVars = themeContext.getThemeVars({
    ResultIconSize: 55,
    ResultTitleFontSize: 20,
    ResultTitleColor: Color.black,
    ResultTitleBold: true,
    ResultTitleMarginTop: 15,
    ResultDescriptionFontSize: 14,
    ResultDescriptionColor: Color.textSecond,
    ResultDescriptionBold: false,
    ResultDescriptionMarginTop: 5,
  });

  return (
    <ColumnView center>
      {
        icon && typeof icon === 'string' ?
          <Icon size={themeVars.ResultIconSize as number} icon={icon} /> :
          (icon ? icon : <Icon size={themeVars.ResultIconSize as number} icon={getDefaultIconByStatus()} color={getDefaultIconColor()} />) }
      <WhiteSpace size={themeVars.ResultTitleMarginTop as number} />
      <Text
        size={themeVars.ResultTitleFontSize as number}
        color={themeVars.ResultTitleColor as ThemeColor}
        bold={themeVars.ResultTitleBold as boolean}
        align="center"
      >{title}</Text>
      <WhiteSpace size={themeVars.ResultDescriptionMarginTop as number} />
      <Text
        size={themeVars.ResultDescriptionFontSize as number}
        color={themeVars.ResultDescriptionColor as ThemeColor}
        bold={themeVars.ResultDescriptionBold as boolean}
        align="center"
      >{description}</Text>
    </ColumnView>
  );
}
