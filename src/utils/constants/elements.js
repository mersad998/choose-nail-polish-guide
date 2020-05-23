import {Text} from 'react-native';
import React, {useContext} from 'react';
import {StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {
  Content as NBContent,
  Spinner,
  Button,
  Header,
  Icon,
  View,
  Item,
  Input,
  Label,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {
  white,
  DarkRed,
  Gold,
  darkPink,
  lightPink,
} from 'utils/constants/colors';
import {ColorThemeContext} from 'utils/Context/ColorThemeContext';
import {FontsContext} from 'utils/Context/FontsContext';

// ---------------------------------------------------------------------------
// این کامئوننت همان تکست را با استایل ایران سنس برمیگرداند

export const CoustomTextComponent = props => {
  const {fonts} = useContext(FontsContext);

  return (
    <Text
      style={[
        CoustomTextComponentStyles.text(fonts.FontName),
        {...props.style},
      ]}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

const CoustomTextComponentStyles = StyleSheet.create({
  text: font => {
    return {
      fontFamily: font,
    };
  },
});

// ---------------------------------------------------------------------------
// این کامپوننت برای بالا رفتن صفحه موقعی که کیبورد بازه و همچنین مارجین از چهار طرف میباشد

export const Content = ({...props}) => (
  <NBContent
    {...props}
    padder
    keyboardDismissMode="interactive"
    enableOnAndroid={true}
  />
);

// ---------------------------------------------------------------------------
// این کامپوننت طیف رنگی آبی از کمرنگ به پر رنگ رو فراهم میکنه

export const Background = ({...props}) => (
  <LinearGradient
    colors={[darkPink, lightPink]}
    style={backgroundStyle.container}
    {...props}
  />
);

const backgroundStyle = StyleSheet.create({
  container: {flex: 1, paddingTop: StatusBar.currentHeight},
});

// ---------------------------------------------------------------------------
// کتمپوننت اسپینر

export const MySpinner = props => (
  <Spinner
    style={[MySpinnerStyle.Spinner, props.style]}
    color={props.color ? props.color : 'black'}
  />
);

const MySpinnerStyle = StyleSheet.create({
  Spinner: {alignSelf: 'center'},
});

// ---------------------------------------------------------------------------
// کامپوننت دکمه

export const CoustomButtonComponent = props => (
  <Button
    style={[CoustomButtonComponentStyles.Button, props.style]}
    onPress={props.onPress}
    disabled={props.disabled}>
    {!props.isLoading ? (
      <CoustomTextComponent style={CoustomButtonComponentStyles.text}>
        {props.name}
      </CoustomTextComponent>
    ) : null}
    {props.isLoading && !props.inCart ? <MySpinner color={white} /> : null}
    {props.isLoading && props.inCart ? (
      <MySpinner
        color={white}
        style={CoustomButtonComponentStyles.cartSpinner}
      />
    ) : null}
  </Button>
);

const CoustomButtonComponentStyles = StyleSheet.create({
  Button: {
    borderWidth: 0.5,
    borderColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: undefined,
    paddingVertical: 5,
    backgroundColor: DarkRed,
    alignSelf: 'center',
    borderRadius: 15,
    margin: 2,
  },
  text: {
    color: white,
    fontSize: 12,
  },
  cartSpinner: {height: '100%'},
});
// ---------------------------------------------------------------------------
// هدر سفارشی استفاده شده در برنامه
export const MyHeader = props => {
  const {colors} = useContext(ColorThemeContext);
  const {fonts} = useContext(FontsContext);

  return (
    <Header style={HeaderStyels.Container(colors.Header)}>
      {props.onBackPress ? (
        <TouchableOpacity
          style={HeaderStyels.Icons}
          onPress={props.onBackPress}>
          <Icon
            type="FontAwesome"
            name="arrow-left"
            style={HeaderStyels.Icon(colors.TextColor)}
          />
        </TouchableOpacity>
      ) : null}
      <Text style={HeaderStyels.Text(colors.TextColor, fonts.FontName)}>
        {props.Title}
      </Text>
      {props.onHamburgerPress ? (
        <TouchableOpacity
          style={HeaderStyels.Icons}
          onPress={props.onHamburgerPress}>
          <Icon
            style={HeaderStyels.Icon(colors.TextColor)}
            type="FontAwesome"
            name="bars"
          />
        </TouchableOpacity>
      ) : null}
    </Header>
  );
};

const HeaderStyels = StyleSheet.create({
  Container: color => {
    return {
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    };
  },
  Icons: {
    flex: 1,
    alignItems: 'center',
  },
  IconsStyle: {
    color: Gold,
  },
  Text: (color, font) => {
    return {
      flex: 5,
      fontSize: 17,
      textAlign: 'center',
      color: color,
      fontFamily: font,
    };
  },
  NotifIndex: backgroundColor => {
    return {
      width: 15,
      fontSize: 18,
      height: 25,
      color: 'black',
      backgroundColor: backgroundColor,
      borderRadius: 10,
      alignItems: 'center',
      textAlign: 'center',
      marginTop: -44,
      marginRight: -16,
      fontFamily: 'IRANSansMobile(FaNum)',
    };
  },
  Icon: color => {
    return {color: color};
  },
});

// ---------------------------------------------------------------------------
//  اینپوت های سفارشی برنامه
export const IconInput = React.forwardRef(
  (props, ref, backgroundColor = white, width = '90%') => (
    <View
      style={[
        IconInputstyels.Container({backgroundColor, width}),
        {...props.style},
      ]}>
      <Item style={IconInputstyels.Item}>
        <Input
          style={IconInputstyels.Input({backgroundColor, width})}
          ref={ref}
          onFocus={props.onFocus}
          value={props.value}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType={props.returnKeyType}
          blurOnSubmit={props.blurOnSubmit}
          placeholderTextColor={'gray'}
        />
        {props.LabelName ? (
          <Label style={IconInputstyels.Label}>{props.LabelName}</Label>
        ) : null}
        {props.IconName ? (
          <Icon
            style={IconInputstyels.Icon}
            type={props.type ? props.type : 'FontAwesome'}
            name={props.IconName}
          />
        ) : null}
      </Item>
    </View>
  ),
);

const IconInputstyels = StyleSheet.create({
  Container: ({backgroundColor, width}) => {
    return {
      width: width,
      flexDirection: 'row-reverse',
      alignItems: 'flex-end',
      marginTop: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'grey',
      backgroundColor: backgroundColor,
    };
  },
  Item: {
    flex: 5,
  },
  Label: {
    alignSelf: 'flex-end',
    color: 'gray',
    fontSize: 12,
    fontFamily: 'IRANSansMobile(FaNum)',
  },
  Icon: {
    fontSize: 22,
    color: 'gray',
  },
  Input: ({backgroundColor, width}) => {
    return {
      textAlign: 'right',
      fontSize: 14,
      marginRight: 10,
      width: width,
      backgroundColor: backgroundColor,
      fontFamily: 'IRANSansMobile(FaNum)',
    };
  },
});
