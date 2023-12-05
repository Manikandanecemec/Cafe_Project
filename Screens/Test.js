// import {TouchableOpacity} from 'react-native';

// import React from 'react';
// import {Text, View} from 'react-native';

// // const Test = () => {
// //   return (
// //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
// //       {/* <TouchableOpacity */}
// //       {/* // onPress={() => this.props.navigation.navigate('Profil')}> */}
// //       <TouchableOpacity onPress={() => navigation.goBack()}>
// //         <Text>Function Component</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default Test;

// export default class Test extends React.Component {
//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'black',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={{color: 'white', fontSize: 12, fontWeight: '500'}}>
//             click Class component
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
import React, {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Colors} from 'react-native-paper';

const PhoneSignIn = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    // if (user) {
    //   // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
    //   // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
    //   // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
    //   // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    // }
    console.log(user, 'user');
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber('+91 8610096883');
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      alert('Sucess');
    } catch (error) {
      alert('Invalid code.');
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber()}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
};
export default PhoneSignIn;
