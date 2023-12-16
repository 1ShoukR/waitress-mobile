import { StyleSheet, Text, View, Animated } from 'react-native';
import { COLORS } from '../constants';
import { TextInput } from 'react-native-paper';
import styles from '../styles/CreateAccount/createAccount.style';
import React from 'react'
import PressableButton from './PressableButton';
import { useDispatch } from 'react-redux';
import createUserAccountThunk from '../redux/thunk'
const CreateAccountComponent = () => {
  const dispatch = useDispatch()
  const fadeInValueFirst = React.useRef(new Animated.Value(0)).current;
  const fadeInValueRest = React.useRef(new Animated.Value(0)).current;
  const fadeInInputs = React.useRef(new Animated.Value(0)).current
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [nextForm, setNextForm] = React.useState(false)


React.useEffect(() => {
	Animated.timing(fadeInValueFirst, {
		toValue: 1,
		duration: 3000,
		useNativeDriver: true,
	}).start(() => {
		Animated.timing(fadeInValueRest, {
			toValue: 1,
			duration: 2400,
			useNativeDriver: true,
		}).start(() => {
			Animated.timing(fadeInInputs, {
				toValue: 1,
				duration: 2000,
				useNativeDriver: true,
			}).start();
		});
	});
}, [fadeInValueFirst, fadeInValueRest, fadeInInputs]);
  const goNextForm = () => {
    setNextForm(true)
  }
  const handleSubmit = () => {
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(password)
    dispatch(createUserAccountThunk({ firstName: firstName, lastName: lastName, email: email, password: password, userType: 'customer' }));
  }

  return (
		<View>
			{!nextForm ? (
				<View style={styles.inputContainer}>
					<View style={styles.brandingContainer}>
						<Animated.Text
							style={{
								...styles.branding, // Your text styles
								opacity: fadeInValueFirst,
								marginBottom: 0,
								textAlign: 'left'
							}}>
							First,
						</Animated.Text>
						<Animated.Text
							style={{
								...styles.branding, // Your text styles
								opacity: fadeInValueRest,
								textAlign: 'left'
							}}>
							We're going to need your first and last name.
						</Animated.Text>
					</View>
					<Animated.View style={{opacity: fadeInInputs}}>
						<TextInput
							label="First Name"
							placeholder="Enter your First Name"
							value={firstName}
							onChangeText={(text) => setFirstName(text)}
							mode="flat"
							activeOutlineColor={COLORS.secondary}
							outlineColor={COLORS.gray800}
							textColor={COLORS.gray800}
							style={styles.input}
						/>
						<TextInput
							label="Last Name"
							value={lastName}
							placeholder="Enter your last name"
							onChangeText={(text) => setLastName(text)}
							mode="flat"
							activeOutlineColor={COLORS.primary}
							outlineColor={COLORS.gray800}
							textColor={COLORS.tertiary}
							style={[styles.input, { width: 400 }]}
							// onSubmitEditing={handleLogin}
						/>
						<PressableButton onPress={goNextForm} title={'Next'} icon="arrow-right-bold" appendIcon={true} />
					</Animated.View>
				</View>
			) : (
				// Second Form
				<View style={styles.inputContainer}>
					<TextInput
						label="Email"
						value={email}
						placeholder="Enter your email"
						onChangeText={(text) => setEmail(text)}
						mode="flat"
						activeOutlineColor={COLORS.secondary}
						outlineColor={COLORS.gray800}
						textColor={COLORS.gray800}
						style={styles.input}
					/>
					<TextInput
						label="Password"
						value={password}
						placeholder="Enter your password"
						onChangeText={(text) => setPassword(text)}
						mode="flat"
						activeOutlineColor={COLORS.primary}
						outlineColor={COLORS.gray800}
						textColor={COLORS.tertiary}
						style={[styles.input, { width: 400 }]}
						// onSubmitEditing={handleLogin}
						returnKeyType="go"
					/>
					<PressableButton onPress={handleSubmit} title={'Submit'} icon="account-arrow-right" appendIcon={true} />
				</View>
			)}
		</View>
	);
}

export default CreateAccountComponent

